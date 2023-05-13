import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';

const SignInForm = ({ login, setLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const HashEmailSHA = CryptoJS.SHA256(email);
        alert(`SHA256 Email Encryption: ${HashEmailSHA}`);
    };

    return (
        <div>
            <h2 className="text-center mb-2 fw-bold">Sign in with email</h2>
            <h5 className="text-center mb-4">If you are new to IDP, <span className="signInSwitch" onClick={() => setLogin(!login)}>create your profile.</span></h5>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={"mb-2"}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default SignInForm;

SignInForm.propTypes = {
    login:PropTypes.bool,
    setLogin:PropTypes.func
  };
  
