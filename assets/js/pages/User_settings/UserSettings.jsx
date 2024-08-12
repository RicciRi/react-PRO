import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {useTranslation} from '../../context/TranslateContext';
import {UserContext} from '../../context/UserContext';



export default function UserSettings() {

    const {trans} = useTranslation();
    const {userData, checkAuth} = useContext(UserContext);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
    });

    useEffect(() => {
        if (userData) {
            setFormData({
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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (e.size > 1024 * 1024) {
            alert('Размер файла не должен превышать 1MB.');
            return;
        }

        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        setMessage('');
        setError('');

        const formPayload = new FormData();
        formPayload.append('firstName', formData.firstName);
        formPayload.append('lastName', formData.lastName);
        if (file) {
            formPayload.append('AccountImage', file);
        }

        try {
            const response = await fetch('/api/user/update', {
                method: 'POST',
                body: formPayload,
            });

            if (response.ok) {
                const data = await response
                setMessage(trans('lang.dataUpdated'));
                checkAuth()
            } else {
                const errorData = await response.json();
                setError(errorData.error || trans('lang.updateFailed'));
            }
        } catch (e) {
            console.error('An error occurred while updating user info:', e);
            setError(trans('lang.unexpectedError'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <div className="inpur-wrap mt-3">
                <label htmlFor="firstName">{trans('lang.name')}</label>

                <input
                    id="firstName"
                    className="form-control"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="inpur-wrap mt-3">
                <label htmlFor="lastName">{trans('lang.surname')}</label>

                <input
                    id="lastName"
                    className="form-control"
                    type="text"
                    value={formData.lastName}
                    name="lastName"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-wrap mt-3 ">
                <label htmlFor="AccountImage">{trans('lang.accountImage')}</label>

                <input
                    id="AccountImage"
                    className="form-control"

                    type="file"
                    accept=".jpg,.jpeg,.png"
                    name="AccountImage"
                    onChange={handleFileChange}
                />
            </div>

            <div className="d-flex-center mt-3">
                <button type="submit" className="button button-block button-green">
                    {trans('lang.save')}
                </button>
            </div>

        </form>
    );
};

