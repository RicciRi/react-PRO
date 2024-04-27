import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const login = (userData) => {
        setUserData(userData);
        localStorage.setItem('token', userData.token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUserData(null);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            const response = await fetch('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
            } else {
                logout();
            }
        };

        fetchUser(); // Вызываем функцию при монтировании компонента
    }, []); // Пустой массив зависимостей

    return (
        <UserContext.Provider value={{ userData, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
