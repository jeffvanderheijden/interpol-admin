import React from "react";
import { navigate } from "@reach/router";
import "./Filter.css";

const Filter = ({
    filters,
    setFilters,
    setOpenModal
}) => {
    const searchGroup = (e) => {
        setFilters({
            ...filters,
            searchGroup: e.target.value
        })
    }

    const searchStudent = (e) => {
        setFilters({
            ...filters,
            searchStudent: e.target.value
        })
    }

    const addGroup = () => {
        console.log('add group');
    }

    const logout = async () => {
        try {
            const response = await fetch('https://api.interpol.sd-lab.nl/api/logout.php', {
                method: 'POST',
                credentials: 'include' // Include cookies in the request
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Logout successful:', data.message);
    
            // Redirect to login page or perform other actions
            navigate('/');
    
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle error, e.g., display error message
        }
    }

    return (
        <section id="filter">
            <input type="text" placeholder="Zoek door groepen.." onChange={(e) => { searchGroup(e) }} value={filters.searchGroup} />
            <input type="text" placeholder="Zoek door studenten.." onChange={(e) => { searchStudent(e) }} value={filters.searchStudent} />
            <button onClick={() => { setOpenModal(true) }}>Groep toevoegen</button>
            <button className={"logout"} onClick={() => { logout() }}>Uitloggen</button>
        </section>
    );
}

export default Filter;