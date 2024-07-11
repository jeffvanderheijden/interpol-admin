import React, { useState } from "react";
import "./Groups.css";
import ModalComponent from "../Modal/Modal";

const Groups = ({
    groups
}) => {
    const apiUrl = "https://api.jeffvanderheijden.nl/";
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false); 
    };

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
                        <li className="group" key={idx}>
                            <section className="groupSection">
                                <div className="groupImage">
                                    <img src={`${apiUrl + group.image_url}`} alt={group.name} />
                                </div>
                                <div>
                                    <h2>{group.name}</h2>
                                    <p>{group.class}</p>
                                </div>
                            </section>
                            {/* Students */}
                            <section className="studentsSection">
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
                            <section className="challengesSection">
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
                                            <h3>{challenge.keycode}</h3>
                                        </li>
                                    </ul>
                                ))}
                            </section>
                            <section className="editGroup">
                                <button onClick={openModal}>Edit</button>
                            </section>
                        </li>
                    ))}
                </ul>                
            </section>
            <ModalComponent 
                modalIsOpen={modalIsOpen}
                afterOpenModal={null}
                closeModal={closeModal}
                customStyles={customStyles}
                contentLabel="Edit group"
            />
        </>
    );
}

export default Groups;