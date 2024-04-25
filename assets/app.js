import './styles/app.css';
import './styles/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './components/TranslateContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    return (
        <TranslationProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </TranslationProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
