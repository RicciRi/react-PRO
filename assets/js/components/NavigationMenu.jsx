// src/components/NavigationMenu.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoPaperPlaneOutline } from "react-icons/io5";
import { AiOutlineInbox } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { useTranslation } from '../context/TranslateContext';

const NavigationMenu = () => {
    const { trans } = useTranslation();

    return (
        <div className="navigation-menu">
            <ul className="ul-basic-style nav-bg d-flex">
                <li>
                    <NavLink to="/send" className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <span className="d-flex-center">
                            <IoPaperPlaneOutline />
                        </span>
                        <span>
                            {trans('lang.sendMessage')}
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contacts" className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <span className="d-flex-center">
                            <RiContactsBook3Line />
                        </span>
                        <span>
                            {trans('lang.contacts')}
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/template" className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <span className="d-flex-center">
                            <MdOutlineMailOutline />
                        </span>
                        <span>
                            {trans('lang.emailTemplate')}
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/history" className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <span className="d-flex-center">
                            <AiOutlineInbox />
                        </span>
                        <span>
                            {trans('lang.history')}
                        </span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default NavigationMenu;
