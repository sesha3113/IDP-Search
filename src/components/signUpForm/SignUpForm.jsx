import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from 'prop-types';

const SignUpForm = ({login,setLogin}) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    
      const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };

    return (
        <div>
            <h2 className="text-center mb-2 fw-bold">Sign in with email</h2>
            <h5 className="text-center mb-4">Already have an IDP profile? <span className="signInSwitch" onClick={()=>setLogin(!login)}>sign in.</span></h5>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName">
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={"mb-2"}
                    />
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={"mb-2"}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={"mb-2"}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={"mb-2"}
                    />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={"mb-2"}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm

SignUpForm.propTypes = {
    login:PropTypes.bool,
    setLogin:PropTypes.func
  };