import React, { useState, useEffect } from "react";
import "./Groups.css";
import ModalComponent from "../Modal/Modal";

const Groups = ({
    groups
}) => {
    const apiUrl = "https://api.interpol.sd-lab.nl/";
    const [openModal, setOpenModal] = useState(null);
    const [newStudents, setNewStudents] = useState([]);
    const [visibleCodes, setVisibleCodes] = useState([]);

    const openSpecificModal = (modalName) => setOpenModal(modalName);
    const closeModal = () => setOpenModal(null);

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

    // Reset new students when modal closes or they the extra input fields are always shown
    useEffect(() => {
        setNewStudents([]);
    },[openModal]);

    const toggleCode = (code) => {
        if (visibleCodes.includes(code)) {
            setVisibleCodes(visibleCodes.filter((c) => c !== code));
        } else {
            setVisibleCodes([...visibleCodes, code]);
        }
    }

    const removeStudent = (studentNumber, groupId) => {
        console.log(studentNumber, groupId);
    }

    return (
        <>
            <section id="groupHeaders">
                <div className="groupsHeader">
                    <h1>Groepen</h1>
                </div>
                <div className="studentsHeader">
                    <h1>Studentnummer</h1>
                    <h1>Naam</h1>
                </div>
                <div className="challengesHeader">
                    <h1>Uitdagingen</h1>
                </div>
                <div className="challengeKeysHeader">
                    <h1>Code</h1>
                </div>
            </section>
            <section id="groups">
                <ul id="group-tabs">
                    {/* Groups */}
                    {groups && groups.map((group, idx) => (
                        <>
                            <li className="group" key={idx}>
                                <section className="groupSection" onClick={() => { openSpecificModal(group.id) }}>
                                    <div className="groupImage">
                                        <img src={`${apiUrl + group.image_url}`} alt={group.name} />
                                    </div>
                                    <div>
                                        <h2>{group.name}</h2>
                                        <p>{group.class}</p>
                                    </div>
                                </section>
                                {/* Students */}
                                <section className="studentsSection" onClick={() => { openSpecificModal(group.id) }}>
                                    <ul>
                                        {group.students.map((student, idx) => (
                                            <li key={idx}>
                                                <p>{student.student_number}</p>
                                                <p>{student.name}</p>                                        
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                {/* Challenges */}
                                <section className="challengesSection" onClick={() => { openSpecificModal(group.id) }}>
                                    {group.challenges.map((challenge, idx) => (
                                        <ul key={idx}>
                                            <li>
                                                <h3>{challenge.name}</h3>
                                                <div>
                                                    {challenge.completed ? 
                                                        <span>V</span> : 
                                                        <span>X</span>
                                                    }
                                                </div>
                                            </li>
                                        </ul>
                                    ))}
                                </section>
                                {/* Challenge keys */}
                                <section className="challengeKeys">
                                    {group.challenges.map((challenge, idx) => (
                                        <ul key={idx}>
                                            <li>
                                                <h3 className={visibleCodes.includes(challenge.keycode) ? 'visible' : 'invisible'}>{challenge.keycode}</h3>
                                                <button onClick={() => { toggleCode(challenge.keycode) }}>EYE</button>
                                            </li>
                                        </ul>
                                    ))}
                                </section>
                            </li>
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
                                            <img src={`${apiUrl + group.image_url}`} alt={group.name} />
                                        </div>
                                        <div>
                                            <input type="text" placeholder={group.name} />
                                            <input type="text" placeholder={group.class} />
                                        </div>
                                    </section>   
                                    <ul className="editStudents">
                                        {group.students.map((student, idx) => (
                                            <li key={idx}>
                                                <input type="number" placeholder={student.student_number} />   
                                                <input type="text" placeholder={student.name} />
                                                <button onClick={() => { removeStudent(student.student_number, group.id) }}>X</button>
                                            </li>
                                        ))}
                                        {newStudents.map((student, idx) => (
                                            <li key={idx}>
                                                <input type="number" placeholder={student.student_number} />   
                                                <input type="text" placeholder={student.name} />
                                                <button onClick={() => { setNewStudents(newStudents.filter((_, i) => i !== idx)) }}>X</button>
                                            </li>
                                        ))}
                                    </ul>
                                    <button onClick={() => { setNewStudents([ ...newStudents, { name: '', student_number: '' }]) }}>Student toevoegen</button>
                                </div>
                            </ModalComponent>
                        </>
                    ))}
                </ul>                
            </section>
        </>
    );
}

export default Groups;