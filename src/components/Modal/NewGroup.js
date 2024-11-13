import React, { useState } from "react";
import ModalComponent from "../Modal/Modal";
import "./NewGroup.css";

const NewGroup = ({
    openModal,
    closeModal
}) => {    
    const [newStudents, setNewStudents] = useState([]);

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
                <section className="groupSection">
                    <div className="groupImage">
                        <img src="" alt="Group image" />
                    </div>
                    <div>
                        <input type="text" placeholder={"Groep naam"} />
                        <input type="text" placeholder={"Klas"} />
                    </div>
                </section>
                <ul className="editStudents">
                    <li>
                        <input type="number" placeholder={"Studentnummer"} />
                        <input type="text" placeholder={"Student naam"} />
                    </li>
                </ul>
                <div className="editButtons">
                    <button onClick={() => { setNewStudents([...newStudents, { name: '', student_number: '' }]) }}>Student toevoegen</button>
                    <button onClick={() => { console.log('opslaan') }}>Opslaan</button>
                </div>
            </div>
        </ModalComponent>
    );
}

export default NewGroup;