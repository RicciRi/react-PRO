import React, { useState } from 'react';
import { useTranslation } from '../context/TranslateContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { trans } = useTranslation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hightPassword, setHightPassword] = useState(true);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationSent, setConfirmationSent] = useState(false);

    function passwordToggle() {
        setHightPassword((prev) => !prev);
    }

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(trans('lang.passwordMismatch'));
            return;
        }

        setIsLoading(true);

        const requestBody = {
            email,
            password,
            firstName,
            lastName,
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.confirmEmail) {
                    setConfirmationSent(true);
                }
                throw new Error(
                    errorData.error || trans('lang.registrationFailed')
                );
            }

            // Теперь отправляем код подтверждения после успешной регистрации
            await fetch('/api/send-confirmation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            setError('');
            setConfirmationSent(true);
        } catch (err) {
            setIsLoading(false);
            setError(err.message || trans('lang.registrationFailed'));
        }

        setIsLoading(false);
    };

    return (
        <div className="p-5">
            <div className="form-section">
                <h1>{trans('lang.register')}</h1>
                {isLoading ? (
                    <div className="spinner">{trans('lang.loading')}</div>
                ) : confirmationSent ? (
                    <>
                        <h3>We sended confirmation code to your email!</h3>
                        <p>Please, follow link</p>
                        <Link to="/register/confirm">CONFIRM</Link>
                    </>
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
                                autoComplete="email"
                            />
                            <label htmlFor="email">{trans('lang.email')}</label>
                        </div>
                        <div>
                            <div className="password-input-wrap">
                                <input
                                    id="password"
                                    type={hightPassword ? 'password' : 'text'}
                                    name="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    autoComplete="new-password"
                                />
                                <span onClick={passwordToggle}>
                                    {hightPassword ? (
                                        <i class="fa-solid fa-eye-slash"></i>
                                    ) : (
                                        <i class="fa-solid fa-eye"></i>
                                    )}
                                </span>
                            </div>
                            <label htmlFor="password">
                                {trans('lang.password')}
                            </label>
                        </div>

                        <div>
                            <input
                                id="confirmPassword"
                                type={hightPassword ? 'password' : 'text'}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                                autoComplete="new-password"
                            />
                            <label htmlFor="confirmPassword">
                                {trans('lang.confirmPassword')}
                            </label>
                        </div>
                        <div>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
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
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            <label htmlFor="lastName">
                                {trans('lang.surname')}
                            </label>
                        </div>
                        <button
                            className="button"
                            type="submit"
                            disabled={isLoading}
                        >
                            {trans('lang.register')}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Register;
