import React, { useState, useEffect, useRef } from "react";
import { updateGroupChallenge } from "../../helpers/data/dataLayer";

// Converts HH:MM to minutes
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}

// Points formula: 0 if overtime, else scaled by how fast
function calculatePoints(completionTime, allowedTime, maxPoints = 1000) {
    if (completionTime > allowedTime) return 0;
    const ratio = 1 - (completionTime / allowedTime);
    return Math.round(maxPoints * ratio);
}

const TimeScoring = ({
    challenge,
    group_id
}) => {
    const firstRender = useRef(true);

    const [allowedTimeStr, setAllowedTimeStr] = useState("00:00");
    const [completionTimeStr, setCompletionTimeStr] = useState("00:00");

    const allowedTime = timeToMinutes(allowedTimeStr);
    const completionTime = timeToMinutes(completionTimeStr);
    const points = calculatePoints(completionTime, allowedTime, 1000);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return; // Skip first run
        }

        updateGroupChallenge({ group_id, challenge_id: challenge.id, points });
    }, [allowedTimeStr, completionTimeStr]);

    return (
        <div key={challenge.id}>
            <label>
                Uitdaging duur:
                <input
                    type="time"
                    step="60"
                    value={allowedTimeStr}
                    onChange={(e) => setAllowedTimeStr(e.target.value)}
                />
            </label>

            <label>
                Afgerond in:
                <input
                    type="time"
                    step="60"
                    value={completionTimeStr}
                    onChange={(e) => setCompletionTimeStr(e.target.value)}
                />
            </label>

            <div>
                {`Score: ${challenge.points ? challenge.points : (points ? points : '0')}`}
            </div>

            {completionTime > allowedTime && (
                <p style={{ color: "red" }}>Geen punten.</p>
            )}
        </div>
    );
};

export default TimeScoring;
