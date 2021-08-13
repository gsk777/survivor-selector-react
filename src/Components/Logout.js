import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router';

import { UserContext } from '../App';
import '../Styles/Logout.css';

const Logout = () => {
    const context = useContext(UserContext);

    const [submitted, setSubmitted] = useState(false);

    const submitYes = () => {
        localStorage.removeItem('token');
        context.setToken(undefined);
        setSubmitted(true);
    }

    const submitNo = () => {
        setSubmitted(true);
    }

    if (submitted) {
        return <Redirect to='/' />
    }

    return (
        <Container>
            <br/>
            <br/>
            <Row className="justify-content-center">
                <Col xs={8} className="text-center">
                    <h4 className="logout-heading">Are you sure you want to logout?</h4>
                </Col>
            </Row>
            <br/>
            <Row className="justify-content-center">
                <Col xs={3} md={2} xl={1} className="text-center px-2">
                        <Button
                            variant="secondary"
                            className="px-4"
                            onClick={submitYes}
                        >Yes</Button>
                </Col>
                <Col xs={3} md={2} xl={1} className="text-center px-2">
                        <Button
                            variant="secondary"
                            className="px-4"
                            onClick={submitNo}
                        >No</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Logout;