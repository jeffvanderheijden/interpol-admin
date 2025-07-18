import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import { checkSession, login } from "./../../helpers/data/dataLayer";
import "./Login.css";

const isMockAuth = process.env.GATSBY_ENABLE_MOCK_AUTH === 'true';

const Login = () => {
    // LDAP login form
    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', e.target.elements.username.value);
        formData.append('password', e.target.elements.password.value);

        let loggedIn = await login(formData);
        if (loggedIn) {
            navigate('/dashboard');
        }
    }

    useEffect(() => {
        if (isMockAuth) {
            navigate('/dashboard');
        } else {
            checkSession().then(isTeacher => {
                if (isTeacher) navigate('/dashboard');
            });
        }
    }, []);


    return (
        <div id="loginWrapper">
            <form id="loginForm" onSubmit={(e) => { submitForm(e) }}>
                <input type="text" id="username" placeholder="Username" />
                <input type="password" id="password" placeholder="Password" />
                <button type="submit" className="btn"><span>Inloggen</span></button>
            </form>
        </div>
    );
}

export default Login;