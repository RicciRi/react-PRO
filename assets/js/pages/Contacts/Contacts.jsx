import React, { useState, useEffect } from 'react';

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        // Функция для чтения токена из куки
        const getTokenFromCookie = () => {
            const cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith('auth_token'))
                .split('=')[1];
            return cookieValue;
        };

        const fetchedToken = getTokenFromCookie(); // Получаем токен из куки

        console.log(fetchedToken)
        setToken(fetchedToken); // Устанавливаем токен в состояние
        fetchContacts(); // Вызываем функцию для загрузки контактов
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/contacts', {
                headers: {
                    Authorization: `Bearer ${token}`, // Передача токена в заголовке запроса
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch contacts');
            }
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setError('Error fetching contacts. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const addContact = async () => {
        try {
            const newContact = { name, email, company };
            const response = await fetch('/api/add/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Передача токена в заголовке запроса
                },
                body: JSON.stringify(newContact),
            });
            if (!response.ok) {
                throw new Error('Failed to add contact');
            }
            setName('');
            setEmail('');
            setCompany('');
            fetchContacts();
        } catch (error) {
            console.error('Error adding contact:', error);
            setError('Error adding contact. Please try again.');
        }
    };

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`, // Передача токена в заголовке запроса
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete contact');
            }
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
            setError('Error deleting contact. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Manage Contacts</h2>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <button onClick={addContact}>Add Contact</button>
            </div>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                        {contact.name} ({contact.email}) - {contact.company}
                        <button onClick={() => deleteContact(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Contacts;
