import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8001/", {
                email, password
            });

            if (res.data.status === "exist") {
                navigate('/home', { state: { id: email } });
            } else if (res.data.status === "notexist") {
                alert("User has not signed up");
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>

            <form method="POST">
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="submit" onClick={submit} />
            </form>

            <br />
            <Link to="/signup">Sign Up</Link>
        </div>
    );
}

export default Login;
