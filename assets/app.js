import './styles/app.css';
import './styles/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
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

function App() {
    return (
        <TranslationProvider>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="/logout" element={<Logout />} />

                            <Route element={<ExitRequired />}>
                                <Route path="login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                            </Route>

                            <Route element={<AuthRequired />}>
                                <Route
                                    path="user/settings"
                                    element={<UserSettings />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </TranslationProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
