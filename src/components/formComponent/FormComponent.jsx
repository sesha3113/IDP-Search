import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import img from "../../assets/images/enquiry.jpg";
import Form from "../formComponent/Form";
import PropTypes from 'prop-types'
import styles from './FormComponent.module.scss';

const FormComponent = (props) => {
  const { formComponentData } = props;
  return (
    <div className={styles.form}>
      {!props.courses && (
        <>
          <h2>{formComponentData[0].title}</h2>
          <p className="mb-5">{formComponentData[0].description}</p>
        </>
      )}
      <Row className={styles.formRow}>
        <Col md={6} sm={12} className={styles.formCol}>
          <div className={styles.imageWrapper}>
            <Image layout="fill" quality={100} width="100%" height="100%" src={img} alt="banner" />
          </div>
        </Col>
        <Col md={6} sm={12} className={`${styles.formCol1} px-3`}>
          <Form />
        </Col>
      </Row>
    </div>
  );
}

export default FormComponent;

FormComponent.propTypes ={
  courses: PropTypes.bool,
  formComponentData: PropTypes.arrayOf(Object)
}
