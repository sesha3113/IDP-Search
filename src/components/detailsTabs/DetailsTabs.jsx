import React from "react";
import {Container, Button, Col, Row } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { TbMessageCircle } from "react-icons/tb";
import PropTypes from 'prop-types'
import styles from './DetailsTabs.module.scss';

const DetailsTabs = ({detailCardData}) => {
  return (
    <div className={styles.details}>
      <Container>
        <Row className="layout-margin mx-auto">
          <Col sm={12} md={4} className={styles.detailsCol}>
            <div className={styles.containerBox}>
              <BiSearchAlt size={45} color="black" />
              <h3>{detailCardData[0].title || ""}</h3>
              <div className={styles.text}>
                <Button className={styles.Button} size="sm" variant="outline-secondary">
                  Law
                </Button>{" "}
                &nbsp;{" "}
                <Button className={styles.Button} size="sm" variant="outline-secondary">
                  Art
                </Button>
              </div>
            </div>
          </Col>
          <Col sm={12} md={4} className={styles.detailsCol}>
            <div className={styles.containerBox}>
              <TbMessageCircle size={45} color="black" />
              <h3>{detailCardData[1].title}</h3>
              <p className={`${styles.text} lh-sm mb-0`}>{detailCardData[1].text || ""}</p>
            </div>
          </Col>
          <Col sm={12} md={4} className={styles.detailsCol}>
            <div className={styles.containerBox}>
              <BsGlobe size={35} color="black" />
              <h3>{detailCardData[2].title || ""}</h3>
              <p className={`${styles.text} lh-sm mb-0`}>{detailCardData[2].text || ""}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailsTabs;

DetailsTabs.propTypes ={
  detailCardData :PropTypes.arrayOf(Object)
}