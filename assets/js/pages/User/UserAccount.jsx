import React, {useContext} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {useTranslation} from "../../context/TranslateContext";
import {UserContext} from "../../context/UserContext";
import {FaMoon, FaRegTrashAlt} from "react-icons/fa";
import {IoMdSunny} from "react-icons/io";

export default function UserAccount() {
    const {trans} = useTranslation()
    const {userData} = useContext(UserContext)

    function handleThemeToggle() {
        console.log('change!')
    }

    return (
        <div className="container account-container">
            <div className="row">

                <div className="col-6 d-flex-end">
                    <div className="d-column-center">

                        <div className="account-image-big-wrap d-block">
                            {userData?.accountImage
                                ? (<img
                                    className="account-image-big"
                                    src={`/uploads/photos/${userData?.accountImage}`}
                                    alt="Account Image"/>)
                                : (<div className="account-image-big-wrap ">RR</div>)}
                            {/*<Link to="settings" className="link">*/}
                            {/*    <FaRegTrashAlt />*/}
                            {/*</Link>*/}
                        </div>

                        <h1 className="mt-3 f-20 fw-400 d-flex-center">
                            <Link className="blue-hover" to="settings">
                                {trans('lang.editProfile')}
                            </Link>
                        </h1>

                        <Outlet/>

                    </div>
                </div>

                <div className="col-6 d-flex justify-content-start align-items-start">
                    <ul>
                        <li className="mb-3 mt-5">
                            {userData && userData.firstName} {userData && userData.lastName}
                        </li>
                        <li className="mb-5">
                            {userData && userData.email}
                        </li>
                        <li className="mb-5">
                            <div className="color-site-toggle">
                                <label className="switch">
                                    <input type="checkbox" id="theme-toggle" onChange={handleThemeToggle}/>
                                    <span className="slider"></span>
                                    <span className="moon">
                                        <FaMoon/>
                                    </span>
                                    <span className="sun">
                                        <IoMdSunny/>
                                    </span>
                                </label>
                            </div>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    )
}