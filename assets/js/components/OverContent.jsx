import React from 'react';
import {useContext} from "react";
import {useTranslation} from '../context/TranslateContext';
import {UserContext} from "../context/UserContext";


import {LuUser2} from "react-icons/lu";
import {IoPaperPlaneOutline, IoSettingsOutline} from "react-icons/io5";
import {CiMoneyCheck1} from "react-icons/ci";
import {FaRegFaceSmile} from "react-icons/fa6";
import {IoMdClose} from "react-icons/io";
import {MdLogout} from "react-icons/md";
import { AiOutlineInbox } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { IoCloudDownloadOutline } from "react-icons/io5";


import {Link} from "react-router-dom";


const OverContent = ({onClick}) => {
    const {changeLocale, trans} = useTranslation();
    const {isAuthenticated, userData, logout} = useContext(UserContext);

    onClick()

    const handleClickOutside = (event) => {
        if (event.target.classList.contains('over-content')) {
            onClick();
        }
    };

    return (
        <div className="over-content" id="over-content" onClick={handleClickOutside}>

            <div className="nav-menu dialog-backdrop" id="nav-menu">
                <div className="d-flex-between">
                    <div className="d-flex-start">
                        {userData?.accountImage ?
                            <div className="avatar-wrap" id='avatar-wrap' onClick={onClick}>
                                <img className="account-image" src={`/uploads/photos/${userData?.accountImage}`}
                                     alt="alt"/>
                            </div>
                            :
                            <div className="default-account-image" id='avatar-wrap' onClick={onClick}>
                                RR
                            </div>
                        }
                        <div className="d-column-start">
                            <span className="f-14 color-muted">{userData?.firstName} {userData?.lastName}</span>
                        </div>
                    </div>
                    <div onClick={onClick}>
                        <ul className="ul-basic-style m-0">
                            <li>
                                <IoMdClose className="m-0"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="ul-basic-style">
                    {/*<li onClick={onClick}>*/}
                    {/*    <Link to="/">*/}
                    {/*        <span className="d-flex-center">*/}
                    {/*            <FaRegFaceSmile/>*/}
                    {/*        </span>*/}
                    {/*        <span className="">*/}
                    {/*            {trans('lang.setStatus')}*/}
                    {/*        </span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<hr className="m-2"/>*/}
                    <li onClick={onClick}>
                        <Link to="/account">
                            <span className="d-flex-center">
                                <LuUser2/>
                            </span>
                            <span>{trans('lang.yourProfile')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings">
                            <span className="d-flex-center">
                                <IoSettingsOutline/>
                            </span>
                            <span>{trans('lang.accountSettings')}</span>
                        </Link>
                    </li>
                    <li onClick={onClick}>
                        <a>
                            <span className="d-flex-center">
                                <CiMoneyCheck1/>
                            </span>
                            <span className="">{trans('lang.currentPlan')}</span>
                        </a>
                    </li>
                    <hr className="m-2"/>
                    <li>
                        <Link to="/download">
                            <span className="d-flex-center">
                                <IoCloudDownloadOutline/>
                            </span>
                            <span>{trans('lang.download')}</span>
                        </Link>
                    </li>
                    <hr className="m-2"/>
                    <li>
                        <Link to="/send">
                            <span className="d-flex-center">
                                <IoPaperPlaneOutline/>
                            </span>
                            <span>{trans('lang.send')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/send/contacts">
                            <span className="d-flex-center">
                                <RiContactsBook3Line/>
                            </span>
                            <span>{trans('lang.contacts')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/send/template">
                            <span className="d-flex-center">
                                <MdOutlineMailOutline/>
                            </span>
                            <span>{trans('lang.emailTemplate')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/send/history">
                            <span className="d-flex-center">
                                <AiOutlineInbox/>
                            </span>
                            <span>{trans('lang.history')}</span>
                        </Link>
                    </li>
                    <hr className="m-2"/>
                    <li>
                        <a href="#" onClick={logout}>
                            <span className="d-flex-center">
                                <MdLogout/>
                            </span>
                            <span>{trans('lang.signOut')}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
        ;
};

export default OverContent;