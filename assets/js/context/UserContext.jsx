import React, { createContext, useState, useEffect } from 'react';
import SessionExpired from "../pages/Another/SessionExpired";
import {useLocation, useNavigate} from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)', // Центрирование
        padding: '20px', // Дополнительное пространство
        background: 'none !important', // Цвет фона
        borderRadius: '10px', // Закругленные края
        border: '1px solid #ccc', // Граница
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон
    },
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isTokenExpiredModalOpen, setIsTokenExpiredModalOpen] = useState(false); // Состояние модального окна
    const navigate = useNavigate();
    const location = useLocation()
    let from = location.state?.from || '/';
    if (from === '/logout') {
        from = '/'
    }



    useEffect(() => {
        checkAuth();

        const interval = setInterval(() => {
            checkAuth();
        }, 300000); // 5 min = 300000

        return () => clearInterval(interval); // Очистка таймера при размонтировании
    }, []);

    const  checkAuth = async () => {
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
                setUserData(false)
            }
        } catch (error) {
            console.error('An error occurred during checkAuth:', error);
        }
    }


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
            navigate(from, { replace: true });
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
            navigate('/login');
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
            setIsTokenExpiredModalOpen(true); // Открываем модальное окно
            setIsAuthenticated(false);
            setUserData(null);
        } else {
            throw new Error('Logout failed');
        }
    };


    return (
        <UserContext.Provider
            value={{ userData, isAuthenticated, tokenLogout, login, logout, checkAuth }}
        >
            <SessionExpired
                isOpen={isTokenExpiredModalOpen}
                onClose={() => setIsTokenExpiredModalOpen(false)}
                style={customStyles}

            />
            {children}
        </UserContext.Provider>
    );
};
