import React, {useContext, useState} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {useTranslation} from "../../context/TranslateContext";
import {UserContext} from "../../context/UserContext";
import {useForm} from 'react-hook-form';
import axios from 'axios';

export default function Upload(data) {
    const {trans} = useTranslation()
    const {userData} = useContext(UserContext)

    const {register, handleSubmit, reset} = useForm();
    const [files, setFiles] = useState([]);

    const onFileChange = (e) => {
        setFiles([...files, ...e.target.files]);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('subject', data.subject);
        formData.append('body', data.body);
        formData.append('email', data.email);

        files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });

        try {
            await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Email sent successfully!');
            reset();
            setFiles([]);
        } catch (error) {
            console.log('Error sending email:', error);
            alert('Failed to send email');
        }
    };

    return (
        <div className="upload-container">
            <div className="container">
                <div className="row">
                    <div className="col-1">
                        <button className="w-100">send file</button>
                        <button className="w-100">send file</button>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4">
                        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
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
                                <label htmlFor="email">{trans('lang.recipient')}</label>
                                <input id="email" name="email" type="email" {...register('email')}
                                       placeholder={trans("lang.email")} required/>
                            </div>
                            <div>
                                <label htmlFor="title">{trans("lang.title")}</label>
                                <input id="title" name="title" type="title" {...register('subject')} required/>
                            </div>
                            <div>
                                <label htmlFor="message">{trans('lang.message')}</label>
                                <textarea id="message" name="message" {...register('body')} required></textarea>
                            </div>
                            <button type="submit" className="button button-block button-green mt-3 mb-3">{trans('lang.send')}</button>
                        </form>
                    </div>
                    <div className="col-2">
                        <div>
                            <h4>{trans('lang.fileToUpload')}</h4>
                            <ul>
                                {files.map((file, index) => (
                                    <li key={index} className="p-2 mb-2">
                                        <div className="file-name">{file.name}</div>
                                        <div className="file-size">{file.size}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}