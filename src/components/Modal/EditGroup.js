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
    const [width, setWidth] = useState(320);
    const [height, setHeight] = useState(0);
    const [image, setImage] = useState(group.image_url || null);

    const cameraRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const newStudentsRef = useRef(null);
    const oldStudentsRef = useRef(null);

    useEffect(() => setNewStudents([]), [openModal]);

    const getVideoStream = async () => {
        try {
            clearPicture();
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            const video = videoRef.current;

            if (video) {
                video.srcObject = stream;
                video.play();

                video.onloadedmetadata = () => {
                    const calculatedWidth = 320;
                    const calculatedHeight = video.videoHeight / (video.videoWidth / calculatedWidth);
                    setWidth(calculatedWidth);
                    setHeight(calculatedHeight);

                    video.setAttribute("width", calculatedWidth);
                    video.setAttribute("height", calculatedHeight);
                    canvasRef.current.setAttribute("width", calculatedWidth);
                    canvasRef.current.setAttribute("height", calculatedHeight);

                    setStreaming(true);
                };
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
        if (!canvasRef.current || !videoRef.current || !photoRef.current) return;

        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, width, height);

        const dataURL = canvasRef.current.toDataURL("image/png");
        setImage(dataURL);
        photoRef.current.setAttribute("src", dataURL);
        setHasTakenPicture(true);
    };

    const removeExistingStudent = (studentNumber, studentName) => {
        if (!window.confirm(`Weet je zeker dat je ${studentName} wilt verwijderen uit deze groep?`)) return;

        removeStudent(studentNumber)
            .then(async () => {
                const data = await dataLayer();
                setGroups(data);
                setFilteredGroups(data);
                closeModal();
            })
            .catch(console.error);
    };

    const saveGroupChanges = async (e) => {
        e.preventDefault();

        let oldStudents = Array.from(oldStudentsRef.current.children).map(student => ({
            name: student.querySelector('input[type="text"]').value,
            student_number: student.querySelector('input[type="number"]').value
        }));

        let newStudentsArr = Array.from(newStudentsRef.current.children).map(student => ({
            name: student.querySelector('input[type="text"]').value,
            student_number: student.querySelector('input[type="number"]').value
        }));

        const payload = {
            name: e.target.teamName.value,
            class: e.target.klas.value.toLowerCase(),
            group_id: group.id,
            students: JSON.stringify([...oldStudents, ...newStudentsArr]),
            image, // base64
        };

        try {
            // editGroup returned value may not be JSON, so handle as text
            await editGroup(payload);

            const data = await dataLayer();
            setGroups(data);
            setFilteredGroups(data);
            closeModal();
        } catch (err) {
            console.error("Error updating group:", err);
        }
    };

    useEffect(() => {
        if (camera) getVideoStream();
    }, [camera]);

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
                            <button onClick={takePicture} type="button" className="btn"><span>Take photo</span></button>
                            <button onClick={() => setCamera(false)} type="button" className="btn"><span>Save photo</span></button>
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
                        <input type="hidden" id="group_id" value={group.id} required />
                        <section className="groupSection">
                            <div className="groupImage" onClick={() => setCamera(true)} onKeyDown={() => setCamera(true)}>
                                {image ? (
                                    <img src={image.startsWith("http") ? image : `https://api.interpol.sd-lab.nl/${image}`} alt="Team" />
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
                                    <Trashcan className="trashcan" onClick={() => removeExistingStudent(student.student_number, student.name)} />
                                </li>
                            ))}
                        </ul>
                        <ul className="editStudents" ref={newStudentsRef}>
                            {newStudents.map((student, idx) => (
                                <li key={idx}>
                                    <input type="number" placeholder={student.student_number} />
                                    <input type="text" placeholder={student.name} />
                                    <Trashcan className="trashcan" onClick={() => setNewStudents(newStudents.filter((_, i) => i !== idx))} />
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
