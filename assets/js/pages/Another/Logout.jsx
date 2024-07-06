import React, { useContext } from 'react';
import { useTranslation } from '../../context/TranslateContext';
import { UserContext } from '../../context/UserContext';

export default function Logout() {
    const { trans } = useTranslation();
    const { logout } = useContext(UserContext);

    return (
        <>
            <h1>{trans('lang.logoutPrompt')}</h1>
            <button onClick={logout} className="button">
                {trans('lang.logout')}
            </button>
        </>
    );
}
