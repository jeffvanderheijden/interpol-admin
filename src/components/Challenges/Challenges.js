import React, { useState, useEffect } from "react";
import SingleChallenge from "./SingleChallenge";

const Challenges = ({
    groupId
}) => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        fetch(`https://api.jeffvanderheijden.nl/api/challenges-by-group?id=${groupId}`)
            .then(response => response.json())
            .then(data => setChallenges(data))
            .catch(error => console.error(error));
    }, [groupId]);

    return (
        <section>
            <h1>Challenges</h1>
            {challenges && challenges.map(challenge => (
                <div key={challenge.id}>
                    <h2>{challenge.id}</h2>
                    <p>{challenge.completed}</p>
                    <p>{challenge.points}</p>
                    <p>{challenge.point_deduction}</p>
                    <p>{challenge.keycode}</p>
                    <SingleChallenge challengeId={challenge.id} />
                </div>
            ))}
        </section>
    );
}

export default Challenges;