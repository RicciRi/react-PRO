import React, {useContext} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {useTranslation} from "../../../context/TranslateContext";
import {UserContext} from "../../../context/UserContext";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

export default function UserAccount() {
    const {trans} = useTranslation()
    const {userData} = useContext(UserContext)
    console.log(userData)
    function handleThemeToggle() {
        console.log('change!')
    }

    return (
        <div className="account-settings-container">
            <div className="container info-account p-4">
                <div className="row">
                    <div className="col-12 col-lg-6 d-flex justify-content-end">
                        <div className="wrap-account-image">
                            <div className="account-image"></div>
                            <a href="#">
                                {trans('lang.edit')}
                            </a>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="info-account-section">
                            <ul>
                                <li>
                                    <h3>{trans('lang.name')}</h3>
                                    {userData && userData.firstName } {userData && userData.lastName }
                                </li>
                                <li>
                                    <h3>
                                        {trans('lang.email')}
                                    </h3>
                                    {userData && userData.email }
                                </li>
                            </ul>
                            <ul className="ul-border">
                                <li>
                                    <h3>{trans('lang.lang')}
                                    </h3>
                                    <div className="d-flex justify-content-lg-around">
                                        <a className="nav-link m-2" href="#">DE</a>
                                        <a className="nav-link m-2" href="#">EN</a>
                                        <a className="nav-link m-2" href="#">UA</a>
                                    </div>
                                </li>
                                <li>
                                    <h3>Design</h3>
                                    <div className="color-site-toggle">

                                        <label className="switch">
                                            <input type="checkbox" id="theme-toggle" onChange={handleThemeToggle}/>
                                            <span className="slider"></span>
                                            <span className="moon">
                                                <FaMoon />
                                            </span>
                                            <span className="sun">
                                                <IoMdSunny />
                                            </span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}