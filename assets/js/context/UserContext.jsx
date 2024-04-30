import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('/api/check-auth', {
                    credentials: 'include',
                });

                const data = await response.json();

                if (data.tokenExpired) {
                    tokenLogout();
                }

                if (data.authenticated) {
                    setIsAuthenticated(true);
                    const userResponse = await fetch('/api/user', {
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        setUserData(userData);
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('An error occurred during checkAuth:', error);
            }
        }
        checkAuth();
    }, []);

    const login = async (credentials) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include',
        });

        if (response.ok) {
            setIsAuthenticated(true);
            const userData = await response.json();
            setUserData(userData.userInfo);
            navigate('/');
            window.location.reload();
        } else {
            const errorData = await response.json();
            return errorData;
        }
    };

    const logout = async () => {
        const response = await fetch('/api/logout', {
            credentials: 'include',
        });

        if (response.ok) {
            setIsAuthenticated(false);
            setUserData(null);
            navigate('/');
            window.location.reload();
        } else {
            throw new Error('Logout failed');
        }
    };

    const tokenLogout = async () => {
        const response = await fetch('/api/logout', {
            credentials: 'include',
        });

        if (response.ok) {
            setIsAuthenticated(false);
            setUserData(null);
            navigate('/reLogin');
            window.location.reload();
        } else {
            throw new Error('Logout failed');
        }
    };

    return (
        <UserContext.Provider
            value={{ userData, isAuthenticated, tokenLogout, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};
