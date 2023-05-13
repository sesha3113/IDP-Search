import React from "react";
import { Button, Container, Card, Col, Row } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { BsCurrencyDollar, BsFillCalendar3WeekFill } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiHeartCircle } from "react-icons/bi";
import { BsFillShareFill } from "react-icons/bs";
import PropTypes from 'prop-types'
import styles from './CoursesBanner.module.scss';
import Image from 'next/image';

const CoursesBanner = ({ bannerData }) => {
  return (
    <div>
      <Card
        className={`text-white ${styles.bannermain}`}
      >
        <Card.Img src={bannerData.heroImage} alt="Card image" className="d-block" />
        <Card.ImgOverlay className={styles.overlayColor}>
        
          <div
            className={styles.cardBody}
          >
            <span className={styles.breadcrumbLinks}>
              Law and Legal Studies &nbsp;&nbsp;
            </span>
            <MdKeyboardArrowRight size={18} />
            &nbsp;&nbsp;
            <span className={styles.breadcrumbLinks}>Law&nbsp;&nbsp;</span>
            <MdKeyboardArrowRight size={18} />
            &nbsp;&nbsp;
            <span className={styles.breadcrumbLinks}>Australia&nbsp;&nbsp;</span>
            <MdKeyboardArrowRight size={18} />
            &nbsp;&nbsp;
            <span className={styles.breadcrumbLinks}>
              The University of Southern Queensland (UniSQ)
            </span>
          </div>
          <Container>
            <Row>
              <Col lg={2} md={3} sm={12} className={styles.bannerCol1}>
                 <Image
                    src={bannerData.heroImage}
                    className={`mt-3 ${styles.bannerImg}`}
                    alt="banner"
                    width={320} height={209}
                />
              </Col>
              <Col lg={8} md={6} sm={12} className={styles.bannerCol2}>
                <Card.Title className={styles.banner2Title}>
                  {bannerData.courseTitle}
                </Card.Title>
                <Card.Text className={styles.banner2Text}>
                  {bannerData.institutionName}
                </Card.Text>
                <Card.Text>
                  <span className={styles.heart}>
                    <BiHeartCircle size={40} />
                  </span>
                  &nbsp;&nbsp;
                  <span>
                    <button className={styles.shareBtn}>
                      <BsFillShareFill size={20} /> &nbsp;Share
                    </button>
                  </span>
                </Card.Text>
              </Col>
              <Col lg={2} md={3} sm={12}>
                <Card.Text className={styles.banner3Text}>
                  <Button
                    size="lg"
                    className={`${styles.idpbutton} ${styles.bannerButton}`}
                    variant="secondary"
                  >
                    Apply with IDP
                  </Button>
                </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.ImgOverlay>
      </Card>
      <div className={styles.coursesBannerMain}>
       <Container>
         <Row>
            <Col lg={12}>
               <div className={`${styles.coursesBannerRow} layout-margin`}>
                <Row>
                    <Col className={styles.coursesBannerCol}>
                      <MdLocationOn color="#303F99" size={50} />
                      <h4>Location</h4>
                      <p>Australia</p>
                    </Col>
                    <Col className={styles.coursesBannerCol}>
                      <FaGraduationCap color="#303F99" size={50} />
                      <h4>Qualification</h4>
                      <p>Ph.D.</p>
                    </Col>
                    <Col className={styles.coursesBannerCol}>
                      <BsCurrencyDollar color="#303F99" size={50} />
                      <h4>Fees</h4>
                      <p>AU$86,400 (2023)</p>
                    </Col>
                    <Col className={styles.coursesBannerCol}>
                      <FiClock color="#303F99" size={50} />
                      <h4>Duration</h4>
                      <p>3 Year(s)</p>
                    </Col>
                    <Col className={`${styles.coursesBannerCol} ${styles.paddingTop}`}>
                      <BsFillCalendar3WeekFill color="#303F99" size={40} />
                      <h4>Next intake</h4>
                      <p>13 February 2023</p>
                    </Col>
                    <Col className={styles.coursesBannerCol}>
                      <AiOutlineCheckCircle color="#303F99" size={50} />
                      <h4>Entry score</h4>
                      <p>6.5 IELTS</p>
                    </Col>
                  </Row>
               </div>
            </Col>
         </Row>
       </Container>
      </div>
    </div>
  );
}

export default CoursesBanner;

CoursesBanner.propTypes ={
  bannerData :PropTypes.object
}