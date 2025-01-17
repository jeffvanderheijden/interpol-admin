import React, { useEffect, useState } from "react";
import "./students.css";

const Students = ({
    groupId
}) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents(groupId)
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error(error));
    }, [groupId]);

    return (
        <section className="studentsSection">
            {students && students.map(student => (
                <ul key={student.id}>
                    <li><h3>{student.name}</h3><p>{student.student_number}</p></li>
                </ul>
            ))}
        </section>
    );
}

export default Students;