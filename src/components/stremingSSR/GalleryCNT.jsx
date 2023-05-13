import { galleryBodyObject } from '../../payload/coursePayload';
import { config } from '../../configs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import GalleryComponent from '../galleryComponent/GallerySection';

const GalleryCNT = () => {
  const [galleryData, setgalleryData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { token, courseUrl } = config;
    let header = new Headers();
    header.append('authorization_token', token);
    header.append('Content-Type', 'application/json');
    galleryBodyObject.key_attributes.course_id = `${router.query.key}`;
    let galleryComponent = JSON.stringify(galleryBodyObject);
    let payloadGallery = {
      method: 'POST',
      headers: header,
      body: galleryComponent,
      redirect: 'follow',
    };
    await fetch(courseUrl, payloadGallery)
      .then((res) => res.json())
      .then((dta) =>
        setgalleryData(
          dta.result['app-module-gallery'][
            'institution-media-carousel-component'
          ].data.slice(0, 6)
        )
      );
  };
  return (
    <>
      <strong>University Gallery</strong>
      <br />
      <Row>
        {galleryData.length !== 0 &&
          galleryData.map((gallery) => (
            <>
              {gallery.externalMimeType === 'Image' && (
                <Col className='marginBottom20' md={4} sm={12}>
                  <GalleryComponent gallery={gallery} />
                </Col>
              )}
            </>
          ))}
      </Row>
    </>
  );
}

export default GalleryCNT;
