import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from '../../context/TranslateContext';
import { UserContext } from "../../context/UserContext";
import { useLoading } from "../../context/LoadingContext";
import {Outlet} from "react-router-dom";
import {Home_User} from "./Home_User";
import {Home_New} from "./Home_New";

const Home = () => {
    const { trans } = useTranslation();
    const [isUser, setIsUser] = useState(false);
    const { userData } = useContext(UserContext);
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        showLoading(true);

        if (userData || userData === false) {
            hideLoading(false);
        }

        return () => hideLoading(false);
    }, [userData, showLoading, hideLoading]);


    if (userData) {
        return (
            <div className="homepage-container container-fluid p-5">
                <Home_User/>
            </div>
        );
    }

    if (userData === false) {
        return (
            <div className="homepage-container container-fluid p-5">
                <Home_New/>
            </div>
        );
    }

    return null;
};

export default Home;