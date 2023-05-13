import React from "react";
import img1 from "../../assets/images/universities/ielts.png";
import img2 from "../../assets/images/universities/hotcourses.jpg";
import {Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from './PartnersTemplate.module.scss';

const PartnersTemplate = () => {
  const imageSource = [ img1, img2 ]
  return (
    <div className={styles.partnersMain}>
      <div className="layout-margin px-0">
        <Container>
          <Row>
            <Col lg={12}>
               <h2 className="mb-5">Our partners</h2>
            </Col>
            {
              imageSource.map((imageSrc, index) => {
                return(
                  <Col key={index} sm={12} md={3} className={styles.partnersCol}>
                    <Image src={imageSrc} alt="Image" width={250} height={135} />
                  </Col>
                )
              })
            }
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default PartnersTemplate;
