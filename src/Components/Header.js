import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../Styles/Header.css';

const Header = () => {
    return (
            <Navbar expand="sm" variant="dark">
                <Navbar.Brand>
                    <h1 className="font-weight-bold text-light text-wrap title">SURVIVOR SELECTOR</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-menu"/>
                <Navbar.Collapse id="navbar-menu">
                    <Nav className="ml-auto">
                        <Link to='/' className="header-link">Home</Link>
                        <Link to='/mywatchlist' className="header-link">My Watchlist</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    );
}

export default Header;