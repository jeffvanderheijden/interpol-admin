import React, { useEffect, useState } from "react";
import "./students.css";

const Students = ({
    groupId
}) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`https://api.jeffvanderheijden.nl/api/students-by-group?id=${groupId}`)
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error(error));
    }, [groupId]);

    useEffect(() => {
        console.log(students)
    }, [students])

    return (
        <section class="studentsSection">
            {students && students.map(student => (
                <ul key={student.id}>
                    <li><h3>{student.name}</h3><p>{student.student_number}</p></li>
                </ul>
            ))}
        </section>
    );
}

export default Students;