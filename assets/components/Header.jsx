import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from './TranslateContext';

const Header = ({ user }) => {
    const { trans } = useTranslation();

    return (
        <header>
            <div className="container">
                <div className="container-fluid">
                    <div className="navbar-container">
                        <Link to="/">
                            <h1 className="logo">{trans('lang.logo')}</h1>
                        </Link>

                        {user && (
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
                            {user ? (
                                <>
                                    <li>
                                        <a
                                            href="/logout"
                                            className="button navbar-button"
                                        >
                                            {trans('lang.logout')}
                                        </a>
                                    </li>
                                    <li>
                                        <Link
                                            to="/user-settings"
                                            className="navbar-link"
                                        >
                                            <i className="fa-regular fa-user"></i>
                                        </Link>
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
