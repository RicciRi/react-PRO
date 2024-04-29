import React from 'react';
import { useTranslation } from '../context/TranslateContext';

const Footer = () => {
    const { changeLocale, trans } = useTranslation();
    return (
        <footer>
            <div className="container">
                <ul>
                    <li>
                        <span>{trans('lang.socialLinks')}</span>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/richard.rudenko/">
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/richard.rudenko/">
                            Youtube
                        </a>
                    </li>
                </ul>

                <ul>
                    <li>
                        <span>{trans('lang.chooseLang')}</span>
                        <ul className="translate-list">
                            <li>
                                <button
                                    className="button"
                                    onClick={() => changeLocale('en')}
                                >
                                    {trans('lang.english')}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="button"
                                    onClick={() => changeLocale('ua')}
                                >
                                    {trans('lang.ukrainian')}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="button"
                                    onClick={() => changeLocale('de')}
                                >
                                    {trans('lang.germany')}
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>Build by</span>
                    </li>
                    <li>Ricci</li>
                    <li>@2024</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
