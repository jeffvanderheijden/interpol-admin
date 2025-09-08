import React, { useState, useEffect } from "react";
import ModalComponent from "../Modal/Modal";
import "./AddPoints.css";
import { updatePoints } from "../../helpers/data/dataLayer";

const AddPoints = ({
    group,
    openModal,
    closeModal,
}) => {
    const [pointsState, setPointsState] = useState([]);

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
        if (group && group.challenges) {
            setPointsState(group.challenges.map(c => c.points || ''));
        }
    }, [group]);

    const handleChange = (idx, value) => {
        setPointsState(prev => {
            const newState = [...prev];
            newState[idx] = value;
            return newState;
        });
    };

    const submitPoints = (e) => {
        e.preventDefault();

        const pointsData = group.challenges.map((challenge, idx) => ({
            challengeId: challenge.id,
            points: pointsState[idx]
        }));

        updatePoints(group.id, pointsData)
            .then(response => {
                console.log('Server response:', response);
                // Optionally: close modal or show success message
                closeModal();
            })
            .catch(error => console.error('Error updating points:', error));
    };

    return (
        <ModalComponent
            modalIsOpen={openModal === group.id}
            afterOpenModal={null}
            closeModal={closeModal}
            contentLabel="Points"
            customStyles={customStyles}
        >
            <form className="editPoints" onSubmit={submitPoints}>
                {group.challenges.map((challenge, idx) => (
                    <li key={challenge.id}>
                        <h3>{challenge.name}</h3>
                        <input
                            placeholder={pointsState[idx] || 0} // show current points
                            value={pointsState[idx]}
                            onChange={(e) => handleChange(idx, e.target.value)}
                        />
                    </li>
                ))}
                <div className="editButtons">
                    <button type="submit">Opslaan</button>
                </div>
            </form>
        </ModalComponent>
    );
};

export default AddPoints;
