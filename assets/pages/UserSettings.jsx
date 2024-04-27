import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../components/TranslateContext';
import { UserContext } from '../components/UserContext';

const UserSettings = () => {
    const { trans } = useTranslation();
    const navigate = useNavigate();

    return (
        <div class="settings-container p-5">
            <div class="form-section">
                <h2>{trans('lang.settings')}</h2>
                <div class="inpur-wrap">
                    <input
                        type="email"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>{trans('lang.email')}</label>
                </div>
                <div class="inpur-wrap">
                    <input
                        type="text"
                        // value={firstName}
                        // onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <label>{trans('lang.name')}</label>
                </div>

                <div class="inpur-wrap">
                    <input
                        type="text"
                        // value={lastName}
                        // onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <label>{trans('lang.surname')}</label>
                </div>
                <button type="submit" class="button">
                    {trans('lang.save')}
                </button>
            </div>
        </div>
    );
};

export default UserSettings;
