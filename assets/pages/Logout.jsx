import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

export default function Logout() {
    const [user, setUser] = React.useState(localStorage.getItem('token'));
    const { logout } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/" replace />;
    }

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
