import React, { useState, useEffect, useRef } from "react";
import ModalComponent from "../Modal/Modal";
import Trashcan from "../../helpers/icons/Trashcan";
import Camera from "../../helpers/icons/Camera";
import { createTeam } from "./../../helpers/data/dataLayer";
import "./NewGroup.css";

const NewGroup = ({
    openModal,
    closeModal
}) => {    
    const [camera, setCamera] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [newStudents, setNewStudents] = useState([0]);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [image, setImage] = useState(null);
    const [teamSuccessfullyCreated, setTeamSuccessfullyCreated] = useState(false);

    const cameraRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const takePhotoRef = useRef(null);
    const studentsRef = useRef(null);

    const getVideoStream = async () => {
        try {
            clearPicture();
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            if (videoRef && videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.addEventListener("loadedmetadata", () => {
                    videoRef.current.play();
                });
            } else {
                return;
            }
        } catch (err) {
            console.error(err);
        }

        if (videoRef && videoRef.current) {
            videoRef.current.addEventListener("canplay", () => {
                if (!streaming) {
                    setHeight(videoRef.current.videoHeight / (videoRef.current.videoWidth / width));

                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.

                    if (isNaN(height)) {
                        setHeight(width / (4 / 3));
                    }

                    videoRef.current.setAttribute("width", width);
                    videoRef.current.setAttribute("height", height);
                    canvasRef.current.setAttribute("width", width);
                    canvasRef.current.setAttribute("height", height);
                    setStreaming(true);
                }
            }, false);
        }
    }

    function clearPicture() {
        if (canvasRef && canvasRef.current && photoRef && photoRef.current) {
            const context = canvasRef.current.getContext("2d");
            context.fillStyle = "#000";
            context.fillRect(0, 0, canvasRef.current.offsetHeight, canvasRef.current.offsetWidth);

            const data = canvasRef.current.toDataURL("image/png");
            photoRef.current.setAttribute("src", data);
        }
    }

    const takePicture = (e) => {
        if (canvasRef && canvasRef.current && photoRef && photoRef.current && videoRef && videoRef.current) {
            const context = canvasRef.current.getContext("2d");
            if (width && height) {
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                context.drawImage(videoRef.current, 0, 0, width, height);

                const data = canvasRef.current.toDataURL("image/png");
                setImage(data);
                photoRef.current.setAttribute("src", data);
            } else {
                clearPicture();
            }
        }
        e.preventDefault();
    }

    const createTeamInComp = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', e.target.elements.teamName.value);
        formData.append('class', e.target.elements.klas.value.toLowerCase());
        let students = studentsRef.current.children;
        students = Array.from(students).map(student => {
            return {
                name: student.querySelector('input[type="text"]').value,
                number: student.querySelector('input[type="number"]').value
            }
        });
        formData.append('students', JSON.stringify(students));
        
        const handleCreateTeam = async (formData, setTeamSuccessfullyCreated) => {
            await createTeam(formData, setTeamSuccessfullyCreated)
                .then(() => {
                    // Update the UI instead of reloading the page
                    console.log('Team created successfully!');
                })
                .catch((error) => {
                    console.error('Failed to create team:', error);
                    // Optionally, show an error notification to the user
                });
        };

        handleCreateTeam(formData, setTeamSuccessfullyCreated);
    };

    useEffect(() => {
        camera && getVideoStream();
    }, [camera]);

    useEffect(() => {
        setWidth(600);
    }, []);

    useEffect(() => {
        if (teamSuccessfullyCreated) {
            closeModal();
        }
    }, [teamSuccessfullyCreated])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <ModalComponent
            modalIsOpen={openModal}
            afterOpenModal={null}
            closeModal={closeModal}
            customStyles={customStyles}
            contentLabel="New group"
        >
            <div className="newGroup">
                {camera ? (
                    <div className="camera" ref={cameraRef}>
                        <video ref={videoRef} id="video">Video stream not available.</video>
                        <div className="buttonWrapper">
                            <button onClick={(e) => { takePicture(e) }} ref={takePhotoRef} type="button" id="startbutton" className="btn"><span>Take photo</span></button>
                            <button onClick={() => { setCamera(false) }} type="button" id="savebutton" className="btn"><span>Save photo</span></button>
                        </div>
                        <div className="output">
                            <div className="imgWrapper">
                                <img ref={photoRef} id="photo" alt="Team image" />
                            </div>
                            <canvas id="canvas" ref={canvasRef} />
                        </div>
                    </div>
                ) : (
                    <form onSubmit={(e) => { createTeamInComp(e) }}>
                        <input type="hidden" id="image" name="image" value={image} required />
                        <section className="groupSection">
                            <div className="groupImage" onClick={() => { setCamera(true) }} onKeyDown={() => { setCamera(true) }}>
                                {image ? (
                                    <img src={image} alt="Team" />
                                ) : (
                                    <Camera />
                                )}
                            </div>
                            <div>
                                <input type="text" id="teamName" name="teamName" placeholder="Team naam" required />
                                <input type="text" id="klas" name="klas" placeholder="Klas" required />
                            </div>
                        </section>
                        <ul className="addStudents" ref={studentsRef}>
                            {newStudents.map((student, idx) => (
                                <li key={idx}>
                                    <input type="number" placeholder={"Studentnummer"} required />
                                    <input type="text" placeholder={"Student naam"} required />
                                    <Trashcan className={'trashcan'} onClick={() => { setNewStudents(newStudents.filter((_, i) => i !== idx)) }} />
                                </li>
                            ))}
                        </ul>
                        <div className="addButtons">
                            <button onClick={(e) => { e.preventDefault(); setNewStudents([...newStudents, { name: '', student_number: '' }]) }}>Student toevoegen</button>
                            <button type={'submit'}>Opslaan</button>
                        </div>
                    </form>
                )}
            </div>
        </ModalComponent>
    );
}

export default NewGroup;