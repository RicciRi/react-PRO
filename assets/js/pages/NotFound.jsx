import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslateContext';

export default function NotFound() {
    const { trans } = useTranslation();

    return (
        <div className="not-found-container">
            <h1>{trans('lang.logout')}</h1>
            <Link to="/" className="link-button">
                {trans('lang.returnHome')}
            </Link>
        </div>
    );
}
