import React, {useState, useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useTranslation} from '../../context/TranslateContext';
import {UserContext} from '../../context/UserContext';

export default function Login() {
    const {trans} = useTranslation();
    const {login} = useContext(UserContext);
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
            const response = await login({email, password});

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
        <div className="authentication-container mb-5">

            <img className="logo ml-mr-auto mt-4 mb-3" src="/icons/logo.svg" alt="Logo"/>

            <h1 className=' mb-3'>{trans('lang.signInTo')}</h1>
            <div className="auth-form-body p-4">
                <form onSubmit={handleLogin}>
                    {location.state?.message && (
                        <h3 className="error-message">{location.state.message}</h3>
                    )}
                    {error && <p className='error-message'>{error}</p>}
                    <div className="input-wrap">
                        <label htmlFor="email">{trans('lang.email')}</label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="input-wrap">
                        <div className="d-flex-between">
                            <label htmlFor="password">
                                {trans('lang.password')}
                            </label>
                            <a href="#" className="f-12">
                                {trans('lang.forgotPassword')}
                            </a>

                        </div>

                        <input
                            id="password"
                            type={hightPassword ? 'password' : 'text'}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="password" // Добавляем autocomplete
                        />
                    </div>
                    <button
                        className="button button-block button-green"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {trans('lang.signIn')}
                    </button>
                </form>
                <h2>
                    {trans("lang.accountNotExist")}
                    <a href="/register" className="link-hover">
                        {trans("lang.createAccount")}
                    </a>
                </h2>
            </div>
        </div>
    );
}
