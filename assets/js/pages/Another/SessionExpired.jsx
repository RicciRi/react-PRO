import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'; // Используем useNavigate вместо useHistory

const SessionExpired = ({ isOpen, onClose, style }) => {
    const navigate = useNavigate(); // Инициализируем useNavigate

    const handleLoginRedirect = () => {
        navigate('/login'); // Используем navigate для перехода на страницу логина
        onClose(); // Закрываем модальное окно
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={style}>
            <h2>Сессия истекла</h2>
            <p>Ваша сессия истекла. Пожалуйста, войдите снова.</p>
            <button onClick={handleLoginRedirect}>Войти</button>
        </Modal>
    );
};

export default SessionExpired;

