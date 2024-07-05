import React, {useState, useContext, useEffect} from 'react';
import {useTranslation} from '../../../context/TranslateContext';
import {UserContext} from '../../../context/UserContext';

const UserSettings = () => {
    const {trans} = useTranslation();
    const {userData} = useContext(UserContext);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

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
            setError(trans('lang.unexpectedError'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="settings-container p-5">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>{trans('lang.settings')}</h2>
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}

                    <div className="inpur-wrap">
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="firstName">{trans('lang.name')}</label>
                    </div>

                    <div className="inpur-wrap">
                        <input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            name="lastName"
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="lastName">
                            {trans('lang.surname')}
                        </label>
                    </div>
                    <button type="submit" className="button">
                        {trans('lang.save')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserSettings;
