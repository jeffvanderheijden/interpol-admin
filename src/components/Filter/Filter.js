import React from "react";
import "./Filter.css";

const Filter = ({
    filters,
    setFilters
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
    return (
        <section id="filter">
            <input type="text" placeholder="Zoek door groepen.." onChange={(e) => { searchGroup(e) }} />
            <input type="text" placeholder="Zoek door studenten.." onChange={(e) => { searchStudent(e) }} />
        </section>
    );
}

export default Filter;