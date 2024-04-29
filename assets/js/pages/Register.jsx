import React, { useState } from 'react';
import { useTranslation } from '../context/TranslateContext';

const Register = () => {
    const { trans } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [registerFinish, setRegisterFinish] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Для отображения спиннера

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(trans('lang.passwordMismatch'));
            return;
        }

        const requestBody = {
            email,
            password,
            firstName,
            lastName,
        };

        setIsLoading(true); // Начинаем загрузку

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            setIsLoading(false); // Заканчиваем загрузку

            if (!response.ok) {
                const errorData = await response.json(); // Извлечь сообщение об ошибке
                throw new Error(
                    errorData.error || trans('lang.registrationFailed')
                );
            }

            const result = await response.json();
            setRegisterFinish(true);
            setError(''); // Сброс ошибки
        } catch (err) {
            setIsLoading(false); // Заканчиваем загрузку
            setError(err.message); // Показать сообщение об ошибке
        }
    };

    return (
        <div className="p-5">
            <div className="form-section">
                <h1>{trans('lang.register')}</h1>
                {isLoading && (
                    <div className="spinner">{trans('lang.loading')}</div>
                )}
                {registerFinish ? (
                    <h3>{trans('lang.accountCreated')}</h3>
                ) : (
                    <form onSubmit={handleRegistration}>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autocomplete="email" // Атрибут autocomplete
                            />
                            <label htmlFor="email">{trans('lang.email')}</label>{' '}
                        </div>
                        <div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autocomplete="new-password" // Атрибут autocomplete
                            />
                            <label htmlFor="password">
                                {trans('lang.password')}
                            </label>
                        </div>
                        <div>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                                autocomplete="new-password" // Атрибут autocomplete
                            />
                            <label htmlFor="confirmPassword">
                                {trans('lang.confirmPassword')}
                            </label>
                        </div>
                        <div>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <label htmlFor="firstName">
                                {trans('lang.name')}
                            </label>
                        </div>
                        <div>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            <label htmlFor="lastName">
                                {trans('lang.surname')}
                            </label>
                        </div>
                        <button className="button" type="submit">
                            {trans('lang.register')}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Register;
