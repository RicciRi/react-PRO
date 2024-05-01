import './styles/app.css';
import './styles/app.scss';

import React from 'react';
import { createRoot } from 'react-dom/client'; // Правильный импорт
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './js/context/TranslateContext';
import { UserProvider } from './js/context/UserContext';

import AuthRequired from './js/components/AuthRequired';
import ExitRequired from './js/components/ExitRequired';
import Layout from './js/components/Layout';
import Home from './js/pages/Home';
import Login from './js/pages/Login';
import Logout from './js/pages/Logout';
import Register from './js/pages/Register';
import UserSettings from './js/pages/UserSettings';
import NotFound from './js/pages/NotFound';
import ReLogin from './js/pages/reLogin';
import ConfirmEmail from './js/pages/ConfirmEmail';
import NewConfirmEmail from './js/pages/NewConfirmEmail';

function App() {
    return (
        <BrowserRouter>
            <TranslationProvider>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="/logout" element={<Logout />} />

                            <Route element={<ExitRequired />}>
                                <Route path="login" element={<Login />} />
                                <Route path="/reLogin" element={<ReLogin />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route
                                    path="register/confirm"
                                    element={<ConfirmEmail />}
                                />
                                <Route
                                    path="register/confirm/new"
                                    element={<NewConfirmEmail />}
                                />
                            </Route>

                            <Route element={<AuthRequired />}>
                                <Route
                                    path="user/settings"
                                    element={<UserSettings />}
                                />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </UserProvider>
            </TranslationProvider>
        </BrowserRouter>
    );
}

const container = document.getElementById('root');
const root = createRoot(container); // Создание корневого элемента
root.render(<App />);
