import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslateContext';
import { UserContext } from '../context/UserContext';

const UserSettings = () => {
    const { trans } = useTranslation();
    const { userData } = useContext(UserContext);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch('/api/user/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage(trans('lang.dataUpdated'));
            } else {
                const errorData = await response.json();
                setError(errorData.error || trans('lang.updateFailed'));
            }
        } catch (e) {
            window.location.reload();
            console.error('An error occurred while updating user info:', e);
            setError(lang('lang.unexpectedError'));
        }
    };

    return (
        <div class="settings-container p-5">
            <form onSubmit={handleSubmit}>
                <div class="form-section">
                    <h2>{trans('lang.settings')}</h2>
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}

                    <div class="inpur-wrap">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label>{trans('lang.email')}</label>
                    </div>
                    <div class="inpur-wrap">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <label>{trans('lang.name')}</label>
                    </div>

                    <div class="inpur-wrap">
                        <input
                            type="text"
                            value={formData.lastName}
                            name="lastName"
                            onChange={handleChange}
                            required
                        />
                        <label>{trans('lang.surname')}</label>
                    </div>
                    <button type="submit" class="button">
                        {trans('lang.save')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserSettings;
