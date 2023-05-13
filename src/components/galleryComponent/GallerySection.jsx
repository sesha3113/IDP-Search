import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from 'prop-types'

const GalleryComponent = ({gallery}) => {
  return (
    <>
      <Card>
        <Card.Img
          alt="Subject-img"
          height="100%"
          width="100%"
          src={gallery.externalUrl}
        />
        <Card.Body>
          <Card.Title className="subject-title">
            {gallery.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default GalleryComponent;

GalleryComponent.propTypes ={
  gallery: PropTypes.object,
}