import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../context/TranslateContext';

export default function NotFound() {
    const { trans } = useTranslation();

    return (
        <div className="container p-5">
            <h1>{trans('lang.pageNotFound')}</h1>
            <Link to="/" className="link-button">
                {trans('lang.returnHome')}
            </Link>
        </div>
    );
}
