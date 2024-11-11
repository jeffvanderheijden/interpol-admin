

import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import dataLayer, { checkSession } from "../helpers/data/dataLayer";
import ModalComponent from "../components/Modal/Modal";
import "./../helpers/styles/reset.css";
import Filter from "../components/Filter/Filter";
import Groups from "../components/Groups/Groups";

const DashboardPage = () => {
  const [groups, setGroups] = useState([]); 
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filters, setFilters] = useState({ searchGroup: '', searchStudent: '' });
  const [isTeacher, setIsTeacher] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => setOpenModal(false);

  const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

  // Check if user is logged in as a teacher
  useEffect(() => {
    checkSession().then(isTeacher => {
      setIsTeacher(isTeacher);
      if (!isTeacher) {
        navigate('/');
      }
    });
  }, []);

  // Fetch groups and students
  useEffect(() => {
    if (isTeacher) {
      const fetchData = async () => {
        const data = await dataLayer();
        setGroups(data);
        setFilteredGroups(data);
      };
      fetchData();
    }
  }, [isTeacher]);

  // Searches for groups
  useEffect(() => {
    setFilters({ ...filters, searchStudent: '' });
    const searchQueryGroup = filters.searchGroup.toLowerCase();

    const searchedGroups = groups.filter(group => {
        const groupNameMatches = group.name.toLowerCase().includes(searchQueryGroup);
        return groupNameMatches;
    });

    setFilteredGroups(searchedGroups);
  }, [filters.searchGroup]);

  // Searches for students
  useEffect(() => {
    setFilters({ ...filters, searchGroup: '' });
    const searchQueryStudent = filters.searchStudent.toLowerCase();

    const studentMatches = groups.filter(group => (
      group.students.some(student =>
        student.name.toLowerCase().includes(searchQueryStudent)
      ))
    );
    setFilteredGroups(studentMatches);
  }, [filters.searchStudent]);

  return (    
    <>
      {isTeacher && (
        <main>
          <Filter 
            filters={filters}
            setFilters={setFilters}
            setOpenModal={setOpenModal}
          />
          <Groups
            groups={filteredGroups}
          />
          <ModalComponent 
              modalIsOpen={openModal}
              afterOpenModal={null}
              closeModal={closeModal}
              customStyles={customStyles}
              contentLabel="New group"
          >
              <div className="newGroup">
                  <section className="groupSection">
                      <div className="groupImage">
                          <img src="" alt="Group image" />
                      </div>
                      <div>
                          <input type="text" placeholder={"Groep naam"} />
                          <input type="text" placeholder={"Klas"} />
                      </div>
                  </section>   
                  <ul className="editStudents">
                    <li>
                        <input type="number" placeholder={"Studentnummer"} />   
                        <input type="text" placeholder={"Student naam"} />
                    </li>
                  </ul>
                  <div className="editButtons">
                    <button onClick={() => { setNewStudents([ ...newStudents, { name: '', student_number: '' }]) }}>Student toevoegen</button>
                    <button onClick={() => { console.log('opslaan' )}}>Opslaan</button>
                  </div>
              </div>
          </ModalComponent>
        </main>
      )}    
    </>
  )
}

export default DashboardPage

export const Head = () => <title>Admin panel</title>
