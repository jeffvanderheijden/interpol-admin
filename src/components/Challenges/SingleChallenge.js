import React, { useState, useEffect } from "react";

const SingleChallenge = ({
    challengeId
}) => {
    const [challenge, setChallenge] = useState([]);

    useEffect(() => {
        fetch(`https://api.interpol.sd-lab.nl/api/challenge-by-id?id=${challengeId}`)
            .then(response => response.json())
            .then(data => setChallenge(data))
            .catch(error => console.error(error));
    }, [challengeId]);

    return (
        <section>
            {challenge && challenge.map(single => (
                <div key={single.id}>
                    <p>{single.name}</p>
                    <p>{single.time_limit}</p>
                    <p>{single.minimum_points}</p>
                </div>
            ))}
        </section>
    );
}

export default SingleChallenge;