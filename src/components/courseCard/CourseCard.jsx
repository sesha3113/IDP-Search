import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CgDollar } from "react-icons/cg";
import { AiFillQuestionCircle } from "react-icons/ai";
import Router from 'next/router';
import PropTypes from 'prop-types'
import Image from "next/image";
import styles from './CourseCardTemplate.module.scss';
import { Col } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";

const CourseCard = ({ cardData }) => {
  const { locationContext } = useContext(AppContext);

  return (
    <>
      <Col lg={4} md={4} sm={12} >
        <Card className="mt-2" role="button" onClick={() => Router.push(decodeURIComponent(`/${locationContext}/courses/${cardData.institutionName.split(" ").join("")}/${cardData.idpCourseTitle.split(" ").join("")}/?key=${cardData.idpCourseId}`))}>
        <div className={`position-relative ${styles.searchCardImgContainer}`}>
          <Image
            className="card-img rounded-0"
            src={cardData.institutionLogoUrl}
            height={230}
            layout="fill"
            alt="course-img"
            
          />
          <div className={styles.imageTinted}></div>
          <p>
            <h2
              className={`position-absolute ${styles.searchCardTitle}`} 
            >
              {cardData.idpCourseTitle}
            </h2>
          </p>
        </div>
        <Card.Body>
            <div className={`${styles.courseDetail} position-relative pb-3`}>
              <p className={styles.universityName}>
                {cardData.institutionName}
              </p>
              <div>
                <CiLocationOn size={20} />
                <span className={styles.universityLocation}>
                  {cardData.city} , {cardData.countryName}{" "}
                </span>
              </div>
              <div>
                <span className={styles.universityRank}>
                  THE world university rank: {cardData.theRanking}
                </span>
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center mt-2">
                <HiOutlineAcademicCap color="green" size={25} />
                <div className={styles.qualification}>
                  <p className={`mb-1 ${styles.qualificationTitle}`}>Course qualification</p>
                  <p className={`mb-1 ${styles.qualificationDegree}`}>Ph.D</p>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2">
                <IoIosCheckmarkCircleOutline color="green" size={25} />
                <div className={styles.qualification}>
                  <p className={`mb-1 ${styles.qualificationTitle}`}>Entry score</p>
                  <p className={`mb-1 ${styles.qualificationDegree}`}>
                    {cardData.ieltsScore}
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2">
                <CgDollar color="green" size={25} />
                <div className={styles.qualification}>
                  <p className={`mb-1 ${styles.qualificationTitle}`}>Total course fee</p>
                  <div className="d-flex align-items-center">
                    <p className={`mb-0 ${styles.qualificationDegree}`}>{cardData.courseFee}</p>
                  
                    <AiFillQuestionCircle size={18} />
                  
                  </div>
                </div>
              </div>
            </div>
        </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default CourseCard;

CourseCard.propTypes ={
  cardData :PropTypes.object
}
