import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {useTranslation} from "../../context/TranslateContext";
import {UserContext} from "../../context/UserContext";
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {BsTrash3} from "react-icons/bs";
import Toast from "../../components/Toast";
import {useLoading} from "../../context/LoadingContext";

export default function Upload() {
    const {trans} = useTranslation();
    const {showLoading, hideLoading} = useLoading();
    const {userData} = useContext(UserContext);
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState('success');

    const {register, handleSubmit, reset} = useForm();
    const [files, setFiles] = useState([]);

    const [contacts, setContacts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        // Загружаем контакты при первой загрузке компонента
        const fetchContacts = async () => {
            try {
                showLoading(true);
                const response = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setContacts(data);
            } catch (error) {
                setError('error');
            } finally {
                hideLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const onFileChange = (e) => {
        setFiles([...files, ...e.target.files]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('subject', data.subject);
        formData.append('body', data.body);

        selectedContacts.forEach((contact, index) => {
            formData.append(`contacts[${index}]`, contact.email);
        });

        files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });

        try {
            showLoading(true);
            await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            reset();
            setFiles([]);
            setSelectedContacts([]);
            setToastType('success');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        } catch (error) {
            setToastType('error');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        } finally {
            hideLoading(false);
        }
    };

    const searchContacts = (query) => {
        setSearchQuery(query);
        if (query.length === 0) {
            setSearchResults([]);
            return;
        }

        const results = contacts.filter(contact =>
            contact.name.toLowerCase().includes(query.toLowerCase()) ||
            contact.email.toLowerCase().includes(query.toLowerCase()) ||
            contact.company.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleUserSelect = (contact) => {
        if (selectedContacts.length >= 10) {
            alert('You can select up to 10 contacts only.');
            return;
        }

        const alreadySelected = selectedContacts.find(c => c.id === contact.id);
        if (!alreadySelected) {
            setSelectedContacts([...selectedContacts, contact]);
        }

        setSearchResults([]);
        setSearchQuery('');
    };

    const removeSelectedContact = (contactId) => {
        setSelectedContacts(selectedContacts.filter(contact => contact.id !== contactId));
    };

    const handleBlur = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (searchResults.length > 0) {
            const bestMatch = searchResults[0];
            handleUserSelect(bestMatch);
        } else if (emailPattern.test(searchQuery)) {
            setSelectedContacts([...selectedContacts, { email: searchQuery, name: searchQuery }]);
            setSearchQuery('');
        } else if (searchQuery) {
            alert("Такого пользователя нет и это не email. Пожалуйста, исправьте.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
        }
    };

    return (
        <div className="upload-container">
            <div className="container">
                <Toast
                    show={showToast}
                    message={toastType === 'success' ? 'Your files have been sent successfully!' : 'Something went wrong!'}
                    onClose={() => setShowToast(false)}
                    type={toastType}
                />
                <div className="row">
                    <div className="col-2">
                        <div>
                            <ul>
                                {files.map((file, index) => (
                                    <li key={index} className="p-2 mb-2">
                                        <div className="file-name d-flex-between">
                                            {file.name}
                                            <button className="button" onClick={() => removeFile(index)}>
                                                <BsTrash3/>
                                            </button>
                                        </div>
                                        <div className="file-size">{file.size}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-4">
                        <form className="p-4" onSubmit={handleSubmit(onSubmit)} autoComplete={false}>
                            <div className="d-flex-center">
                                <label htmlFor="uploadFile">
                                    <div className="button button-block button-gradient-peach mt-4 mb-4">
                                        + {trans('lang.uploadFile')}
                                    </div>
                                </label>
                                <input id="uploadFile" name="uploadFile" type="file" className="d-none"
                                       onChange={onFileChange} multiple/>
                            </div>
                            <div>
                                <label htmlFor="custom-email">
                                    {trans('lang.email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="custom-email"
                                    value={searchQuery}
                                    placeholder="Search by name, email, or company"
                                    onChange={(e) => searchContacts(e.target.value)}
                                    onBlur={handleBlur}
                                    onKeyDown={handleKeyDown}
                                    autoComplete="shipping address-level4 webauthn"
                                />
                                here
                                {searchResults.length > 0 && (
                                    <ul>
                                        {searchResults.map((contact) => (
                                            <li key={contact.id} onClick={() => handleUserSelect(contact)}>
                                                {contact.name} - {contact.email} ({contact.company})
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                {selectedContacts.length > 0 && (
                                    <div>
                                        <h4>Selected Contacts:</h4>
                                        <ul>
                                            {selectedContacts.map(contact => (
                                                <li key={contact.id}>
                                                    {contact.name} - {contact.email}
                                                    <button onClick={() => removeSelectedContact(contact.id)}>Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="title">{trans("lang.title")}</label>
                                <input id="title" name="title" type="text" {...register('subject')}
                                       placeholder={trans("lang.title")} required/>
                            </div>
                            <div>
                                <label htmlFor="message">{trans('lang.message')}</label>
                                <textarea id="message" name="message" {...register('body')}
                                          placeholder={trans("lang.message")} required></textarea>
                            </div>
                            <button
                                type="submit"
                                className="button button-block button-green mt-3 mb-3"
                                disabled={files.length === 0 ? true : false}>
                                {trans('lang.send')}
                            </button>
                        </form>
                    </div>
                    <div className="custom-border-left col-6">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}
