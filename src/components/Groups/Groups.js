import React, { useEffect, useState } from "react";
import "./Groups.css";
// import Students from "../Students/Students";
// import Challenges from "../Challenges/Challenges";

const Groups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch("https://api.jeffvanderheijden.nl/api/groups")
            .then(response => response.json())
            .then(data => setGroups(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <section id="groups">
            <ul id="group-tabs">
                {groups && groups.map(group => (
                    <li className="group" key={group.id}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/TestScreen_square.svg" alt={group.name} />
                        <div>
                            <h2>{group.name}</h2>
                            <p>{group.class}</p>
                        </div>
                        {/* <Students groupId={group.id} />
                        <Challenges groupId={group.id} /> */}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Groups;