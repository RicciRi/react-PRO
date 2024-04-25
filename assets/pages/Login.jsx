import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../components/TranslateContext';

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { trans } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="p-5">
            <div className="form-section">
                <form onSubmit={handleSubmit}>
                    <h1>{trans('lang.signIn')}</h1>
                    <div>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label>{trans('lang.name')}</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label>{trans('lang.surname')}</label>
                    </div>
                    <button className="button" type="submit">
                        {trans('lang.login')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
