import * as React from "react";
import "./../helpers/styles/reset.css";
import Groups from "../components/Groups/Groups";

const IndexPage = () => {
  return (
    <main>
      <Groups />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Admin panel</title>
