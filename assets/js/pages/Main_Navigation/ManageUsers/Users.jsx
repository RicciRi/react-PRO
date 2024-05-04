import React from "react";
import {NavLink, Outlet} from "react-router-dom";

export default function Users() {
    return(
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <ul>
                        <li>
                            <NavLink
                                className={({ isActive }) => (isActive ? 'active' : '')}
                                to=".">
                                block number 1
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="block/2">
                                block number 2
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="block/3">
                                block number 3
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="block/4">
                                block number 4
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="col-8">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}