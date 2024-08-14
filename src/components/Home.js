import React from "react";
import { useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
    const location = useLocation();

    return (
        <div className="homepage">
            <h1>Hello {location.state.id} and Welcome</h1>
        </div>
    );
}

export default Home;
