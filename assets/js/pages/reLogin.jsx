import React from 'react';
import { Link } from 'react-router-dom';

export default function reLogin() {
    return (
        <div className="p-5">
            <div className="form-section">
                <h1>Your sessions end</h1>
                <p>You need to login again!</p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}
