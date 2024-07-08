import React from "react";
import "./Login.css";

const Login = () => {
    // LDAP login form
    // LDAP login form
    async function submitForm(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', e.target.elements.username.value);
        formData.append('password', e.target.elements.password.value);

        try {
            const response = await fetch('https://api.interpol.sd-lab.nl/api/create-session', {
                method: 'POST',
                body: formData
            });

            // const responseText = await response.json(); // Read the raw response body as text

            // console.log('Response Text:', responseText.error);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const login = JSON.parse(response.json()); // Parse the response text as JSON
            console.log(login);

            // Do something with the login response, e.g., handle login success or error
            if (login.error) {
                console.error('Login error:', login.error);
            } else {
                console.log('Login successful:', login.message);
            }

        } catch (error) {
            console.error('Error creating session:', JSON.parse(error));
        }
    }


    return (
        <form id="loginForm" onSubmit={(e) => { submitForm(e) }}>
            <input type="text" id="username" placeholder="Username" />
            <input type="password" id="password" placeholder="Password" />
            <button type="submit" className="btn">Inloggen</button>
        </form>
    );
}

export default Login;