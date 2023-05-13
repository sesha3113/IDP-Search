import React from "react";
import {Container, Row, Col, Button } from 'react-bootstrap';
import Image from "next/image";
import img from '../../assets/images/starratingn.jpg';
import PropTypes from 'prop-types';
import styles from './StudentSays.module.scss';


const StudentSays = ({studentSayingsData}) => {

  return (
    <div className={`${styles.studentSaysMain} layout-margin`}>
      <Container>
        <Row className={styles.studentSaysRow}>
          <Col className={styles.studentSaysCol} sm={12} md={3}>
            <h3 className={styles.reviews}>42,160+ reviews</h3>
            <Image src={img} alt='img' height={50} width={200} />
            <strong className={styles.reviewScore}>4.8/5</strong>
            <div className="mt-4">
              <Button size='md' variant='warning' className={`${styles.reviewsBtn} ${styles.reviewsBtnHover}`}>
                Get free councling
              </Button>
            </div>
          </Col>
          {studentSayingsData.map((dta,index) => (
            <Col key={index} className={`${styles.studentSaysCol} px-3`} sm={12} md={3}>
              <h3 className={styles.studentsSaysHead}>{dta.heading}</h3>
              <p className={styles.studentSaysContent}>{dta.body}</p>
              <p className={styles.studentSaysFooter}>{dta.footer}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default StudentSays;

StudentSays.propTypes ={
  studentSayingsData: PropTypes.arrayOf(Object),
}

