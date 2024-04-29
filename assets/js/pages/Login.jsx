import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslateContext';
import { UserContext } from '../context/UserContext';

export default function Login() {
    const { trans } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ email, password });

            if (response && response.ok) {
                setError(''); // Сброс ошибки, если логин успешен
            } else if (response) {
                setError(response.error); // Установка ошибки, чтобы отобразить пользователю
            } else {
                setError('An unknown error occurred'); // Если `response` undefined
            }
        } catch (e) {
            console.error('Login error:', e);
            setError('An unexpected error occurred'); // Обработка неожиданной ошибки
        }
    };

    return (
        <div className="p-5">
            <div className="form-section">
                <form onSubmit={handleLogin}>
                    <h1>{trans('lang.signIn')}</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div>
                        <input
                            id="email" // Добавляем уникальный id
                            type="email"
                            name="email" // Добавляем уникальный name
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autocomplete="email" // Добавляем autocomplete
                        />

                        <label>{trans('lang.email')}</label>
                    </div>
                    <div>
                        <input
                            id="password" // Уникальный id
                            type="password"
                            name="password" // Уникальный name
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autocomplete="current-password" // Добавляем autocomplete
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
}
