import React, { useState, useEffect, useRef } from "react";
import ModalComponent from "../Modal/Modal";
import Trashcan from "../../helpers/icons/Trashcan";
import Camera from "../../helpers/icons/Camera";
import { editGroup, removeStudent } from "./../../helpers/data/dataLayer";
import dataLayer from "./../../helpers/data/dataLayer";
import "./EditGroup.css";

const EditGroup = ({
    group,
    openModal,
    closeModal,
    setGroups,
    setFilteredGroups
}) => {    
    const [camera, setCamera] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [hasTakenPicture, setHasTakenPicture] = useState(false);
    const [newStudents, setNewStudents] = useState([]);
    const [width, setWidth] = useState(320); // fixed width
    const [height, setHeight] = useState(0);
    const [image, setImage] = useState(group.image_url || null);

    const cameraRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const newStudentsRef = useRef(null);
    const oldStudentsRef = useRef(null);

    useEffect(() => {
        setNewStudents([]);
    }, [openModal]);

    const getVideoStream = async () => {
        try {
            clearPicture();
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            const video = videoRef.current;

            if (video) {
                video.srcObject = stream;
                video.play();

                video.addEventListener("loadedmetadata", () => {
                    const calculatedWidth = 320;
                    const calculatedHeight = video.videoHeight / (video.videoWidth / calculatedWidth);
                    setWidth(calculatedWidth);
                    setHeight(calculatedHeight);

                    video.setAttribute("width", calculatedWidth);
                    video.setAttribute("height", calculatedHeight);
                    canvasRef.current.setAttribute("width", calculatedWidth);
                    canvasRef.current.setAttribute("height", calculatedHeight);

                    setStreaming(true);
                });
            }
        } catch (err) {
            console.error("Failed to get webcam:", err);
        }
    };

    const clearPicture = () => {
        if (canvasRef.current && photoRef.current) {
            const context = canvasRef.current.getContext("2d");
            context.fillStyle = "#000";
            context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            const data = canvasRef.current.toDataURL("image/png");
            photoRef.current.setAttribute("src", data);
        }
    };

    const takePicture = (e) => {
        e.preventDefault();

        const canvas = canvasRef.current;
        const video = videoRef.current;
        const photo = photoRef.current;

        if (canvas && video && photo && width && height) {
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, width, height);

            const dataURL = canvas.toDataURL("image/png");
            setImage(dataURL);
            photo.setAttribute("src", dataURL);
            setHasTakenPicture(true);
        } else {
            console.warn("Missing refs or invalid dimensions");
        }
    };

    const removeExistingStudent = (studentNumber, studentName) => {
        if (window.confirm(`Weet je zeker dat je ${studentName} wilt verwijderen uit deze groep?`)) {
            removeStudent(studentNumber)
                .then(() => {
                    const fetchData = async () => {
                        const data = await dataLayer();
                        setGroups(data);
                        setFilteredGroups(data);
                    };
                    fetchData();
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error removing student:', error);
                });
        }
    };

    const saveGroupChanges = async (e) => {
        e.preventDefault();
        const payload = {
            name: e.target.elements.teamName.value,
            class: e.target.elements.klas.value.toLowerCase(),
            group_id: e.target.elements.group_id.value,
            students: JSON.stringify([...oldStudents, ...newStudents]),
            image, // base64 string
        };

        let oldStudents = oldStudentsRef.current.children;
        oldStudents = Array.from(oldStudents).map(student => {
            return {
                name: student.querySelector('input[type="text"]').value,
                student_number: student.querySelector('input[type="number"]').value
            };
        });

        let newStudents = newStudentsRef.current.children;
        newStudents = Array.from(newStudents).map(student => {
            return {
                name: student.querySelector('input[type="text"]').value,
                student_number: student.querySelector('input[type="number"]').value
            };
        });

        // formData.append('students', JSON.stringify([...oldStudents, ...newStudents]));

        // await editGroup(formData)
        //     .then(() => {
        //         const fetchData = async () => {
        //             const data = await dataLayer();
        //             setGroups(data);
        //             setFilteredGroups(data);
        //         };
        //         fetchData();
        //         closeModal();
        //     })
        //     .catch((error) => {
        //         console.error('Error updating group:', error);
        //     });
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    useEffect(() => {
        if (camera) {
            getVideoStream();
        }
    }, [camera]);

    return (
        <ModalComponent
            modalIsOpen={openModal === group.id}
            afterOpenModal={null}
            closeModal={closeModal}
            customStyles={customStyles}
            contentLabel="Edit group"
        >
            <div className="editGroup">
                {camera ? (
                    <div className="camera" ref={cameraRef}>
                        {!hasTakenPicture ? (
                            <video ref={videoRef} id="video">Video stream not available.</video>
                        ) : (
                            <img ref={photoRef} id="photo" alt="Captured photo" />
                        )}
                        <div className="buttonWrapper">
                            <button onClick={takePicture} type="button" id="startbutton" className="btn"><span>Take photo</span></button>
                            <button onClick={() => setCamera(false)} type="button" id="savebutton" className="btn"><span>Save photo</span></button>
                        </div>
                        <div className="output">
                            <div className="imgWrapper">
                                <img ref={photoRef} id="photo" alt="Team image" />
                            </div>
                            <canvas id="canvas" ref={canvasRef} />
                        </div>
                    </div>
                ) : (
                    <form onSubmit={saveGroupChanges}>
                        <input type="hidden" id="group_id" name="group_id" value={group.id} required />
                        <section className="groupSection">
                            <div className="groupImage" onClick={() => setCamera(true)} onKeyDown={() => setCamera(true)}>
                                {image ? (
                                    <img src={`https://api.interpol.sd-lab.nl/${image}`} alt="Team" />
                                ) : (
                                    <Camera />
                                )}
                            </div>
                            <div>
                                <input type="text" id="teamName" defaultValue={group.name} name="teamName" placeholder="Team naam" required />
                                <input type="text" id="klas" defaultValue={group.class} name="klas" placeholder="Klas" required />
                            </div>
                        </section>
                        <ul className="editStudents" ref={oldStudentsRef}>
                            {group.students.map((student, idx) => (
                                <li key={idx}>
                                    <input type="number" defaultValue={student.student_number} />
                                    <input type="text" defaultValue={student.name} />
                                    <Trashcan className={'trashcan'} onClick={() => removeExistingStudent(student.student_number, student.name)} />
                                </li>
                            ))}
                        </ul>
                        <ul className="editStudents" ref={newStudentsRef}>
                            {newStudents.map((student, idx) => (
                                <li key={idx}>
                                    <input type="number" placeholder={student.student_number} />
                                    <input type="text" placeholder={student.name} />
                                    <Trashcan className={'trashcan'} onClick={() => setNewStudents(newStudents.filter((_, i) => i !== idx))} />
                                </li>
                            ))}
                        </ul>
                        <div className="editButtons">
                            <button onClick={(e) => { e.preventDefault(); setNewStudents([...newStudents, { name: '', student_number: '' }]) }}>Student toevoegen</button>
                            <button type="submit">Opslaan</button>
                        </div>
                    </form>
                )}
            </div>
        </ModalComponent>
    );
};

export default EditGroup;
