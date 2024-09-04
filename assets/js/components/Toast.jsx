import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Подключаем Bootstrap JS
import {IoCloseSharp} from "react-icons/io5";

const Toast = ({ show, message, onClose, type }) => {
    const toastRef = useRef(null);

    useEffect(() => {
        if (show && toastRef.current) {
            const toast = new window.bootstrap.Toast(toastRef.current);
            toast.show();
        }
    }, [show]);

    const toastClass = type === 'success' ? 'toast-success' : 'toast-error';

    return (
        <div
            ref={toastRef}
            className={`toast ${show ? 'toast-show' : 'toast-hide'} ${toastClass}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="toast-header">
                <strong className="me-auto">{type === 'success' ? 'Success' : 'Error'}</strong>
                <button
                    type="button"
                    className="button-no-style d-flex-center f-20"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <IoCloseSharp/>

                </button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    );
};

export default Toast;
