import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from '../../context/TranslateContext';
import {UserContext} from "../../context/UserContext";
import {useLoading} from "../../context/LoadingContext";

export const Home_User = () => {
    const {trans} = useTranslation();
    // const [isUser, setIsUser] = useState(false);
    // const {userData} = useContext(UserContext);
    // const {showLoading, hideLoading} = useLoading();

    // useEffect(() => {
    //     showLoading(true);
    //
    //     if (userData || userData === false) {
    //         hideLoading(false);
    //     }
    //
    //     return () => hideLoading(false);
    // }, [userData, showLoading, hideLoading]);
    //

    return (
        <div className="homepage-container container-fluid p-5">
            <div className="header-block">
                <h1 className="d-flex-center text-center fw-700">Secure File Transfer</h1>
            </div>
        </div>
    );

};
