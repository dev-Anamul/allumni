import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import classes from './Layout.module.scss';

function Layout({ children }) {
    return (
        <div className={classes.layout}>
            <header className={classes.layout_header}>
                <Header />
            </header>
            <main className={classes.layout_main}>{children}</main>
            <footer className={classes.layout_footer}>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
