import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../context/TranslateContext';
import { UserContext } from '../../context/UserContext';

export default function Login() {
    const { trans } = useTranslation();
    const { login } = useContext(UserContext);
    const location = useLocation();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hightPassword, setHightPassword] = useState(true);

    const [error, setError] = useState('');
    const [confirmEmailLink, setConfirmEmailLink] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function passwordToggle() {
        setHightPassword((prev) => !prev);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await login({ email, password });

            if (response && response.ok) {
                setError(''); // Сброс ошибки, если логин успешен
            } else if (response) {
                setError(response.error); // Установка ошибки, чтобы отобразить пользователю
                if (response.confirmEmail) {
                    setConfirmEmailLink(true);
                }
            } else {
                setError(trans('lang.unknownError')); // Если `response` undefined
            }
        } catch (e) {
            console.error('Login error:', e);
            setError(trans('lang.unexpectedError')); // Обработка неожиданной ошибки
        } finally {
            setIsSubmitting(false);
        }
    };

    if (confirmEmailLink) {
        return (
            <div className="p-5">
                <div className="form-section">
                    <h1>You need to confirm your email first!</h1>
                    <p>Please, follow link</p>
                    <Link to="/register/confirm">CONFIRM</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-5">
            <div className="form-section">
                <form onSubmit={handleLogin}>
                    <h1>{trans('lang.signIn')}</h1>
                    {location.state?.message && (
                        <h3 className="error-message">{location.state.message}</h3>
                    )}
                    {error && <p className='error-message'>{error}</p>}
                    <div>
                        <input
                            id="email" // Добавляем уникальный id
                            type="email"
                            name="email" // Добавляем уникальный name
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email" // Добавляем autocomplete
                        />

                        <label htmlFor="email">{trans('lang.email')}</label>
                    </div>
                    <div>
                        <span className="password-input-wrap">
                            <input
                                id="password"
                                type={hightPassword ? 'password' : 'text'}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password" // Добавляем autocomplete
                            />
                            <span onClick={passwordToggle}>
                                {hightPassword ? (
                                    <i className="fa-solid fa-eye-slash"></i>
                                ) : (
                                    <i className="fa-solid fa-eye"></i>
                                )}
                            </span>
                        </span>
                        <label htmlFor="password">
                            {trans('lang.password')}
                        </label>
                    </div>
                    <button
                        className="button"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {trans('lang.login')}
                    </button>
                </form>
            </div>
        </div>
    );
}
