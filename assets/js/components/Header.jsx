import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../context/TranslateContext';
import { UserContext } from '../context/UserContext';
import NavigationMenu from './NavigationMenu';

const Header = ({ onClick }) => {
    const { trans } = useTranslation();
    const { isAuthenticated, userData } = useContext(UserContext);
    const location = useLocation();

    const renderNavigationMenu = () => {
        const pathsWithNavMenu = ['/send', '/contacts', '/template', '/history'];
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
                    <a className="navbar-brand" href="/">
                        <h1>RR</h1>
                    </a>
                    {!isAuthenticated ? (
                        <>
                            <div className="d-flex">
                                <Link to="/login" className="button navbar-button">
                                    {trans('lang.login')}
                                </Link>
                                <Link to="/register" className="button navbar-button">
                                    {trans('lang.registration')}
                                </Link>
                            </div>
                            <ul className="navbar-nav d-block d-md-none">
                                <li className="dropdown-link-mobile">
                                    <a className="nav-link " role="button" data-bs-toggle="dropdown" aria-expanded="true">
                                        <img src="#" alt="menu" />
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-mobile dropdown-menu-container">
                                        <li className="">
                                            <a href="#">Features</a>
                                        </li>
                                        <li className="">
                                            <a href="#">Price</a>
                                        </li>
                                        <Link to="/register" className="btn button button-gradient btn-light">
                                            {trans('lang.registration')}
                                        </Link>
                                    </ul>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            {userData?.accountImage ? (
                                <div className="avatar-wrap" id='avatar-wrap' onClick={onClick}>
                                    <img className="account-image" src={`/uploads/photos/${userData?.accountImage}`} alt="alt" />
                                </div>
                            ) : (
                                <div className="default-account-image" id='avatar-wrap' onClick={onClick}>
                                    RR
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {isAuthenticated && renderNavigationMenu() && <NavigationMenu />}
        </header>
    );
};

export default Header;
