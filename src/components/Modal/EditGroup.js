import React, { useState, useEffect } from "react";

import ModalComponent from "../Modal/Modal";
import Trashcan from "../../helpers/icons/Trashcan";

const EditGroup = ({
    group,
    openModal,
    closeModal
}) => {
    const [newStudents, setNewStudents] = useState([]);    

    // Reset new students when modal closes or they the extra input fields are always shown
    useEffect(() => {
        setNewStudents([]);
    },[openModal]);

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

    const removeExistingStudent = (studentNumber, groupId, studentName) => {
        alert(`Weet je zeker dat je ${studentName} wilt verwijderen uit deze groep?`);
        removeStudent(studentNumber);
        console.log(studentNumber, groupId);
    }

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
                            <Trashcan className={'trashcan'} onClick={() => { removeExistingStudent(student.student_number, group.id, student.name) }} />
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
                    <button onClick={() => { console.log('opslaan') }}>Opslaan</button>
                </div>
            </div>
        </ModalComponent>
    );
}

export default EditGroup;