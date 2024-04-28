import React from 'react';
import { useTranslation } from '../context/TranslateContext';

const Footer = () => {
    const { changeLocale } = useTranslation();
    return (
        <footer>
            <div className="container">
                <ul>
                    <li>
                        <span>Social links:</span>
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
                        <span>Choose language:</span>
                    </li>
                    <li>
                        <button
                            className="button"
                            onClick={() => changeLocale('en')}
                        >
                            English
                        </button>
                    </li>
                    <li>
                        <button
                            className="button"
                            onClick={() => changeLocale('ua')}
                        >
                            Українська
                        </button>
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
