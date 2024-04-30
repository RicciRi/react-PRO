import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
// Pages such as Login and Registation are only available when the user is logged out!
export default function ExitRequired() {
    const { isAuthenticated } = useContext(UserContext);

    if (isAuthenticated) {
        return <Navigate to="/logout" replace />;
    }

    return <Outlet />;
}
