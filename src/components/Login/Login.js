import React from "react";
import "./Login.css";

const Login = () => {
    // LDAP login form
    async function submitForm(e) {
        try {
            const response = await fetch('https://api.interpol.sd-lab.nl/api/create-session', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const login = await response.json();
            console.log(login);

            // Do something with the login response, e.g., handle login success or error
            if (login.error) {
                console.error('Login error:', login.error);
            } else {
                console.log('Login successful:', login.message);
            }

        } catch (error) {
            console.error('Error creating session:', error);
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