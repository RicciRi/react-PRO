import React from 'react';
import {useTranslation} from '../context/TranslateContext';

const Footer = () => {
    const {changeLocale, trans} = useTranslation();
    return (
        <footer>
            <div className="container">
                {/*<ul>*/}
                {/*    <li>*/}
                {/*        <span>{trans('lang.socialLinks')}</span>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="https://www.instagram.com/richard.rudenko/">*/}
                {/*            Instagram*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="https://www.instagram.com/richard.rudenko/">*/}
                {/*            Youtube*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*</ul>*/}

                <ul className="d-flex-center">
                    <li className="m-1">Ricci</li>
                    <li className="m-1">@2024</li>
                </ul>

                <ul className="translate-list">
                    <li>
                        <button
                            className="button-no-style blue-hover"
                            onClick={() => changeLocale('en')}
                        >
                            {trans('lang.english')}
                        </button>
                    </li>
                    <li>
                        <button
                            className="button-no-style blue-hover"
                            onClick={() => changeLocale('ua')}
                        >
                            {trans('lang.ukrainian')}
                        </button>
                    </li>
                    <li>
                        <button
                            className="button-no-style blue-hover"
                            onClick={() => changeLocale('de')}
                        >
                            {trans('lang.germany')}
                        </button>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
