import React from "react";
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
                body: formData
            });
            const login = response.body;
            console.log(login);
        } catch (error) {
            console.error('Error creating team:', error);
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