import './styles/app.css';
import './styles/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './components/TranslateContext';
import { UserProvider } from './components/UserContext';

import AuthRequired from './components/AuthRequired';
import ExitRequired from './components/ExitRequired';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import UserSettings from './pages/UserSettings';

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
