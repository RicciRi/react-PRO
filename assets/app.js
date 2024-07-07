import './styles/app.css';
import './styles/app.scss';
import 'bootstrap';

import React from 'react';
import Modal from 'react-modal';
import {createRoot} from 'react-dom/client'; // Правильный импорт
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {TranslationProvider} from './js/context/TranslateContext';
import {UserProvider} from './js/context/UserContext';

import AuthRequired from './js/components/Requires/AuthRequired';
import ExitRequired from './js/components/Requires/ExitRequired';
import Layout from './js/components/Layout';
import Home from './js/pages/Another/Home';
import Login from './js/pages/Security/Login';
import Logout from './js/pages/Another/Logout';
import Register from './js/pages/Registration/Register';
import UserSettings from './js/pages/User_settings/UserSettings';
import NotFound from './js/pages/Another/NotFound';
import SessionExpired from './js/pages/Another/SessionExpired'

import Register_Confirm_Email from './js/pages/Registration/Register_Confirm_Email';
import Register_New_Confirm_Email from './js/pages/Registration/Register_New_Confirm_Email';
import UserAccount from "./js/pages/User/UserAccount";
import Contacts from "./js/pages/Contacts/Contacts";
import EmailTemplate from "./js/pages/Email_template/Email_template";
import History from "./js/pages/History/History";
import Upload from "./js/pages/Send_message/Send_message";

function App() {
    return (
        <BrowserRouter>
            <TranslationProvider>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<Home/>}/>
                            <Route path="/logout" element={<Logout/>}/>

                            <Route element={<ExitRequired/>}>
                                <Route path="login" element={<Login/>}/>
                                <Route path="/session/expired" element={<SessionExpired/>}/>
                                <Route
                                    path="register"
                                    element={<Register/>}
                                />
                                <Route
                                    path="register/confirm"
                                    element={<Register_Confirm_Email/>}
                                />
                                {/*<Route*/}
                                {/*    path="register/confirm/new"*/}
                                {/*    element={<Register_New_Confirm_Email/>}*/}
                                {/*/>*/}
                            </Route>

                            <Route element={<AuthRequired/>}>

                                <Route
                                    path="account"
                                    element={<UserAccount/>}
                                >
                                </Route>
                                <Route
                                    path="settings"
                                    element={<UserSettings/>}
                                />
                                <Route
                                    path="send"
                                    element={<Upload/>}

                                />
                                <Route
                                    path="contacts"
                                    element={<Contacts/>}
                                />
                                <Route
                                    path="template"
                                    element={<EmailTemplate/>}
                                />
                                <Route
                                    path="history"
                                    element={<History/>}
                                />
                            </Route>
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </UserProvider>
            </TranslationProvider>
        </BrowserRouter>
    );
}

Modal.setAppElement('#root'); // Здесь 'root' - это ID корневого элемента в HTML

const container = document.getElementById('root');
const root = createRoot(container); // Создание корневого элемента
root.render(<App/>);
