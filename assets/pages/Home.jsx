import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="homepage-container container-fluid p-5">
            <h1>HELLO HOME PAGE</h1>
            <Link to="/login">
                <h1 className="logo">Login</h1>
            </Link>
        </div>
    );
};

export default Home;
