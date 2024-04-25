import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../components/TranslateContext';

const Register = () => {
    const { trans } = useTranslation();

    return (
        <div className="p-5">
            <div className="form-section">
                <form>
                    <h1>{trans('lang.register')}</h1>
                    <div>
                        <input type="text" />
                        <label>{trans('lang.name')}</label>
                    </div>
                    <div>
                        <input type="text" />
                        <label>{trans('lang.surname')}</label>
                    </div>

                    <div>
                        <input type="text" />
                        <label>{trans('lang.email')}</label>
                    </div>

                    <div>
                        <input type="text" />
                        <label>{trans('lang.password')}</label>
                    </div>

                    <button className="button" type="submit">
                        {trans('lang.login')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
