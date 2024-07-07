import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../context/TranslateContext';

const Register_Confirm_Email = () => {
    const { trans } = useTranslation();
    const navigate = useNavigate();
    const [confirmationCode, setConfirmationCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/confirm-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ confirmationCode }),
            });

            if (response.ok) {
                setMessage(trans('lang.emailConfirmed'));
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.error || trans('lang.confirmationFailed'));
            }
        } catch (err) {
            setError(trans('lang.unexpectedError'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="authentication-container mb-5">

            <img className="logo ml-mr-auto mt-4 mb-3" src="/icons/logo.svg" alt="Logo"/>

            <h1 className=' mb-3'>{trans('lang.confirmEmail')}</h1>

            <div className="auth-form-body p-4">

                <form onSubmit={handleConfirm}>
                    <div className="inpur-wrap">
                        <label>{trans('lang.enterConfirmationCode')}</label>
                        <input
                            type="text"
                            value={confirmationCode}
                            onChange={(e) =>
                                setConfirmationCode(e.target.value)
                            }
                        />
                    </div>
                    <button
                        className="button button-green button-block"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {trans('lang.confirm')}
                    </button>

                    <h2>
                        {trans('lang.doNotReceiveCode')}
                        <Link to="/register/confirm">Try again!</Link>
                    </h2>
                </form>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="">{message}</p>}
            </div>
        </div>
    );
};

export default Register_Confirm_Email;
