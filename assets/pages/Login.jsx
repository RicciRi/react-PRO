import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../components/TranslateContext';
import { UserContext } from '../components/UserContext';

const Login = () => {
    const { trans } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data);
                setError(null);
                console.log(data);
                navigate('/');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-5">
            <div className="form-section">
                <form onSubmit={handleLogin}>
                    <h1>{trans('lang.signIn')}</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>{trans('lang.email')}</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>{trans('lang.password')}</label>
                    </div>
                    <button className="button" type="submit">
                        {trans('lang.login')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
