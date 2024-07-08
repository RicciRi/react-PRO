
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";


function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {register, handleSubmit, reset} = useForm();

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
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
            setLoading(false);
        }
    };

    const handleAddContact = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('company', data.company);

        try {
            setLoading(true)
            await axios.post('/api/contacts/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            reset();
        } catch (error) {
            setError('error')
        } finally {
            fetchContacts()
        }
    };

    const handleDeleteContact = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/contacts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response;
            console.log(data)
        } catch (error) {
            setError('error')
        } finally {
            fetchContacts()
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Manage Contacts</h2>
            <div>
                <form onSubmit={handleSubmit(handleAddContact)}>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register('name')}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email')}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        {...register('company')}

                    />
                    <button type="submit">Add Contact</button>
                </form>
            </div>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                        {contact.name} ({contact.email}) - {contact.company}
                        <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Contacts;
