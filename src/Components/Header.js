import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../Styles/Header.css';

const Header = (props) => {
    return (
            <Navbar expand="sm" variant="dark">
                <Navbar.Brand>
                    <h1 className="title font-weight-bold text-light text-wrap">SURVIVOR SELECTOR</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-menu"/>
                <Navbar.Collapse id="navbar-menu">
                    <Nav className="ml-auto">
                        <Link to='/' className="header-link">Home</Link>
                        {(props.token === undefined)
                            ? <Link to='/login' className="header-link">Login</Link>
                            :   <>
                                    <Link to='/mywatchlist' className="header-link">My Watchlist</Link>
                                    <Link to='/logout' className="header-link">Logout</Link>
                                </>
                        } 
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    );
}

export default Header;