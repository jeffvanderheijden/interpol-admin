import React, { useEffect, useState } from "react";
import "./Groups.css";
import Students from "../Students/Students";
import Challenges from "../Challenges/Challenges";

const Groups = ({
    filters
}) => {
    const [groups, setGroups] = useState([]);
    const [searchedGroups, setSearchedGroups] = useState([]);

    useEffect(() => {
        fetch("https://api.jeffvanderheijden.nl/api/groups")
            .then(response => response.json())
            .then(data => setGroups(data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const searchedGroups = groups.filter((group) => {
            const groupName = group.name.toLowerCase();
            const searchQuery = filters.searchGroup.toLowerCase();
            return groupName.includes(searchQuery);
        });
        setSearchedGroups(searchedGroups);
    }, [filters.searchGroup]);

    useEffect(() => {
        setSearchedGroups(groups);
    }, [groups]);

    return (
        <section id="groups">
            <ul id="group-tabs">
                {searchedGroups && searchedGroups.map(group => (
                    <li class="group" key={group.id}>
                        <section class="groupSection">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/TestScreen_square.svg" alt={group.name} />
                            <div>
                                <h2>{group.name}</h2>
                                <p>{group.class}</p>
                            </div>
                        </section>
                        <Students groupId={group.id} />
                        {/* <Challenges groupId={group.id} /> */}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Groups;