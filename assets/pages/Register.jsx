import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../components/TranslateContext';

const Register = () => {
    const { trans } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const requestBody = {
            email,
            password,
            firstName,
            lastName,
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Ошибка при регистрации');
            }

            const result = await response.json();
            alert('Регистрация прошла успешно');
            setError(''); // Сброс ошибки
        } catch (err) {
            setError(err.message); // Показать сообщение об ошибке
        }
    };

    return (
        <div className="p-5">
            <div className="form-section">
                <form onSubmit={handleRegistration}>
                    <h1>{trans('lang.register')}</h1>
                    {error && <div style={{ color: 'red' }}>{error}</div>}{' '}
                    {/* Отображение ошибки */}
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>{trans('lang.email')}</label>
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
                    <div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label>Confirm Password:</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <label>{trans('lang.name')}</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <label>{trans('lang.surname')}</label>
                    </div>
                    <button className="button" type="submit">
                        {trans('lang.register')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
