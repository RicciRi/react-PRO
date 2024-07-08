// api.jsx

import axios from 'axios';
import Cookies from 'js-cookie';

const authToken = Cookies.get('auth_token');

const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
});

