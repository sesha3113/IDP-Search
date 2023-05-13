import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const GuidanceComponent = ({ guidance }) => {
  return (
    <>
      <Card className='guidanceCardHeight'>
        <Image
          alt='Subject-img'
          height='220'
          width='100%'
          src={guidance.bannerImage}
        />
        <Card.Body>
          <Card.Title className='subject-title'>
            {guidance.headerContent}
          </Card.Title>
          <Card.Text>{guidance.teaserContent}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default GuidanceComponent;

GuidanceComponent.propTypes = {
  guidance: PropTypes.object,
};
