import React, { useState, useEffect, useRef } from "react";
import ModalComponent from "../Modal/Modal";
import Trashcan from "../../helpers/icons/Trashcan";
import Camera from "../../helpers/icons/Camera";
import { editGroup, removeStudent } from "./../../helpers/data/dataLayer";
import dataLayer from "./../../helpers/data/dataLayer";
import "./EditGroup.css";

const EditGroup = ({ group, openModal, closeModal, setGroups, setFilteredGroups }) => {
    // Camera & image state
    const [cameraActive, setCameraActive] = useState(false);
    const [stream, setStream] = useState(null);
    const [image, setImage] = useState(group.image_url || null);
    const [hasTakenPicture, setHasTakenPicture] = useState(false);

    // Students state
    const [oldStudents, setOldStudents] = useState([]);
    const [newStudents, setNewStudents] = useState([]);

    // Refs
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Initialize students when modal opens
    useEffect(() => {
        if (openModal === group.id) {
            setOldStudents(group.students || []);
            setNewStudents([]);
            setCameraActive(false);
            setHasTakenPicture(false);
            setImage(group.image_url || null);
        }
    }, [openModal, group]);

    // Camera stream
    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                    setStream(mediaStream);
                }
            } catch (err) {
                console.error("Failed to access webcam:", err);
            }
        };

        if (cameraActive) startCamera();
        else if (stream) {
            // Stop previous stream when closing camera
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }

        return () => {
            if (stream) stream.getTracks().forEach(track => track.stop());
        };
    }, [cameraActive]);

    // Take picture
    const takePicture = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const width = 320;
        const height = videoRef.current.videoHeight / (videoRef.current.videoWidth / width);
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        const ctx = canvasRef.current.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        const dataURL = canvasRef.current.toDataURL("image/png");
        setImage(dataURL);
        setHasTakenPicture(true);
        setCameraActive(false);
        stream && stream.getTracks().forEach(track => track.stop());
    };

    // Remove student
    const removeOldStudent = async (student_number) => {
        if (window.confirm("Weet je zeker dat je deze student wilt verwijderen?")) {
            try {
                await removeStudent(student_number);
                const data = await dataLayer();
                setGroups(data);
                setFilteredGroups(data);
            } catch (err) {
                console.error("Error removing student:", err);
            }
        }
    };

    // Save group changes
    const saveGroupChanges = async (e) => {
        e.preventDefault();
        const payload = {
            group_id: group.id,
            name: e.target.teamName.value,
            class: e.target.klas.value.toLowerCase(),
            image,
            students: JSON.stringify([...oldStudents, ...newStudents])
        };

        try {
            await editGroup(payload);
            const data = await dataLayer();
            setGroups(data);
            setFilteredGroups(data);
            closeModal();
        } catch (err) {
            console.error("Error saving group:", err);
        }
    };

    return (
        <ModalComponent
            modalIsOpen={openModal === group.id}
            closeModal={closeModal}
            customStyles={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                },
            }}
            contentLabel="Edit group"
        >
            <div className="editGroup">
                {cameraActive ? (
                    <div className="camera">
                        <video ref={videoRef} />
                        <button type="button" onClick={takePicture}>Neem foto</button>
                        <button type="button" onClick={() => setCameraActive(false)}>Annuleer</button>
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </div>
                ) : (
                    <form onSubmit={saveGroupChanges}>
                        <section className="groupSection">
                            <div className="groupImage" onClick={() => setCameraActive(true)}>
                                {image ? <img src={image.startsWith('data:') ? image : `https://api.interpol.sd-lab.nl/${image}`} alt="Team" /> : <Camera />}
                            </div>
                            <div>
                                <input type="text" name="teamName" defaultValue={group.name} placeholder="Team naam" required />
                                <input type="text" name="klas" defaultValue={group.class} placeholder="Klas" required />
                            </div>
                        </section>

                        <h4>Huidige studenten</h4>
                        <ul className="editStudents">
                            {oldStudents.map((student, idx) => (
                                <li key={idx}>
                                    <input
                                        type="number"
                                        value={student.student_number}
                                        onChange={(e) => {
                                            const updated = [...oldStudents];
                                            updated[idx].student_number = e.target.value;
                                            setOldStudents(updated);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={student.name}
                                        onChange={(e) => {
                                            const updated = [...oldStudents];
                                            updated[idx].name = e.target.value;
                                            setOldStudents(updated);
                                        }}
                                    />
                                    <Trashcan onClick={() => removeOldStudent(student.student_number)} />
                                </li>
                            ))}
                        </ul>

                        <h4>Nieuwe studenten</h4>
                        <ul className="editStudents">
                            {newStudents.map((student, idx) => (
                                <li key={idx}>
                                    <input
                                        type="number"
                                        value={student.student_number}
                                        onChange={(e) => {
                                            const updated = [...newStudents];
                                            updated[idx].student_number = e.target.value;
                                            setNewStudents(updated);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={student.name}
                                        onChange={(e) => {
                                            const updated = [...newStudents];
                                            updated[idx].name = e.target.value;
                                            setNewStudents(updated);
                                        }}
                                    />
                                    <Trashcan onClick={() => setNewStudents(newStudents.filter((_, i) => i !== idx))} />
                                </li>
                            ))}
                        </ul>

                        <button type="button" onClick={() => setNewStudents([...newStudents, { name: '', student_number: '' }])}>
                            Voeg student toe
                        </button>
                        <button type="submit">Opslaan</button>
                    </form>
                )}
            </div>
        </ModalComponent>
    );
};

export default EditGroup;
