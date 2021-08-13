import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Redirect } from 'react-router';

import { UserContext } from '../App';
import '../Styles/Login.css';

const Login = () => {
    const context = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post('http://localhost:4000/users', {"email": email, "password": password});
            context.setToken(response);
            return <Redirect to='/' />
        } catch (error) {
            console.log(error);
            setError("Email/password combination not valid. Try Again.");
        }
    };

    if (context.token) {
        return <Redirect to='/' />
    }

    return (
        <Container>
            <br/>
            <Row className="justify-content-center">
                <Col xs={8}>
                    <h2 className="login-heading">LOGIN</h2>
                </Col>
            </Row>
            <br/>
            <Row className="justify-content-center">
                <Col xs={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="enterEmail">
                            <Form.Label className="login-label" column xs={2}>Email</Form.Label>
                            <Col xs={10}>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email..."
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row} controlId="enterPassword">
                            <Form.Label className="login-label" column sm={2}>Password</Form.Label>
                            <Col xs={10}>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                                <h6 className="text-danger text-center mt-2">{error}</h6>
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
        </Container>
    )
}

export default Login;