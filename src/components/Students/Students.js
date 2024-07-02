import React, { useEffect, useState } from "react";

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
        <section>
            <h1>Students</h1>
            {students && students.map(student => (
                <div key={student.id}>
                    <h2>{student.name}</h2>
                    <p>{student.student_number}</p>
                </div>
            ))}
        </section>
    );
}

export default Students;