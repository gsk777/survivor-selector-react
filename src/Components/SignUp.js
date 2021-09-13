import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router';

import { UserContext } from '../App';
import '../Styles/SignUp.css';

const SignUp = () => {
    // UserName
    // email
    // password
    // re-enter password

    const context = useContext(UserContext);
    
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reEnter, setReEnter] = useState("");

    const handleSubmit = () => {
        console.log('signup from submitted');
    }

    if (context.token) {
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
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="enterUserName">
                            <Form.Label className="signup-label" column xs={3} md={2}>Username</Form.Label>
                            <Col xs={9} md={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username..."
                                    onChange={(e) => setUserName(e.target.value)}
                                ></Form.Control>
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row} controlId="enterEmail">
                            <Form.Label className="signup-label" column xs={3} md={2}>Email</Form.Label>
                            <Col xs={9} md={10}>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email..."
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row} controlId="enterPassword">
                            <Form.Label className="signup-label" column xs={3} md={2}>Password</Form.Label>
                            <Col xs={9} md={10}>
                                <Form.Control
                                    type="password"
                                    placeholder="Password..."
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row} controlId="reEnterPassword">
                            <Form.Label className="signup-label" column xs={3} md={2}>Re-Enter</Form.Label>
                            <Col xs={9} md={10}>
                                <Form.Control
                                    type="password"
                                    placeholder="Re-Enter password..."
                                    onChange={(e) => setReEnter(e.target.value)}
                                ></Form.Control>
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