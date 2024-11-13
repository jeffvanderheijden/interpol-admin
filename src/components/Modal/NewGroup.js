import React, { useState, useEffect, useRef } from "react";
import ModalComponent from "../Modal/Modal";
import "./NewGroup.css";

const NewGroup = ({
    openModal,
    closeModal
}) => {    
    const [camera, setCamera] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [newStudents, setNewStudents] = useState([]);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [image, setImage] = useState(null);

    const cameraRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const takePhotoRef = useRef(null);

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
            console.log('taking picture...');
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
        formData.append('class', e.target.elements.klas.value);
        const students = [
            {
                name: e.target.elements.student1.value,
                number: e.target.elements.student1_number.value
            },
            {
                name: e.target.elements.student2.value,
                number: e.target.elements.student2_number.value
            },
            {
                name: e.target.elements.student3.value,
                number: e.target.elements.student3_number.value
            },
            {
                name: e.target.elements.student4.value,
                number: e.target.elements.student4_number.value
            }
        ];
        formData.append('students', JSON.stringify(students));
        
        // do fetch request
        createTeam(formData, setTeamSuccessfullyCreated).then(newTeam => {
            console.log(newTeam);
            // Reload the page to show the new team
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    };

    useEffect(() => {
        camera && getVideoStream();
    }, [camera]);

    useEffect(() => {
        setWidth(200);
    }, []);

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
                        <section className="groupSection">
                            <div className="groupImage" onClick={() => { setCamera(true) }} onKeyDown={() => { setCamera(true) }}>
                                <img src={image} alt="Team" />
                            </div>
                            <div>
                                <input type="text" placeholder={"Groep naam"} />
                                <input type="text" placeholder={"Klas"} />
                            </div>
                        </section>
                        <ul className="addStudents">
                            <li>
                                <input type="number" placeholder={"Studentnummer"} />
                                <input type="text" placeholder={"Student naam"} />
                            </li>
                            {newStudents.map((student, idx) => (
                                <li key={idx}>
                                    <input type="number" placeholder={student.student_number} />
                                    <input type="text" placeholder={student.name} />
                                    <Trashcan className={'trashcan'} onClick={() => { setNewStudents(newStudents.filter((_, i) => i !== idx)) }} />
                                </li>
                            ))}
                        </ul>
                        <div className="addButtons">
                            <button onClick={() => { setNewStudents([...newStudents, { name: '', student_number: '' }]) }}>Student toevoegen</button>
                            <button type={'submit'}>Opslaan</button>
                        </div>
                    </form>
                )}
            </div>
        </ModalComponent>
    );
}

export default NewGroup;