import Image from "next/image";
import React from "react";
import {Container, Col, Row } from "react-bootstrap";
import img1 from "../../assets/images/recognitions/certificationbadge.jpg";
import img2 from "../../assets/images/recognitions/gptw-women.jpg";
import styles from './RecognitionsTemplate.module.scss';

const RecognitionsTemplate = () => {
  return (
    <div className={styles.recognitionsMain}>
      <Container>
        <Row>
          <Col lg={12}>
             <h2 className="mb-5"> Recognitions</h2>
          </Col>
          <Col sm={12} md={2} className={styles.recognitionsCol}>
            <div className={styles.reco_img}>
                <Image src={img1} alt="Image" width={100} height={150} />
            </div>
          </Col>
          <Col sm={12} md={4} className={styles.recognitionsCol}>
            <h2 className={styles.recognitionsH2}>Great Place to Work 2022</h2>
            <p>
              IDP Education, the global leader in international education
              services, has been certified as a Great Place to Work 2022 in India
              by Great Place to Work®. IDP is the first international education
              services provider in India to achieve Great Place to Work
              certification.
            </p>
          </Col>
          <Col sm={12} md={2} className={styles.recognitionsCol}>
            <div className={styles.reco_img}>
                <Image src={img2} alt="Image" width={150} height={150} />
            </div>
          </Col>
          <Col sm={12} md={4} className={styles.recognitionsCol}>
            <h2 className={styles.recognitionsH2}>Indias Best Workplaces™ for Women 2022</h2>
            <p>
              IDP Education has been recognised by Great Place to Work® India
              among - Indias Best Workplaces™ for Women 2022 Great Place to Work®
              is known for conducting the worlds largest study of workplace
              excellence and people management practices.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RecognitionsTemplate;
