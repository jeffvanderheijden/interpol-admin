import React, { useState, useEffect } from "react";
import dataLayer from "../helpers/data/dataLayer";
import "./../helpers/styles/reset.css";
import Filter from "../components/Filter/Filter";
import Groups from "../components/Groups/Groups";

const IndexPage = () => {
  const [groups, setGroups] = useState([]); 
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filters, setFilters] = useState({ searchGroup: '', searchStudent: '' });

  useEffect(() => {
    const fetchData = async () => {
        const data = await dataLayer();
        console.log(data);
        setGroups(data);
        setFilteredGroups(data);        
    };
    fetchData();
  }, []);

  // TODO Figure out why fucking filter isn't working properly.
  // Sidenote: FUCK CHATGPT
  useEffect(() => {
    const searchQueryGroup = filters.searchGroup.toLowerCase();
    const searchQueryStudent = filters.searchStudent.toLowerCase();

    const searchedGroups = groups.filter(group => {
        const groupNameMatches = group.name.toLowerCase().includes(searchQueryGroup);
        const studentMatches = group.students.some(student =>
            student.name.toLowerCase().includes(searchQueryStudent)
        );
        return groupNameMatches || studentMatches;
    });

    setFilteredGroups(searchedGroups);
  }, [filters.searchGroup, filters.searchStudent]);


  return (
    <main>
      <Filter 
        filters={filters}
        setFilters={setFilters}
      />
      <Groups 
        groups={filteredGroups}
      />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Admin panel</title>
