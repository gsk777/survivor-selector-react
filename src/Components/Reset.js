import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import '../Styles/Reset.css';

const Reset = () => {

    const { token } = useParams();

    const [validToken, setValidToken] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmFeedback, setConfirmFeedback] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            console.log('verifying reset token');
            try {
                const response = await axios.get("http://localhost:4000/verify_reset", {
                    headers: {
                        "Token": token
                    }
                });
                console.log(response);
                setValidToken(true);
                setUser(response.data[1]);
            } catch (error) {
                console.log('reset token not valid')
            }
        }
        verifyToken();
    }, [token]);

    const handleSubmit = async (event) => {
        console.log('updating password...');
        const form = event.currentTarget;
        try {
            event.preventDefault();
            const response = await axios.post("http://localhost:4000/update_password", {
                "user": user,
                "password": form.enterConfirm.value
            })
            console.log(response);
            setResetSuccess(true);
        } catch (error) {
            console.log(error)
        }
    }

    const confirmOnChange = (e) => {
        if (e.target.value !== password) {
            e.target.setCustomValidity("Passwords don't match");
            setConfirmFeedback("Password doesn't match");
        } else {
            e.target.setCustomValidity("");
            setConfirmFeedback("");
        }
    }

    if (resetSuccess) {
        return <Redirect to='/login' />
    }

    if (validToken) {
        return (
            <Container>
                <br/>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={7}>
                        <h2 className="reset-heading">RESET PASSWORD</h2>
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={7}>
                        <Form noValidate validated={true} onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="enterPassword">
                                <Form.Label className="reset-label" column xs={4} md={3}>New Password</Form.Label>
                                <Col xs={8} md={9}>
                                    <Form.Control
                                        required
                                        type="password"
                                        minLength="6"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">Min 6 characters</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <br/>
                            <Form.Group as={Row} controlId="enterConfirm">
                                <Form.Label className="reset-label" column xs={4} md={3}>Confirm</Form.Label>
                                <Col xs={8} md={9}>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={(e) => confirmOnChange(e)}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">{confirmFeedback}</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <br/>
                            <Button type="submit" variant="light">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <Container>
                <br/>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={7}>
                        <h2 className="reset-heading">RESET PASSWORD</h2>
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={7}>
                        <h6 className="reset-error">Reset link expired. Return to the&nbsp;
                            <Link to='/login'>LOGIN</Link>
                            &nbsp;page to try again.
                        </h6>
                    </Col>
                </Row>
            </Container>
        )
    }
    
}

export default Reset;