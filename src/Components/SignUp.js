import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router';
import axios from 'axios';

import { UserContext } from '../App';
import '../Styles/SignUp.css';

const SignUp = () => {

    const context = useContext(UserContext);
    
    const [validated, setValidated] = useState(true);
    const [userName, setUserName] = useState("");
    const [userNameFeedback, setUserNameFeedback] = useState("4-15 characters (A-Z, a-z, 0-9)");
    const [email, setEmail] = useState("");
    const [emailFeedback, setEmailFeedback] = useState("");
    const [password, setPassword] = useState("");
    const [passwordFeedback, setPasswordFeedback] = useState("Min 6 characters");
    const [confirm, setConfirm] = useState("");
    const [confirmFeedback, setConfirmFeedback] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        //form.enterUserName.setCustomValidity("testing validation");
        // check username and email against DB to find duplicates
        try {
            event.preventDefault();
            const response = await axios.post('http://localhost:4000/newuser', {
                "username": form.enterUserName.value,
                "email": form.enterEmail.value,
                "password": form.enterPassword.value,
                "confirm": form.enterConfirm.value
            });
            if (!response.data[0]) {
                form.enterUserName.setCustomValidity("username unavailable");
                setUserNameFeedback("Username unavailable");
            } else {
                form.enterUserName.setCustomValidity("");
                setUserNameFeedback("4-15 characters (A-Z, a-z, 0-9)");
            }
            if (!response.data[1]) {
                form.enterEmail.setCustomValidity("email already used");
                setEmailFeedback("Email associated with existing account");
            } else {
                form.enterEmail.setCustomValidity("");
                setEmailFeedback("");
            }
            if (response.data[0] && response.data[1]) {
                setSignupSuccess(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const confirmOnChange = (e) => {
        setConfirm(e.target.value);
        if (e.target.value !== password) {
            e.target.setCustomValidity("Passwords don't match");
            setConfirmFeedback("Password doesn't match");
        } else {
            e.target.setCustomValidity("");
            setConfirmFeedback("");
        }
    }

    if ((context.token) || (signupSuccess)) {
        return <Redirect to='/' />
    }

    return (
        <Container>
            <br/>
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={7}>
                    <h2 className="login-heading">SIGNUP</h2>
                </Col>
            </Row>
            <br/>
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={7}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="enterUserName">
                            <Form.Label className="signup-label" column xs={3} md={2}>Username</Form.Label>
                            <Col xs={9} md={10}>
                                <Form.Control
                                    required
                                    type="text"
                                    pattern="[A-Za-z0-9]{4,15}"
                                    placeholder="Enter username..."
                                    onChange={(e) => setUserName(e.target.value)}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">{userNameFeedback}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row} controlId="enterEmail">
                            <Form.Label className="signup-label" column xs={3} md={2}>Email</Form.Label>
                            <Col xs={9} md={10}>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Enter email..."
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">{emailFeedback}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row} controlId="enterPassword">
                            <Form.Label className="signup-label" column xs={3} md={2}>Password</Form.Label>
                            <Col xs={9} md={10}>
                                <Form.Control
                                    required
                                    type="password"
                                    minLength="6"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">{passwordFeedback}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row} controlId="enterConfirm">
                            <Form.Label className="signup-label" column xs={3} md={2}>Confirm</Form.Label>
                            <Col xs={9} md={10}>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={(e) => confirmOnChange(e)}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">{confirmFeedback}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <br />
                        <Button
                            type="submit"
                            variant="light"
                            >Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp;