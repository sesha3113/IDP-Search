import React from "react";
import img1 from "../../assets/images/universities/centennialcollege.jpg";
import img2 from "../../assets/images/universities/deakin-university.jpg";
import img3 from "../../assets/images/universities/latrobeuniversity.jpg";
import img4 from "../../assets/images/universities/melbourne.jpg";
import img5 from "../../assets/images/universities/myhc-252772.jpg";
import img7 from "../../assets/images/universities/tafe.jpg";
import img8 from "../../assets/images/universities/brihmingam.jpg";
import {Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from './UniversitiesTemplate.module.scss';


const UniversitiesTemplate = () => {
  const imageSources = [ img1, img2, img3, img4, img5, img7, img8 ]
  return (
    <div className={styles.universityMain}>
      <div className="layout-margin px-0">
        <Container>
          <Row>
            <Col lg={12}>
              <h3 className="mb-5 mt-4">We’ll find your perfect fit</h3>
            </Col>
            {
              imageSources.map((imageSrc, index) => {
                return(
                  <Col key={index} sm={12} md={3} className={styles.universityCol}>
                    <Image src={imageSrc} alt="Image" width={250} height={135} />
                  </Col>
                )
              })
            }
            <Col lg={12}>
              <p className={styles.universityFooter}>See more universities..</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default UniversitiesTemplate;
