import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import { checkSession } from "./../../helpers/data/dataLayer";
import "./Login.css";

const Login = () => {
    // LDAP login form
    async function submitForm(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', e.target.elements.username.value);
        formData.append('password', e.target.elements.password.value);

        try {
            const response = await fetch('https://api.interpol.sd-lab.nl/api/create-session', {
                method: 'POST',
                body: formData,
                credentials: 'include' // Ensure cookies are included with the request
            });

            const responseText = await response.text(); // Read the raw response body as text

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const login = JSON.parse(responseText); // Parse the response text as JSON

            // Do something with the login response, e.g., handle login success or error
            if (login.error) {
                console.error('Login error:', login.error);
            } else {
                console.log('Login successful:', login.message);
                navigate('/dashboard/');
            }

        } catch (error) {
            console.error('Error creating session:', error);
        }
    }

    // Check if user is logged in as a teacher
    useEffect(() => {
        checkSession().then(isTeacher => {
            isTeacher && navigate('/dashboard');
        });
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