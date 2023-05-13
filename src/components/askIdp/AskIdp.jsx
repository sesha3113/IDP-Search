import React, { useContext, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './AskIdp.module.scss';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import Router from 'next/router';
import { AppContext } from "../../context/AppContext";
import PropTypes from 'prop-types';

import { useDispatch, } from 'react-redux';
import { updateItems } from '../../redux/actions/Search';

const AskIdp = ({ askidpData }) => {
  const { locationContext } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateItems({counter :  "IDP POC"}));
  }, [])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  

  return (
    <div className={`${styles.askIdpMain} layout-margin`}>
      <h2>Ask IDP</h2>
      <p>
        Our counsellors and institutions answer your burning questions in less
        than 30 seconds.
      </p>
      <Carousel
        responsive={responsive}
        className={styles.askIdpCarousel}
        keyBoardControl={true}
        dotListClass='custom-dot-list-style'
      >
        {askidpData.length !== 0 &&
          askidpData.map((dta, index) => (
            <div
              className={styles.askIdpItem}
              key={index}
              onClick={() =>
                Router.push({
                  pathname: `/${locationContext}/student-queries`,
                  query: {
                    question: dta.question,
                  },
                })
              }
            >
              <Card className={styles.imageCard}>
                <Image
                  alt='member'
                  width='201'
                  height='359'
                  className={styles.askIdpItemImage}
                  src={dta.person.url}
                />
                <Card.ImgOverlay>
                  <Card.Title className={styles.cardTitle}>
                    <div>
                      <BsFillPlayCircleFill
                        className={`${styles.playBtn} ${styles.playBtnHover}`}
                        size={55}
                      />
                    </div>
                  </Card.Title>
                  <Card.Text className={styles.cardText}>
                    {dta.question}
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </div>
          ))}
        {askidpData.length !== 0 &&
          askidpData.map((dta, index) => (
            <div
              className={styles.askIdpItem}
              key={index}
              onClick={() =>
                Router.push({
                  pathname: '/student-queries',
                  query: {
                    question: dta.question,
                  },
                })
              }
            >
              <Card className={styles.imageCard}>
                <Image
                  alt='member'
                  width='201'
                  height='359'
                  className={styles.askIdpItemImage}
                  src={dta.person.url}
                />
                <Card.ImgOverlay>
                  <Card.Title className={styles.cardTitle}>
                    <div>
                      <BsFillPlayCircleFill
                        className={styles.playBtn}
                        size={55}
                      />
                    </div>
                  </Card.Title>
                  <Card.Text className={styles.cardText}>
                    {dta.question}
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </div>
          ))}
        
      </Carousel>
    </div>
  );
}

export default AskIdp;


AskIdp.propTypes ={
  askidpData: PropTypes.arrayOf(Object),
}
