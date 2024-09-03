import React, {useContext, useState} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {useTranslation} from "../../context/TranslateContext";
import {UserContext} from "../../context/UserContext";


export default function DownloadLogin() {
    // const {trans} = useTranslation()
    // const {userData} = useContext(UserContext)
    const [files, setFiles] = useState('')



    return (
        <div className="p-5">
            <h1>Login to download files</h1>
            <form className="p-5">
                <label htmlFor="login">Login</label><br/>
                <input id="login" name="login" type="text"/>

                <br/>
                <p className="m-5"></p>

                <label htmlFor="password">Password</label><br/>
                <input id="password" name="password" type="password"/>
            </form>
        </div>
    )
}