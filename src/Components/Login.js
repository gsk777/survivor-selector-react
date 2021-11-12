import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Redirect } from 'react-router';

import ResetPasswordModal from './ResetPasswordModal';

import { UserContext } from '../App';
import '../Styles/Login.css';

// Login page route used by Main.js
const Login = () => {
    const context = useContext(UserContext);

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [signup, toggleSignup] = useState(false);
    const [resetModal, toggleResetModal] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        try {
            event.preventDefault();
            const response = await axios.post('http://localhost:4000/login', {"email": email, "password": password});
            context.setToken(response);
            return <Redirect to='/' />
        } catch (error) {
            console.log(error);
            form.enterPassword.setCustomValidity("Email/password combination not valid. Try Again.")
            setError("Email/password combination not valid. Try Again.");
        }
        setValidated(true);
    };

    const onSignUpClick = () => {
        toggleSignup(true);
    }

    if (signup === true) {
        return <Redirect to='/signup' />
    }

    const onForgotPasswordClick = () => {
        toggleResetModal(true);
    }

    const handleCloseModal = () => {
        toggleResetModal(false);
    }

    if (context.token) {
        return <Redirect to='/' />
    }

    return (
        <Container>
            <br/>
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={7}>
                    <h2 className="login-heading">LOGIN</h2>
                </Col>
            </Row>
            <br/>
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={7}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="enterEmail">
                            <Form.Label className="login-label" column xs={3} md={2}>Email</Form.Label>
                            <Col xs={9} md={10}>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Enter email..."
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row} controlId="enterPassword">
                            <Form.Label className="login-label" column xs={3} md={2}>Password</Form.Label>
                            <Col xs={9} md={10}>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Button
                            type="submit"
                            variant="light"
                            >Submit</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center pt-3">
                <Col xs={12} md={8}>
                    <Row>
                        <Col xs={6} className='d-flex justify-content-end'>
                            <Button variant="info" size="sm" onClick={onSignUpClick}>New User</Button>
                        </Col>
                        <Col xs={6}>
                            <Button variant="info" size="sm" onClick={onForgotPasswordClick}>Forgot Password</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <ResetPasswordModal
                show={resetModal}
                close={handleCloseModal}
            ></ResetPasswordModal>
        </Container>
    )
}

export default Login;