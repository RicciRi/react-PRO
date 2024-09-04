import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import {useTranslation} from '../../context/TranslateContext';
import {useLoading} from "../../context/LoadingContext";
import {IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline} from "react-icons/io";

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const {showLoading, hideLoading} = useLoading()
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false)

    const {trans} = useTranslation();
    const {register, handleSubmit, reset} = useForm();

    useEffect(() => {
        fetchContacts();
    }, []);

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
            setError('error')
        } finally {
            hideLoading(false);
        }
    };

    // function openAddContactForm() {
    //
    // }

    const handleAddContact = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('company', data.company);

        try {
            showLoading(true)
            await axios.post('/api/contacts/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            reset();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            fetchContacts()
            hideLoading(false)
        }
    };

    const handleDeleteContact = async (id) => {
        try {
            showLoading(true);
            const response = await fetch(`/api/contacts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response;
        } catch (error) {
            setError('error')
            console.log(error)
        } finally {
            hideLoading(false)
            fetchContacts()
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="container p-3">
            <div className="row">
                <div className="col-12">
                    <div className="contacts-container">
                        <div className='d-flex-between custom-border'>
                            <span className="fw-bold f-26">{trans('lang.contacts')}</span>
                            <button className="button-no-style fw-200 f-14 p-0 m-1 blue-hover"
                                    onClick={() => setShowAddForm(true)}>
                                {trans('lang.addContact')}
                            </button>
                        </div>
                        {showAddForm &&
                            <form className="add-contact-form d-flex-around" onSubmit={handleSubmit(handleAddContact)}>
                                <input
                                    type="text"
                                    className="m-2"
                                    placeholder="Name"
                                    {...register('name')}
                                    required
                                />
                                <input
                                    type="email"
                                    className="m-2"
                                    placeholder="Email"
                                    {...register('email')}
                                    required
                                />
                                <input
                                    type="text"
                                    className="m-2"
                                    placeholder="Company"
                                    {...register('company')}
                                    required

                                />
                                <button className="button-no-style icon f-26 p-0 blue-hover d-flex" type="submit">
                                    <IoIosCheckmarkCircleOutline/>
                                </button>
                                <button className="button-no-style icon f-26 p-0 blue-hover d-flex"
                                        onClick={() => setShowAddForm(false)}>
                                    <IoIosCloseCircleOutline/>
                                </button>

                            </form>
                        }
                        {
                            contacts.length > 0 ?
                                contacts.map((contact) => (
                                    <div className="contact-section mt-3" key={contact.id}>
                                        <div className="d-flex-between">
                                            <span className="fw-bold f-14">{contact.email}</span>
                                            <span>
                                            <button
                                                className="button-no-style"
                                                onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                                        </span>
                                        </div>
                                        <span className="color-muted f-12">{contact.name}</span> ·
                                        <span className="color-muted f-12 m-1">{contact.company}</span>
                                    </div>
                                ))
                                :
                                <>
                                    <h4 className="text-center m-3">{trans('lang.contactListEmpty')}</h4>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;
