import React, { useState, useEffect } from "react";
import "./Groups.css";
import { removeStudent } from "../../helpers/data/dataLayer";
import ModalComponent from "../Modal/Modal";
import Close from "./../../helpers/icons/Close";
import Check from "./../../helpers/icons/Check";
import Copy from  "./../../helpers/icons/Copy";
import Trashcan from "../../helpers/icons/Trashcan";

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

    const toggleCode = (event, code) => {
        if (visibleCodes.includes(code)) {
            setVisibleCodes(visibleCodes.filter((c) => c !== code));
        } else {
            setVisibleCodes([...visibleCodes, code]);
        }
        event.stopPropagation();
    }

    const copyCode = (event, code) => {
        navigator.clipboard.writeText(code);
        event.stopPropagation();
        event.target.closest("li").querySelector('.checkmark').classList.add('show');
        event.target.closest("li").querySelector('.copy').classList.add('hide');
        setTimeout(() => {
            event.target.closest("li").querySelector('.checkmark').classList.remove('show');
            event.target.closest("li").querySelector('.copy').classList.remove('hide');
        }, 2000);
    }

    const removeExistingStudent = (studentNumber, groupId, studentName) => {
        alert(`Weet je zeker dat je ${studentName} wilt verwijderen uit deze groep?`);
        removeStudent(studentNumber);
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
                    {groups && groups.map((group, idx) => (
                        <>
                            <li className="group" key={idx} onClick={() => { openSpecificModal(group.id) }}>
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
                                <section className="challengesSection" >
                                    <ul>
                                        {group.challenges.map((challenge, idx) => (
                                            <li key={idx}>
                                                <h3>{challenge.name}</h3>
                                                <div>
                                                    {challenge.completed ? 
                                                        <span><Check className={'green'} /></span> : 
                                                        <span><Close className={'red'} /></span>
                                                    }
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                {/* Challenge keys */}
                                <section className="challengeKeys">
                                    <ul key={idx}>
                                        {group.challenges.map((challenge, idx) => (                                        
                                            <li key={idx}>
                                                <h3 className={visibleCodes.includes(challenge.keycode) ? 'visible' : 'invisible'} onClick={(e) => { toggleCode(e, challenge.keycode)}}>{challenge.keycode}</h3>
                                                {/* Copy icon, animated when clicked: visual feedback that copy is successful */}
                                                <Copy className={'copy'} onClick={(e) => { copyCode(e, challenge.keycode)} } />
                                                <Check className={'checkmark green hide'} onClick={(e) => { copyCode(e, challenge.keycode)} } />
                                            </li>
                                        ))}
                                    </ul>
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
                                                <button onClick={() => { removeExistingStudent(student.student_number, group.id, student.name) }}>X</button>
                                            </li>
                                        ))}
                                        {newStudents.map((student, idx) => (
                                            <li key={idx}>
                                                <input type="number" placeholder={student.student_number} />   
                                                <input type="text" placeholder={student.name} />
                                                <button onClick={() => { setNewStudents(newStudents.filter((_, i) => i !== idx)) }}>
                                                    <Trashcan />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="editButtons">
                                        <button onClick={() => { setNewStudents([ ...newStudents, { name: '', student_number: '' }]) }}>Student toevoegen</button>
                                        <button onClick={() => { console.log('opslaan' )}}>Opslaan</button>
                                    </div>
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