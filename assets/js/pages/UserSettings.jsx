import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslateContext';
import { UserContext } from '../context/UserContext';

const UserSettings = () => {
    const { trans } = useTranslation();
    const { userData } = useContext(UserContext);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (userData) {
            setEmail(userData.email); // Установка начального значения
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
        }
    }, [userData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const updateData = {
            email,
            firstName,
            lastName,
        };

        try {
            const response = await fetch('/api/user/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                setMessage('Yor data has been update');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Update failed');
            }
        } catch (e) {
            console.error('An error occurred while updating user info:', e);
            setError('An unexpected error occurred');
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>{trans('lang.email')}</label>
                    </div>
                    <div class="inpur-wrap">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <label>{trans('lang.name')}</label>
                    </div>

                    <div class="inpur-wrap">
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
