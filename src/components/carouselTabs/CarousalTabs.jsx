import React, { useContext} from "react";
import Carousel from "react-bootstrap/Carousel";
import DetailsTabs from "../../components/detailsTabs/DetailsTabs";
import Image from 'next/image'
import PropTypes from 'prop-types'
import styles from './CarouselTabs.module.scss';
import { AppContext } from "../../context/AppContext";
import { Col, Container, Row } from "react-bootstrap";

const CarouselTabs = ( props ) => {
  const { homePageBannerData, detailCardData } = props;
  const { imageQuality } = useContext(AppContext);
  return (
    <div>
      <div>
        <div className="responsive-tab-content">
          <Container>
             <Row>
                <Col sm={12}>
                <h1>IDP Live App</h1>
                <p>From here to anywhere. Thinking about studying overseas?
                  Download the IDP Live App</p>
                </Col>
             </Row>
          </Container>
        </div>
        <div className="responsive-tab-carousel">
            <Carousel fade>
              {homePageBannerData.map((dta,index) => (
                <Carousel.Item className={styles.carouselItem} key={index}>
                  <Image
                    width="100%"
                    className={styles.zIndex}
                    src={dta?.carouselBannerImg.url}
                    alt={dta.alt}
                    layout="fill"
                    quality={imageQuality}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
        </div>
        <div>
          <DetailsTabs detailCardData={detailCardData}/>
        </div>
      </div>
    </div>
  );
}

export default CarouselTabs;

CarouselTabs.propTypes ={
  homePageBannerData: PropTypes.arrayOf(Object),
  detailCardData: PropTypes.arrayOf(Object)
}
