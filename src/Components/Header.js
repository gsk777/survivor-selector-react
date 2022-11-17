import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { UserContext } from '../App';
import '../Styles/Header.css';

// used by App.js as constant header/navigation
const Header = (props) => {
    const context = useContext(UserContext);

    // verify if local user token is still valid
    useEffect(() => {
        const fetchData = async () => {
            console.log('verifying token');
            try {
                const response = await axios.get("http://localhost:4000/verify_token", {
                    headers: {
                        "Authorization": context.token.data
                    }
                });
                console.log(response);
            } catch (error) {
                console.log('token not verified');
                console.log(error);
                localStorage.removeItem('token');
                context.setToken(undefined);
            }
        }
        fetchData();
    }, [context]);

    return (
            <Navbar expand="md" variant="dark">
                <Navbar.Brand className="text-center">
                    <Link to='/' className="title font-weight-bold text-wrap">SURVIVOR SELECTOR</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-menu"/>
                <Navbar.Collapse id="navbar-menu">
                    <Nav className="ml-auto">
                        {(props.token === undefined)
                            ? <Link to='/login' className="header-link">Login</Link>
                            :   <>
                                    <Link to='/mywatchlist' className="header-link">My Watchlist</Link>
                                    <Link to='/myrankings' className="header-link">My Rankings</Link>
                                    <Link to='/logout' className="header-link">Logout</Link>
                                </>
                        } 
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    );
}

export default Header;