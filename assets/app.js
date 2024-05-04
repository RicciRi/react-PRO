import './styles/app.css';
import './styles/app.scss';
import 'bootstrap';

import React from 'react';
import {createRoot} from 'react-dom/client'; // Правильный импорт
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {TranslationProvider} from './js/context/TranslateContext';
import {UserProvider} from './js/context/UserContext';

import AuthRequired from './js/components/Requires/AuthRequired';
import ExitRequired from './js/components/Requires/ExitRequired';
import Layout from './js/components/Layout';
import Home from './js/pages/Home';
import Login from './js/pages/Security/Login';
import Logout from './js/pages/Logout';
import Register from './js/pages/registration/Register';
import UserSettings from './js/pages/Main_Navigation/User/UserSettings';
import NotFound from './js/pages/NotFound';
import ReLogin from './js/pages/reLogin';
import Register_Confirm_Email from './js/pages/registration/Register_Confirm_Email';
import Register_New_Confirm_Email from './js/pages/registration/Register_New_Confirm_Email';
import Navigation from "./js/pages/Main_Navigation/navigation";
import Import from "./js/pages/Main_Navigation/Import/Import";
import Users from "./js/pages/Main_Navigation/ManageUsers/Users";
import UserAccount from "./js/pages/Main_Navigation/User/UserAccount";
import Block_1 from "./js/pages/Main_Navigation/ManageUsers/Block_1";
import Block_2 from "./js/pages/Main_Navigation/ManageUsers/Block_2";
import Block_3 from "./js/pages/Main_Navigation/ManageUsers/Block_3";
import Block_4 from "./js/pages/Main_Navigation/ManageUsers/Block_4";

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
                                <Route path="/reLogin" element={<ReLogin/>}/>
                                <Route
                                    path="/register"
                                    element={<Register/>}
                                >
                                    <Route
                                        path="register/confirm"
                                        element={<Register_Confirm_Email/>}
                                    />
                                    <Route
                                        path="register/new/confirm"
                                        element={<Register_New_Confirm_Email/>}
                                    />
                                </Route>
                            </Route>

                            <Route element={<AuthRequired/>}>
                                <Route path="nav" element={<Navigation/> }>
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
                                        path="import"
                                        element={<Import/>}
                                    />
                                    <Route
                                        path="users"
                                        element={<Users/>}
                                    >
                                        <Route
                                            index
                                            element={<Block_1 />}
                                        />
                                        <Route
                                            path="block/2"
                                            element={<Block_2 />}
                                        />
                                        <Route
                                            path="block/3"
                                            element={<Block_3 />}
                                        />
                                        <Route
                                            path="block/4"
                                            element={<Block_4 />}
                                        />
                                    </Route>
                                </Route>
                            </Route>
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </UserProvider>
            </TranslationProvider>
        </BrowserRouter>
    );
}

const container = document.getElementById('root');
const root = createRoot(container); // Создание корневого элемента
root.render(<App/>);
