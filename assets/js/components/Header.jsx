import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslateContext';
import { UserContext } from '../context/UserContext';

const Header = () => {
    const { trans } = useTranslation();
    const { isAuthenticated, logout } = useContext(UserContext);

    return (
        <header>
            <div className="container">
                <div className="container-fluid">
                    <div className="navbar-container">
                        <Link to="/">
                            <h1 className="logo">{trans('lang.logo')}</h1>
                        </Link>

                        {isAuthenticated && (
                            <ul className="navbar-link-wrap">
                                <li>
                                    <Link to="/" className="navbar-link">
                                        {trans('lang.home')}
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to="/" className="navbar-link">
                                        {trans('lang.cars')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="navbar-link">
                                        {trans('lang.contacts')}
                                    </Link>
                                </li> */}
                            </ul>
                        )}

                        <ul className="navbar-button-wrap">
                            {isAuthenticated ? (
                                <>
                                    <li>
                                        <button
                                            className="button navbar-button"
                                            onClick={logout}
                                        >
                                            {trans('lang.logout')}
                                        </button>
                                    </li>
                                    <li>
                                        <Link
                                            to="/user/settings"
                                            className="button navbar-button"
                                        >
                                            {trans('lang.account')}
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
