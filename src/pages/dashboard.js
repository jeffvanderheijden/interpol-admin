

import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import dataLayer, { checkSession } from "../helpers/data/dataLayer";
import "./../helpers/styles/reset.css";
import Filter from "../components/Filter/Filter";
import Groups from "../components/Groups/Groups";
import NewGroup from "../components/Modal/NewGroup";

const DashboardPage = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filters, setFilters] = useState({ searchGroup: '', searchStudent: '' });
  const [isTeacher, setIsTeacher] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  
  const closeModal = () => setOpenModal(false);

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
            setGroups={setGroups}
            setFilteredGroups={setFilteredGroups}
          />
          <NewGroup 
            openModal={openModal}
            closeModal={closeModal}
          />
        </main>
      )}
    </>
  )
}

export default DashboardPage

export const Head = () => <title>Admin panel</title>
