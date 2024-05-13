import React, {useState, useEffect, useContext} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {UserContext} from '../../context/UserContext'

// Pages such as Login and Registation are only available when the user is logged out!
export default function AuthRequired() {
    const {isAuthenticated, checkAuth, expiredToken} = useContext(UserContext);

    useEffect(() => {
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate
            to="/login"
            state={{
                message: 'You must log in first',
                from: location.pathname,
            }}
            replace
        />;
    }
    return <Outlet/>;
}
