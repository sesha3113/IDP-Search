import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { FaMicroscope, FaDesktop } from "react-icons/fa";
import { VscLaw } from "react-icons/vsc";
import { GiDna2 } from "react-icons/gi";
import PropTypes from 'prop-types'
import styles from './CoursesTemplate.module.scss';

const CoursesTemplate = ({courseTemplateData}) => {

  const iconsObject = {
    Computer: <FaDesktop size={50} color="#1b4bb3" />,
    Business: <TbBuildingSkyscraper size={50} color="#1b4bb3" />,
    Engineering: <FiSettings size={50} color="#1b4bb3" />,
    Health: <FaMicroscope size={50} color="#1b4bb3" />,
    Law: <VscLaw size={50} color="#1b4bb3" />,
    Biological: <GiDna2 size={50} color="#1b4bb3" />,
  };

  return (
    <div className={`${styles.coursesMain} layout-margin px-0`}>
      <Container>
        <Row className={styles.coursesRow}>
          <Col lg={12}>
             <h2 className="mb-5">Popular courses among Indian students</h2>
          </Col>
          {courseTemplateData.map((dta,index) => (
            <Col key={index} sm={12} md={4} mt={3} className={`${styles.coursesCol} ${styles.coursesColHover}`}>
              {iconsObject[dta.iconType]}
              <h2 className={styles.coursesTitle}>{dta.heading}</h2>
              <p>{dta.type1}</p> 
              <p>{dta.type2}</p>
              <p>{dta.type3}</p>
            </Col>
          ))}
          <Col lg={12}>
             <p className={styles.coursesFooter}>Browse more subjects..</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CoursesTemplate;

CoursesTemplate.propTypes ={
  courseTemplateData :PropTypes.arrayOf(Object)
}