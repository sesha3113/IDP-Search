import Image from 'next/image';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import img1 from '../../assets/images/logos/facebook.png';
import img2 from '../../assets/images/logos/instagram.png';
import img3 from '../../assets/images/logos/linkedin-icon.png';
import img4 from '../../assets/images/logos/twitter.png';
import PropTypes from 'prop-types';
import styles from './Footer.module.scss';
import Head from 'next/head';
import { useSelector } from 'react-redux';

const Footer = ({ footerData }) => {
  
  const { counter } = useSelector((state) => state.search);

  useEffect(() => {
    console.log("Store Value-----",counter )
  }, [counter])

  return (
    <div className={styles.footer}>
      <Row className={styles.footerRow1}>
        {footerData.map((data, index) => (
          <Col key={index} sm={12} md={3}>
            <ul className={styles.footerList}>
              <li className={styles.footerListTitle}>{data.title}</li>
              { 
                data.noroboTag == 'true' && (<Head><meta name="robots" content="noindex"/></Head>)
              }
              <li>{data.categories1}</li>
              <li>{data.categories2}</li>
              <li>{data.categories3}</li>
              <li>{data.categories4}</li>
              <li>{data.categories5}</li>
              <li>{data.categories6}</li>
              <li>{data.categories7}</li>
            </ul>
          </Col>
        ))}
      </Row>
      <Row className={styles.footerRow2}>
        <Col sm={12} md={3} className={styles.footerCol1}>
          <p>Copyright © 2023 IDP Education</p>
        </Col>
        <Col sm={12} md={6} className={styles.footerCol1}>
          <p>
            <span>Disclaimer | </span>
            <span>Privacy Policy |</span> <span>Terms Of Use | </span>
            <span>Investors</span>
          </p>
        </Col>
        <Col sm={12} md={3} className={styles.footerCol1}>
          <p>
            <Image src={img1} alt='img' height='20' width='20' />
            &nbsp;&nbsp;
            <Image alt='img' src={img2} height='20' width='20' />
            &nbsp;&nbsp;
            <Image alt='img' src={img3} height='20' width='20' />
            &nbsp;&nbsp;
            <Image alt='img' src={img4} height='20' width='20' />
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
Footer.propTypes = {
  footerData: PropTypes.arrayOf(Object),
};
