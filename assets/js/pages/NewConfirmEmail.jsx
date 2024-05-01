import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslateContext';

const NewConfirmEmail = () => {
    const { trans } = useTranslation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirm = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send-confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                navigate('/register/confirm');
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
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleConfirm}>
                    <div>
                        <label>{trans('lang.enterEmail')}</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        className="button"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {trans('lang.sendCode')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewConfirmEmail;
