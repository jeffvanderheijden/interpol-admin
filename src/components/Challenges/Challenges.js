import React, { useState, useEffect } from "react";
import SingleChallenge from "./SingleChallenge";
import { getChallenges } from "../../helpers/data/dataLayer";

const Challenges = ({
    groupId
}) => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        getChallenges(groupId)
            .then(response => response.json())
            .then(data => setChallenges(data))
            .catch(error => console.error(error));
    }, [groupId]);

    return (
        <section>
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