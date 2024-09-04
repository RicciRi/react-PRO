import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {useTranslation} from "../../context/TranslateContext";
import {UserContext} from "../../context/UserContext";
import {useLoading} from "../../context/LoadingContext";


export default function Download() {
    const {showLoading, hideLoading} = useLoading();

    const [uploadId, setUploadId] = useState('');
    const [password, setPassword] = useState('');

    const [uploadData, setUploadData] = useState(null)
    const [files, setFiles] = useState([]);


    const handleLogin = async (event) => {
        event.preventDefault(); // Предотвращает перезагрузку страницы

        const formData = {
            uploadId: uploadId, // Убедитесь, что это поле соответствует полю на сервере
            password: password,
        };

        try {
            showLoading(true); // Показываем индикатор загрузки

            const response = await fetch('/download/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData), // Убедитесь, что данные отправляются правильно
            });

            if (response.ok) {
                const data = await response.json();
                setUploadData(data.upload_data);
                setFiles(data.files)
            } else {
                const errorData = await response.json();
                console.log(errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideLoading(false);
        }
    };

    const handleDownload = async (fileId) => {
        try {
            const response = await fetch(`/download/file/${fileId}`, {
                method: 'GET',
            });

            if (response.ok) {
                const disposition = response.headers.get('Content-Disposition');
                let fileName = 'default-filename.txt'; // Default name in case extraction fails

                if (disposition && disposition.indexOf('attachment') !== -1) {
                    const matches = /filename[^;=\n]*=\s*(?:(['"])(.*?)\1|([^;\n]*))/.exec(disposition);
                    fileName = matches && (matches[2] || matches[3]) ? matches[2] || matches[3] : fileName;
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName; // Используем оригинальное имя файла
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                console.error('File download failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="container p-5">
            <div className="">
                {uploadData ? (
                        <>
                            <div className="row">
                                <div className="col-12 col-md-6 ml-mr-auto d-flex-center">
                                    <img src="/images/logo.png" className="logo" alt="Logo"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-4 ml-mr-auto upload-data">
                                    {/*<p>ID: {uploadData.id}</p>*/}
                                    {/*<p>Time: {uploadData.time}</p>*/}
                                    <h2 className="text-center">{uploadData.title}</h2>
                                    <p className="text-center">{uploadData.message}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 ml-mr-auto files">
                                    {/*<h2>Files:</h2>*/}
                                    <ul>
                                        {files.map(file => (
                                            <li key={file.id} className="m-4">
                                                <strong>{file.originalFileName}</strong>
                                                <button
                                                    className="button button-block"
                                                    onClick={() => handleDownload(file.id)}
                                                >
                                                    Download
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) :
                    <>
                        <h1>Login to download files</h1>
                        <form className="p-5" onSubmit={handleLogin}>
                            <label htmlFor="uploadId">Upload ID</label><br/>
                            <input
                                id="uploadId"
                                name="uploadId"
                                type="text"
                                value={uploadId}
                                onChange={(e) => setUploadId(e.target.value)}
                                required
                            />
                            <br/>
                            <p className="m-5"></p>
                            <label htmlFor="password">Password</label><br/>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <br/>
                            <button className="button button-green m-5" type="submit">Loginnn</button>
                        </form>
                    </>
                }
            </div>
        </div>
    );
}
