import React, { useState    } from "react";
import ModalComponent from "../Modal/Modal";
import "./AddPoints.css";

const AddPoints = ({
    group,
    openModal,
    closeModal,
}) => {
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

    const [pointsState, setPointsState] = useState(
        group.challenges.map(challenge => '')
    );

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
        console.log(pointsData);

        // Example: send to backend
        fetch('/update-points.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ group_id: group.id, points: pointsData })
        })
            .then(res => res.json())
            .then(data => console.log(data));
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
                    <li key={idx}>
                        <h3>{challenge.name}</h3> 
                        <input placeholder={0}
                            value={pointsState[idx]}
                            onChange={(e) => handleChange(idx, e.target.value)} 
                        />
                    </li>
                ))}
                <div class="editButtons">
                    <button type="submit">Opslaan</button>
                </div>
            </form>
        </ModalComponent>
    );
};

export default AddPoints;
