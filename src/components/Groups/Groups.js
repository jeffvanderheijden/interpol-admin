import React from "react";
import "./Groups.css";

const Groups = ({
    groups
}) => {
    return (
        <section id="groups">
            <ul id="group-tabs">
                {groups && groups.map((group, index) => (
                    <li className="group" key={index}>
                        <section className="groupSection">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/TestScreen_square.svg" alt={group.name} />
                            <div>
                                <h2>{group.name}</h2>
                                <p>{group.class}</p>
                            </div>
                        </section>
                        {/* Todo add student compontent here. */}
                        <section className="studentsSection">
                            <ul>
                                {group.students.map((student, idx) => (
                                    <li key={idx}>{student.name}</li>
                                ))}
                            </ul>
                        </section>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Groups;