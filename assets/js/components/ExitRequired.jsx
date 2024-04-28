import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

// Pages such as Login and Registation are only available when the user is logged out!
export default function ExitRequired() {
    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn) {
        return <Navigate to="/logout" replace />;
    }

    return <Outlet />;
}
