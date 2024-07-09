import React, {useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useTranslation} from '../context/TranslateContext';
import {UserContext} from '../context/UserContext';
import NavigationMenu from './NavigationMenu';

const Header = ({onClick}) => {
    const {trans} = useTranslation();
    const {isAuthenticated, userData} = useContext(UserContext);
    const location = useLocation();

    const renderNavigationMenu = () => {
        const pathsWithNavMenu = ['/send', '/contacts', '/template', '/history'];
        return pathsWithNavMenu.includes(location.pathname);
    };

    const renderSendLink = () => {
        const pathsWithNavMenu = ['/home', '/account', '/settings'];
        return pathsWithNavMenu.includes(location.pathname);
    };

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
                    <a href="/">
                        <img className='logo' src="/icons/logo.svg" alt="logo"/>
                    </a>
                    {!isAuthenticated ? (
                        <>
                            <div className="d-flex">
                                <Link to="/login" className="button button-navbar">
                                    {trans('lang.login')}
                                </Link>
                                <Link to="/register" className="button button-navbar">
                                    {trans('lang.registration')}
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="d-flex">
                                {isAuthenticated && renderSendLink() &&
                                    <Link to="/send" className="button button-navbar">
                                        {trans('lang.send')}
                                    </Link>
                                }
                            {userData?.accountImage ? (

                                    <div className="avatar-wrap" id='avatar-wrap' onClick={onClick}>
                                        <img className="account-image" src={`/uploads/photos/${userData?.accountImage}`}
                                             alt="alt"/>
                                    </div>



                            ) : (
                                <div className="default-account-image" id='avatar-wrap' onClick={onClick}>
                                    RR
                                </div>
                            )}
                            </div>
                        </>
                    )}
                </div>

            </div>
            {isAuthenticated && renderNavigationMenu() && <NavigationMenu/>}
        </header>
    );
};

export default Header;
