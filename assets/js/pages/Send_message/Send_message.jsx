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
    const [highlightedIndex, setHighlightedIndex] = useState(0);

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

    useEffect(() => {
        if (searchResults.length > 0) {
            setHighlightedIndex(0); // Устанавливаем первый элемент активным сразу при появлении списка
        } else {
            setHighlightedIndex(-1); // Если нет результатов, сбрасываем выделение
        }
    }, [searchResults]);

    const onFileChange = (e) => {
        setFiles([...files, ...e.target.files]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {

        if(selectedContacts < 1) {
            setToastType('error');
            setShowToast(true);
            return
        }

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

    const searchContacts = async (query) => {
        setSearchQuery(query);
        if (query.length === 0) {
            setSearchResults([]);
            setHighlightedIndex(-1); // Сброс подсветки
            return;
        }

        try {
            const response = await axios.get(`/api/search-contacts?query=${query}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
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
        setHighlightedIndex(-1); // Сброс подсветки после выбора контакта
    };

    const removeSelectedContact = (contactId) => {
        setSelectedContacts(selectedContacts.filter(contact => contact.id !== contactId));
    };

    const handleBlur = () => {
        setTimeout(() => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (highlightedIndex !== -1 && searchResults[highlightedIndex]) {
                handleUserSelect(searchResults[highlightedIndex]);
            } else if (searchResults.length > 0) {
                handleUserSelect(searchResults[0]);
            } else if (emailPattern.test(searchQuery)) {
                setSelectedContacts([...selectedContacts, {email: searchQuery, name: searchQuery}]);
                setSearchQuery('');
            } else if (searchQuery) {
                alert("Такого пользователя нет и это не email. Пожалуйста, исправьте.");
            }
        }, 100); // Задержка 100 мс
    };
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && searchResults[highlightedIndex]) {
                handleUserSelect(searchResults[highlightedIndex]);
            } else {
                handleBlur();
            }
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
                            <ul className="file-list">
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
                        <form className="p-4" onSubmit={handleSubmit(onSubmit)} autoComplete="new-password">
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
                                {selectedContacts.length > 0 && (
                                    <div className="selected-contacts">
                                        <ul className="m-0 p-0">
                                            {selectedContacts.map(contact => (
                                                <li key={contact.id} className="d-flex-between">
                                                    {contact.email}
                                                    <button className="button-no-style blue-hover f-12 fw-500" onClick={() => removeSelectedContact(contact.id)}>
                                                        {trans("lang.remove")}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="position-relative">
                                <label htmlFor="email">
                                    {trans('lang.emailTo')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="new-password"
                                    value={searchQuery}
                                    className="search-input"
                                    placeholder="Search by email"
                                    onChange={(e) => searchContacts(e.target.value)}
                                    onBlur={handleBlur}
                                    onKeyDown={handleKeyDown}
                                    autoComplete="new-password"
                                />
                                <div className="position-relative">
                                    {searchResults.length > 0 && (
                                        <div className="search-contact-container">
                                            {searchResults.map((contact, index) => (
                                                <div
                                                    key={contact.id}
                                                    onMouseDown={() => handleUserSelect(contact)} // Изменение на onMouseDown
                                                    className={highlightedIndex === index ? 'highlighted' : ''}
                                                >
                                                    {contact.email}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="title">{trans("lang.title")}</label>
                                <input id="title" name="title" type="text" {...register('subject')}
                                       placeholder={trans("lang.title")} autoComplete="off" required/>
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
    )
}