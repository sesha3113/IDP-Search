import Image from "next/image";
import React from "react";
import {Container, Carousel, Col, Row } from "react-bootstrap";
import img1 from "../../assets/images/studyinaustralia.jpg";
import img2 from "../../assets/images/studyincanada.jpg";
import img3 from "../../assets/images/studyinuk.jpg";
import img4 from "../../assets/images/studyinusa.jpg";
import styles from './StudentPlacesTemplate.module.scss';

const StudentPlacesTemplate = () => {
  const studentPlaceData = [
    {
      imageSrc: img1,
      title: 'Study in USA'
    },
    {
      imageSrc: img2,
      title: 'Study in UK'
    },
    {
      imageSrc: img3,
      title: 'Study in Canada'
    },
    {
      imageSrc: img4,
      title: 'Study in Ireland'
    }
  ]
  return (
    <div className={`${styles.studentPlaces} layout-margin`}>
      <Container>
        <Row>
          <Col lg={12}>
            <h2 className="mb-5">
              Let’s help you live your dream
            </h2>
          </Col>
        </Row>
      <Carousel fade>
        <Carousel.Item className={styles.studentPlacesItem}>
          <Row className={`${styles.studentPlacesRow} px-0`}>
            {
              studentPlaceData.map((studentPlace, index) => {
                return(
                  <Col key={index} sm={12} md={3} className={`${styles.studentPlacesCol} ${styles.studentPlacesColHover}`}>
                    <div className={styles.student_container}>
                      <Image src={studentPlace.imageSrc} height={270} width={270} alt="Image" />
                      <p className={styles.studentPlacesImglabel}> { studentPlace.title } </p>
                    </div>
                </Col>
                )
              })
            }
          </Row>
        </Carousel.Item>
        <Carousel.Item className={styles.studentPlacesItem}>
          <Row className={`${styles.studentPlacesRow} px-0`}>
          {
              studentPlaceData.reverse().map((studentPlace, index) => {
                return(
                  <Col key={index} sm={12} md={3} className={`${styles.studentPlacesCol} ${styles.studentPlacesColHover}`}>
                     <div className={styles.student_container}>
                        <Image src={studentPlace.imageSrc} height={270} width={270} alt="Image" />
                        <p className={styles.studentPlacesImglabel}> { studentPlace.title } </p>
                    </div>
                </Col>
                )
              })
            }
          </Row>
        </Carousel.Item>
      </Carousel>
      </Container>
    </div>
  );
}

export default StudentPlacesTemplate;
