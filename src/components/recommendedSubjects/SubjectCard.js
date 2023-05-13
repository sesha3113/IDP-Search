import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from 'prop-types'

const SubjectCard = ({course}) => {
  return (
    <>
      <Card className="px-0 subject-card-prop">
        <Card.Img
          alt="Subject-img"
          height="100%"
          width="100%"
          src={course.banner.url}
        />
        <Card.Body>
          <Card.Title className="subject-title">
            {course.heading}
          </Card.Title>
          <Card.Text>
           {course.body.body}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default SubjectCard;

SubjectCard.propTypes ={
  course: PropTypes.object,
}
