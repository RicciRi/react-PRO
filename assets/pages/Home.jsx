import React, { useContext } from 'react';

import { useTranslation } from '../components/TranslateContext';
import { UserContext } from '../components/UserContext';

const Home = () => {
    const { trans } = useTranslation();
    const { userData } = useContext(UserContext);
    const userInfo = userData ? userData.userInfo : false;

    return (
        <div className="homepage-container container-fluid p-5">
            <div className="container">
                <div className="title-wrap">
                    <h1>{trans('lang.getDreamCar')}</h1>
                    <div className="title-container">
                        <div className="title-section">
                            <h2>100+</h2>
                            <p>{trans('lang.newModel')}</p>
                        </div>
                        <div className="title-section">
                            <h2>1M+</h2>
                            <p>{trans('lang.customers')}</p>{' '}
                        </div>
                    </div>
                </div>

                <div className="search-block">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={trans('lang.WhatLooking')}
                        aria-label="search"
                    />
                    <button type="button" className="input-button">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
