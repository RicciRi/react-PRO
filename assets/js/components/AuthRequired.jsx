import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
// Pages such as Host, Form, Income are only available when the user is logged in
export default function AuthRequired() {
    const { isAuthenticated } = useContext(UserContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}
