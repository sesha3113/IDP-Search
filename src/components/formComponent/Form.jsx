import React from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import styles from './FormComponent.module.scss';
const FormInput = () => {
  return (
    <>
      <Form aria-labelledby="form-label">
        <Row>
          <Form.Group as={Col} >
            <Form.Label for="first-name">First Name</Form.Label>
            <Form.Control
              id="first-name"
              type="text"
              placeholder="First Name"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label for="last-name">Last Name</Form.Label>
            <Form.Control id="last-name" type="text" placeholder="Last Name" />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label for="email">Email Address</Form.Label>
          <Form.Control id="email" type="email" placeholder="Enter Email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label for="mobile-number">Mobile Number</Form.Label>
          <Form.Control
            id="mobile-number"
            type="number"
            placeholder="Mobile Number"
          />
        </Form.Group>

        <Row>
          <Form.Group
            as={Col}
            className={styles.paddingTop15}>
            <Form.Label for="preferred-destination">
              Your preferred study destination
            </Form.Label>
            <Form.Select id="preferred-destination" defaultValue="Choose...">
              <option>Please Select</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            as={Col}
            className={styles.paddingTop15}>
            <Form.Label for="when-study">When do you plan to study?</Form.Label>
            <Form.Select id="when-study" defaultValue="Choose...">
              <option>Please Select</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="">
          <Form.Group
            as={Col}
            className={styles.paddingTop15}>
            <Form.Label for="near-idp">Nearest IDP Office</Form.Label>
            <Form.Select id="near-idp" defaultValue="Choose...">
              <option>Please Select</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className={styles.removeGutterx}>
          <Form.Group
            as={Col}
            className={styles.paddingTop15}          >
            <Form.Label for="mode">Preferred mode of counselling</Form.Label>
            <Form.Select id="mode" defaultValue="Choose...">
              <option>Please Select</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className={styles.removeGutterx}>
          <Form.Group
            as={Col}
            className={styles.paddingTop15}>
            <Form.Label for="fund">
              How would you fund your education?
            </Form.Label>
            <Form.Select id="fund" defaultValue="Choose...">
              <option>Please Select</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className={styles.removeGutterx}>
          <Form.Group
            as={Col}
            className={styles.paddingTop15}>
            <Form.Label for="level ">Preferred study level</Form.Label>
            <Form.Select id="level" defaultValue="Choose...">
              <option>Please Select</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <br />

        <p className="h6">
          IDP will not share your details with others without your permission:
        </p>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            id="terms"
            type="checkbox"
            label="I agree to IDP Terms and privacy policy
              "
          />
        </Form.Group>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            id="contact"
            type="checkbox"
            label="Please contact me by phone, email or SMS to assist with my enquiry
              "
          />
        </Form.Group>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            id="update"
            type="checkbox"
            label="I would like to receive updates and offers from IDP
              "
          />
        </Form.Group>
        <div>
          <Button className="idp-primary-btn" type="submit">
            Help me study abroad
          </Button>
        </div>
      </Form>
    </>
  );
};

export default FormInput;
