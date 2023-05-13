import Image from "next/image";
import React from "react";
import {Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types'
import styles from "./StudentStories.module.scss";


const StudentStories = ({studentStoryData}) => {

  return (
    <div className={`${styles.studentStories} layout-margin px-0 `}>
      <Container>
        <Row className='storiesRow p-0'>
          <Col lg={12}>
             <h2 className="mb-5 mt-4">Our students share their stories...</h2>
          </Col>
          {studentStoryData.map((dta,index) => (
            <Col key={index} sm={12} md={4} className={`${styles.storiesCol} position-relative`}>
              <Image
                src={dta.studentImage.url}
                alt={dta.alt}
                width="360px"
                height={270}
              />
            </Col>
          ))}
          <Col lg={12}>
             <p className={styles.storiesFooter}>See more videos..</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StudentStories;

StudentStories.propTypes ={
  studentStoryData: PropTypes.arrayOf(Object),
}