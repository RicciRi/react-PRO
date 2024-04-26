import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from './TranslateContext';

const Header = () => {
    const { trans } = useTranslation();
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('token') !== null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header>
            <div className="container">
                <div className="container-fluid">
                    <div className="navbar-container">
                        <Link to="/">
                            <h1 className="logo">{trans('lang.logo')}</h1>
                        </Link>

                        {isLoggedIn && (
                            <ul className="navbar-link-wrap">
                                <li>
                                    <Link to="/" className="navbar-link">
                                        {trans('lang.home')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="navbar-link">
                                        {trans('lang.cars')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="navbar-link">
                                        {trans('lang.contacts')}
                                    </Link>
                                </li>
                            </ul>
                        )}

                        <ul className="navbar-button-wrap">
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <button onClick={handleLogout}>
                                            {trans('lang.logout')}
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            to="/login"
                                            className="button navbar-button"
                                        >
                                            {trans('lang.login')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/register"
                                            className="button navbar-button"
                                        >
                                            {trans('lang.registration')}
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
