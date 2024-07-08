import React from "react";
import "./Groups.css";

const Groups = ({
    groups
}) => {

    // Change on deployment
    const apiUrl = "https://api.interpol.sd-lab.nl/";

    return (
        <section id="groups">
            <ul id="group-tabs">
                {groups && groups.map((group, idx) => (
                    <li className="group" key={idx}>
                        <section className="groupSection">
                            <div className="groupImage">
                                <img src={`${apiUrl + group.image_url}`} alt={group.name} />
                            </div>
                            <div>
                                <h2>{group.name}</h2>
                                <p>{group.class}</p>
                            </div>
                        </section>
                        {/* Todo add student compontent here. */}
                        <section className="studentsSection">
                            <ul>
                                {group.students.map((student, idx) => (
                                    <li key={idx}>
                                        <p>{student.student_number}</p>
                                        <p>{student.name}</p>                                        
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="challengesSection">
                            {group.challenges.map((challenge, idx) => (
                                <ul key={idx}>
                                    <li>
                                        <h3>{challenge.name}</h3>
                                        <div>
                                            {challenge.completed ? 
                                                <span>V</span> : 
                                                <span>X</span>
                                            }
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </section>
                        <section className="challengeKeys">
                            {group.challenges.map((challenge, idx) => (
                                <ul key={idx}>
                                    <li>
                                        <h3>{challenge.keycode}</h3>
                                    </li>
                                </ul>
                            ))}
                        </section>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Groups;