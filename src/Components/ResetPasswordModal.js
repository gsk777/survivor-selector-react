import React, { useState }  from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

// used by Login.js to reset user password
const ResetPasswordModal = (props) => {

    const [resetEmail, setResetEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showButton, toggleShowButton] = useState("");
    const [validated, setValidated] = useState(true);

    const handleResetSubmit = async (event) => {
        const form = event.currentTarget;
        try {
            event.preventDefault();
            const response = await axios.post('http://localhost:4000/send_reset', { "email": resetEmail });
            setSuccessMessage('Success! Check email for reset instructions.');
            toggleShowButton('d-none');
            form.resetPassword.setCustomValidity('');
        } catch (error) {
            form.resetPassword.setCustomValidity('Email address not found');
            setEmailError('Email address not found');
        }
        setValidated(true);
    }

    const closeModal = () => {
        props.close();
        toggleShowButton('');
        setSuccessMessage('');
    }

    return (
        <Modal show={props.show} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleResetSubmit}>
                        <Form.Group controlId="resetPassword">
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email..."
                                onChange={(e) => setResetEmail(e.target.value)}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">{successMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" variant="dark" className={showButton}>Reset</Button>
                    </Form>
                </Modal.Body>
            </Modal>
    )
}

export default ResetPasswordModal;