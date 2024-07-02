import React, { useEffect, useState } from "react";
import "./../helpers/styles/reset.css";
import Filter from "../components/Filter/Filter";
import Groups from "../components/Groups/Groups";

const IndexPage = () => {
  const [filters, setFilters] = useState({
    searchGroup: "",
    searchStudent: "",
    class: "",
    score: ""
  });

  return (
    <main>
      <Filter 
        filters={filters}
        setFilters={setFilters}
      />
      <Groups 
        filters={filters}
        setFilters={setFilters}
      />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Admin panel</title>
