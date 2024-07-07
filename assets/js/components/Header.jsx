import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from '../context/TranslateContext';
import {UserContext} from '../context/UserContext';


import {IoPaperPlaneOutline} from "react-icons/io5";
import {AiOutlineInbox} from "react-icons/ai";
import {MdOutlineMailOutline} from "react-icons/md";
import {RiContactsBook3Line} from "react-icons/ri";


const Header = ({onClick}) => {
    const {trans} = useTranslation();
    const {isAuthenticated, userData, logout} = useContext(UserContext);

    if (isAuthenticated === null) {
        return (
            <header>
                <nav>
                    <div className="nav-container"></div>
                </nav>
            </header>)
    }

    return (
        <header>
            <div className="navbar-container">
                <div className="nav-container">
                    {/*{#    LOGO BY DEFAULT HERE #}*/}
                    <a className="navbar-brand" href="/">
                        <h1>RR</h1>
                    </a>
                    {!isAuthenticated ? (<>
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
                        {userData?.accountImage ?
                            <div className="avatar-wrap" id='avatar-wrap' onClick={onClick}>
                                <img className="account-image" src={`/uploads/photos/${userData?.accountImage}`}
                                     alt="alt"/>
                            </div>
                            :
                            <div className="default-account-image" id='avatar-wrap' onClick={onClick}>
                                RR
                            </div>
                        }
                    </>)}
                </div>
            </div>
            {isAuthenticated ?
                <div className="navigation-menu">
                    <ul className="ul-basic-style nav-bg d-flex">
                        <li>
                            <Link to="send">
                            <span className="d-flex-center">
                                <IoPaperPlaneOutline/>
                            </span>
                                <span>
                                {trans('lang.sendMessage')}
                            </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="contacts">
                            <span className="d-flex-center">
                                <RiContactsBook3Line/>
                            </span>
                                <span>
                                {trans('lang.contacts')}
                            </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="template">
                            <span className="d-flex-center">
                                <MdOutlineMailOutline/>
                            </span>
                                <span>
                                {trans('lang.emailTemplate')}
                            </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="history">
                            <span className="d-flex-center">
                                <AiOutlineInbox/>
                            </span>
                                <span>
                                {trans('lang.history')}
                            </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                : <></>
            }
        </header>);
};

export default Header;
