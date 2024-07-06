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
        <div className="p-5">
            <div className="form-section">
                <h1>{trans('lang.confirmEmail')}</h1>
                <form onSubmit={handleConfirm}>
                    <div>
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
                        className="button"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {trans('lang.confirm')}
                    </button>

                    <p>
                        Don't recieve a code?
                        <Link to="/register/confirm/new">Try again!</Link>
                    </p>
                </form>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="">{message}</p>}
            </div>
        </div>
    );
};

export default Register_Confirm_Email;
