import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Logout() {
    const { logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <h1>You must logout first</h1>
            <button onClick={handleLogout} className="button">
                Logout
            </button>
        </>
    );
}
