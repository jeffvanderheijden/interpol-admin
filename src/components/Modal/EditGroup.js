import React, { useState, useEffect, useRef } from "react";
import ModalComponent from "../Modal/Modal";
import Trashcan from "../../helpers/icons/Trashcan";
import Camera from "../../helpers/icons/Camera";
import { editGroup } from "./../../helpers/data/dataLayer"; // Assuming editGroup is defined in dataLayer
import "./EditGroup.css";

const EditGroup = ({
    apiUrl,
    group,
    openModal,
    closeModal,
    setGroups,
    setFilteredGroups
}) => {    
    const [camera, setCamera] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [newStudents, setNewStudents] = useState([]);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [image, setImage] = useState(group.image_url || null); // Set initial image if available

    const cameraRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    // Reset new students when modal opens
    useEffect(() => {
        setNewStudents([]);
    }, [openModal]);

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

    const clearPicture = () => {
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

    const removeExistingStudent = (studentNumber, studentName) => {
        if (confirm(`Weet je zeker dat je ${studentName} wilt verwijderen uit deze groep?`)) {
            // Call the remove student function
            // Assuming removeStudent is imported from dataLayer
            removeStudent(studentNumber)
                .then(() => {
                    // Remove student from group, refresh data
                    const fetchData = async () => {
                        const data = await dataLayer();
                        setGroups(data);
                        setFilteredGroups(data);
                    };
                    fetchData();
                })
                .catch((error) => {
                    console.error('Error removing student:', error);
                });
        }
    }

    const saveGroupChanges = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', e.target.elements.teamName.value);
        formData.append('class', e.target.elements.klas.value.toLowerCase());
        
        let students = [...group.students, ...newStudents];
        students = students.map(student => ({
            name: student.name,
            number: student.student_number
        }));

        formData.append('students', JSON.stringify(students));

        // Assuming editGroup is the function that updates the group
        await editGroup(group.id, formData)
            .then(() => {
                // Update UI instead of reloading the page
                const fetchData = async () => {
                    const data = await dataLayer();
                    setGroups(data);
                    setFilteredGroups(data);
                };
                fetchData();
                closeModal();
            })
            .catch((error) => {
                console.error('Error updating group:', error);
            });
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

    return (
        <ModalComponent
            modalIsOpen={openModal === group.id}
            afterOpenModal={null}
            closeModal={closeModal}
            customStyles={customStyles}
            contentLabel="Edit group"
        >
            <div className="editGroup">
                <section className="groupSection">
                    <div className="groupImage">
                        <img src={image ? image : `${apiUrl + group.image_url}`} alt={group.name} />
                    </div>
                    <div>
                        <input type="text" defaultValue={group.name} name="teamName" placeholder="Team naam" required />
                        <input type="text" defaultValue={group.class} name="klas" placeholder="Klas" required />
                    </div>
                </section>
                <ul className="editStudents">
                    {group.students.map((student, idx) => (
                        <li key={idx}>
                            <input type="number" defaultValue={student.student_number} />
                            <input type="text" defaultValue={student.name} />
                            <Trashcan className={'trashcan'} onClick={() => { removeExistingStudent(student.student_number, student.name) }} />
                        </li>
                    ))}
                    {newStudents.map((student, idx) => (
                        <li key={idx}>
                            <input type="number" placeholder={student.student_number} />
                            <input type="text" placeholder={student.name} />
                            <Trashcan className={'trashcan'} onClick={() => { setNewStudents(newStudents.filter((_, i) => i !== idx)) }} />
                        </li>
                    ))}
                </ul>
                <div className="editButtons">
                    <button onClick={() => { setNewStudents([...newStudents, { name: '', student_number: '' }]) }}>Student toevoegen</button>
                    <button onClick={saveGroupChanges}>Opslaan</button>
                </div>
            </div>
        </ModalComponent>
    );
}

export default EditGroup;
