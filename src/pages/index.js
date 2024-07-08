import React from "react";
import "./../helpers/styles/reset.css";
import "./../helpers/styles/button.css";
import Login from "../components/Login/Login";

const LoginPage = () => {
    return (
        <Login />
    )
}

export default LoginPage

export const Head = () => <title>Login</title>