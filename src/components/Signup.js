import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Signup.css';

function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8001/signup", {
                email, password
            });

            if (res.data.status === "exist") {
                alert("User already exists");
            } else if (res.data.status === "notexist") {
                navigate('/home', { state: { id: email } });
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    }

    return (
        <div className="signup">
            <h1>Sign Up</h1>

            <form method="POST">
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="submit" onClick={submit} />
            </form>

            <br />
            <Link to="/">Login</Link>
        </div>
    );
}

export default Signup;
