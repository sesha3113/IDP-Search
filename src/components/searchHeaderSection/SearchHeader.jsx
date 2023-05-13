import React from "react";
import Card from "react-bootstrap/Card";
import headerbannerImg from "../../assets/images/search/headerbannerimg.png";
import styles from './Search.module.scss';

const SearchHeaderSection = () => {
  return (
    <Card className={`${styles.searchBanner} my-4`}>
      <Card.Body className="d-flex">
        <Card.Img
          className={styles.headerBannerImg}
          variant="top"
          src={headerbannerImg}
        />
        <div className={styles.searchBannerText}>
          <div>
            <Card.Text className={styles.searchHeaderText}>
              Get ready for the FastLane
            </Card.Text>
            <Card.Text className={styles.searchHeaderText}>
              Make your university application stress free and discover in
              minutes if you would get into the university you have always dreamt of.
              Choose your course, enter your academic profile and get a decision
              from an institution in real-time.
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SearchHeaderSection;
