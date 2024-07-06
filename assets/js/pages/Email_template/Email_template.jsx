import React, {useContext} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {useTranslation} from "../../context/TranslateContext";
import {UserContext} from "../../context/UserContext";


export default function EmailTemplate() {
    const {trans} = useTranslation()
    const {userData} = useContext(UserContext)

    return (
        <div className="p-5">
            <h1>Email Template Page</h1>
        </div>
    )
}