import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../components/TranslateContext';

const Login = () => {
    const { trans } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            const token = data.token;

            localStorage.setItem('token', token); // Сохраняем токен в localStorage
            setError(''); // Сброс ошибки
            // Пример перенаправления: window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-5">
            <div className="form-section">
                <form onSubmit={handleLogin}>
                    <h1>{trans('lang.email')}</h1>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>{trans('lang.name')}</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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

export default Login;
