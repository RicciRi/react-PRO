import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import OverContent from './OverContent';


export default function Layout() {

    const openMenu = () => {
        document.getElementById('over-content')?.classList.add('d-flex')
        document.getElementById('nav-menu')?.classList.add('showMenu')
    };

    const closeMenu = () => {
        document.getElementById('over-content')?.classList.remove('d-flex')
        document.getElementById('nav-menu')?.classList.remove('showMenu')
    };


    return (
        <>
            <div className="site-wrapper">
                <Header onClick={openMenu} />
                <main>
                    <Outlet />
                </main>
                <Footer />
                <OverContent onClick={closeMenu}  />
            </div>
        </>
    );
}
