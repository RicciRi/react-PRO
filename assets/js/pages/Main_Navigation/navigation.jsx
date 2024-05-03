import React, {useContext} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {useTranslation} from "../../context/TranslateContext";
import {FaRegUser, FaUsers} from "react-icons/fa";
import {CiSettings} from "react-icons/ci";
import {LuImport} from "react-icons/lu";

export default function Navigation() {
    const {trans} = useTranslation()


    return (
        <>
            <div className="section-navbar d-none d-lg-flex">
                <div className="container p-0">
                    <ul className=" nav-menu">
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="account">
                                <span className='icon-wrap'>
                                    <FaRegUser/>
                                </span>
                                {trans('lang.account')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="users">
                                <span className='icon-wrap'>
                                    <FaUsers/>
                                </span>
                                {trans('lang.users')}
                            </NavLink>

                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="settings">
                                <span className='icon-wrap'>
                                    <CiSettings/>
                                </span>
                                {trans('lang.settings')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="import">
                                <span className='icon-wrap'>
                                    <LuImport/>
                                </span>
                                {trans('lang.import')}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet/>
        </>
    )
}