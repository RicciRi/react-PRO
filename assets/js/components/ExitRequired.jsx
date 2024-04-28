import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// Pages such as Login and Registation are only available when the user is logged out!
export default function ExitRequired() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('/api/check-auth', {
                    credentials: 'include',
                });

                const data = await response.json(); // Получение данных из ответа

                if (response.ok && data.authenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('An error occurred during checkAuth:', error); // Обработка неожиданных ошибок
            }
        }

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <p>Loading...</p>; // wait for response
    }

    if (isAuthenticated) {
        return <Navigate to="/logout" replace />;
    }

    return <Outlet />;
}
