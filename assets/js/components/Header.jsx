import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from '../context/TranslateContext';
import {UserContext} from '../context/UserContext';

import {FaRegUser, FaUsers} from "react-icons/fa";
import {CiSettings, CiLogout} from "react-icons/ci";
import {LuImport} from "react-icons/lu";




const Header = () => {
    const {trans} = useTranslation();
    const {isAuthenticated, userData, logout} = useContext(UserContext);

    if(isAuthenticated === null ) {
        return (
            <header>
                <nav className="navbar">
                    <div className="nav-container"></div>
                </nav>
            </header>
        )
    }
    return (
        <header>
            <nav className="navbar">
                <div className="nav-container">
                    {/*{#    LOGO BY DEFAULT HERE #}*/}
                    <a className="navbar-brand" href="/">
                        <h1>RR</h1>
                    </a>
                    {!isAuthenticated ? (<>
                        {/*{# LINKS #}*/}
                        {/*<div className="link-wrap d-none d-md-flex">*/}
                        {/*    <a href="#" className="nav-link">Features</a>*/}
                        {/*    <a href="#" className="nav-link">Price</a>*/}
                        {/*</div>*/}
                        {/*{# BUTTONS #}*/}
                        <div className="d-flex">
                            <Link
                                to="/login"
                                className="button navbar-button"
                            >
                                {trans('lang.login')}
                            </Link>

                            <Link
                                to="/register"
                                className="button navbar-button"
                            >
                                {trans('lang.registration')}
                            </Link>

                        </div>
                        {/*{#  DROPDOWN MENU for NOT authorized users #}*/}
                        <ul className="navbar-nav d-block d-md-none">
                            <li className="dropdown-link-mobile">
                                <a className="nav-link " role="button" data-bs-toggle="dropdown"
                                   aria-expanded="true">
                                    <img src="#" alt="menu"/>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-mobile dropdown-menu-container">
                                    <li className="">
                                        <a href="#">Features</a>
                                    </li>
                                    <li className="">
                                        <a href="#">Price</a>
                                    </li>
                                    <Link
                                        to="/register"
                                        className="btn button button-gradient btn-light">
                                        {trans('lang.registration')}
                                    </Link>
                                </ul>
                            </li>
                        </ul>
                    </>) : (<>
                        {/*{#  DROPDOWN MENU for authorized users #}*/}
                        <ul className="navbar-nav">
                            <li className="dropdown-link">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="true">
                                    {/*{# {% if license == 'pro' and app.user.account_image %} #}*/}
                                    {/*{# HERE WILL BE USER IMAGE #}*/}
                                    {/*{# {% else %} #}*/}
                                    {/*{# HERE WILL BE DEFAULT ACCOUNT IMAGE #}*/}
                                    <div className="container-account-image"></div>
                                    {/*{# {% endif %} #}*/}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-container">
                                    <li className="list-items">
                                        <div className="icon-wrap">
                                            <div className="container-account-image"></div>
                                        </div>
                                        {userData && <span
                                            className="drop-items no-hover">{userData.firstName} {userData.lastName}</span>}
                                    </li>
                                    <li className="list-items">
                                        <div className="icon-wrap">
                                            <FaRegUser/>
                                        </div>
                                        <Link className="drop-items" to={"nav/account"}>
                                            {trans('lang.myAccount')}
                                        </Link>
                                    </li>

                                    <li className="list-items">
                                        <div className="icon-wrap">
                                            <FaUsers/>
                                        </div>
                                        <Link className="drop-items" to={"nav/users"}>
                                            {trans('lang.users')}
                                        </Link>
                                    </li>

                                    <li className="list-items">
                                        <div className="icon-wrap">
                                            <CiSettings />
                                        </div>
                                        <Link className="drop-items" to={"nav/settings"}>
                                            {trans('lang.settings')}
                                        </Link>
                                    </li>

                                    {/*<li className="list-items">*/}
                                    {/*    <div className="icon-wrap">*/}
                                    {/*        <LuImport />*/}
                                    {/*    </div>*/}
                                    {/*    <Link className="drop-items" to={"nav/import"}>*/}
                                    {/*        {trans('lang.import')}*/}
                                    {/*    </Link>*/}
                                    {/*</li>*/}
                                    {/*{% endif %}*/}

                                    <li className="list-items">
                                        <div className="icon-wrap">
                                            <CiLogout />
                                        </div>
                                        <a href="#" className="drop-items" onClick={logout}>
                                            {trans('lang.logout')}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        {/*{% endif %}*/}
                    </>)}
                </div>
            </nav>
        </header>);
};

export default Header;
