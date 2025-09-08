import React, { useState } from "react";
import "./Groups.css";
import EditGroup from "./../Modal/EditGroup";
import AddPoints from "./../Modal/AddPoints";
// import Close from "./../../helpers/icons/Close";
// import Check from "./../../helpers/icons/Check";
// import Copy from  "./../../helpers/icons/Copy";
import { removeTeam } from "./../../helpers/data/dataLayer";
// import TimeScoring from "../TimeScoring/TimeScoring";

const Groups = ({
    groups,
    setGroups,
    setFilteredGroups
}) => {
    const apiUrl = "https://api.interpol.sd-lab.nl/";
    const [openModal, setOpenModal] = useState(null);
    const [openPointsModal, setOpenOpointsModal] = useState(null);
    const [visibleCodes, setVisibleCodes] = useState([]);

    const closeModal = () => setOpenModal(null);
    const closePointsModal = () => setOpenOpointsModal(null);
    const openSpecificModal = (modalName) => setOpenModal(modalName);

    // const toggleCode = (event, code) => {
    //     if (visibleCodes.includes(code)) {
    //         setVisibleCodes(visibleCodes.filter((c) => c !== code));
    //     } else {
    //         setVisibleCodes([...visibleCodes, code]);
    //     }
    //     event.stopPropagation();
    // }

    // const copyCode = (event, code) => {
    //     navigator.clipboard.writeText(code);
    //     event.stopPropagation();
    //     event.target.closest("li").querySelector('.checkmark').classList.add('show');
    //     event.target.closest("li").querySelector('.copy').classList.add('hide');
    //     setTimeout(() => {
    //         event.target.closest("li").querySelector('.checkmark').classList.remove('show');
    //         event.target.closest("li").querySelector('.copy').classList.remove('hide');
    //     }, 2000);
    // }

    const removeGroup = (e, group, classTitle, groupId) => {
        e.stopPropagation();
        if (window.confirm(`Weet je zeker dat je groep ${group} uit klas ${classTitle} wilt verwijderen?`)) {
            removeTeam(groupId).then(res => {
                // Reload the page to show the updated group list
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
        } else {
            // Do nothing
        }
    }

    return (
        <>
            <section id="groupHeaders">
                <div className="groupsHeader">
                    <h1>Groepen</h1>
                </div>
                <div className="studentsHeader">
                    <h1>Studentnummer</h1>
                    <h1>Naam</h1>
                </div>
                <div className="challengesHeader">
                    <h1>Uitdagingen</h1>
                    <h1>Max score</h1>
                </div>
                <div className="timeScoringHeader">
                    <h1>Scores</h1>
                </div>
            </section>
            <section id="groups">
                <ul id="group-tabs">
                    {groups && groups.length > 0 && groups.map((group, idx) => (
                        <>
                            <li className="group" key={idx} onClick={() => { openSpecificModal(group.id) }}>
                                <section className="groupSection">
                                    <img
                                        src={group.image_url.startsWith("http") ? group.image_url : `${apiUrl}${group.image_url}`}
                                        alt={group.name}
                                    />
                                    <div>
                                        <h2>{group.name}</h2>
                                        <p>{group.class}</p>
                                        <button className="deleteGroup" onClick={(e) => { removeGroup(e, group.name, group.class, group.id) }}>Verwijder groep</button>
                                    </div>
                                </section>
                                {/* Students */}
                                {group.students.length > 0 && (
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
                                )}
                                {/* Challenges */}
                                {group.challenges.length > 0 && (
                                    <>
                                        <section className="challengesSection" >
                                            <ul>
                                                {group.challenges.map((challenge, idx) => (
                                                    <li key={idx}>
                                                        <h3>{challenge.name}</h3>
                                                        <div>1000</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>


                                        {/* <section className="timeScoring">
                                            {group.challenges.map((challenge) => (                                        
                                                <TimeScoring challenge={challenge} group_id={group.id} />
                                            ))}                                            
                                        </section> */}

                                        {/* <section className="challengeKeys">
                                            <ul key={idx}>
                                                {group.challenges.map((challenge, idx) => (                                        
                                                    <li key={idx}>
                                                        <h3 className={visibleCodes.includes(challenge.keycode) ? 'visible' : 'invisible'} onClick={(e) => { toggleCode(e, challenge.keycode)}}>{challenge.keycode}</h3>
                                                        <Copy className={'copy'} onClick={(e) => { copyCode(e, challenge.keycode)} } />
                                                        <Check className={'checkmark green hide'} onClick={(e) => { copyCode(e, challenge.keycode)} } />
                                                    </li>
                                                ))}
                                            </ul>
                                        </section> */}
                                    </>
                                )}
                                <section className="pointsSection" >
                                    <span>({group.challenges.reduce((sum, c) => sum + (c.points || 0), 0)})</span>
                                    <button className="addPoints" onClick={(e) => { e.stopPropagation(); setOpenOpointsModal(group.id); }}>
                                        Punten toevoegen
                                    </button>
                                </section>
                            </li>
                            <EditGroup
                                group={group}
                                openModal={openModal}
                                closeModal={closeModal}
                                apiUrl={apiUrl}
                                setGroups={setGroups}
                                setFilteredGroups={setFilteredGroups}
                            />
                            <AddPoints
                                group={group}
                                openModal={openPointsModal}
                                closeModal={closePointsModal}
                            />
                        </>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default Groups;