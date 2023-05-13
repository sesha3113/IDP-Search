import { guidanceBodyObject } from '../../payload/coursePayload';
import { config } from '../../configs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import GuidanceComponent from '../guidanceComponent/GuidanceSection';

const GuidanceComponentCNT = () => {
  const router = useRouter();
  const [guidanceData, setguidanceData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { token, courseUrl } = config;
    let header = new Headers();
    header.append('authorization_token', token);
    header.append('Content-Type', 'application/json');
    guidanceBodyObject.key_attributes.course_id = `${router.query.key}`;
    guidanceBodyObject.key_attributes.article_id = `${router.query.key}`;
    let guidanceComponent = JSON.stringify(guidanceBodyObject);
    let payloadGuidance = {
      method: 'POST',
      headers: header,
      body: guidanceComponent,
      redirect: 'follow',
    };
    await fetch(courseUrl, payloadGuidance)
      .then((res) => res.json())
      .then((dta) =>
        setguidanceData(
          dta.result['app-module-article'][
            'destination-based-article-component'
          ].data.slice(0, 6)
        )
      );
  };
  return (
    <div>
      <Row>
        {guidanceData.length !== 0 &&
          guidanceData.map((guidance,index) => (
            <Col key={index} className='marginBottom20' md={4} sm={12}>
              <GuidanceComponent guidance={guidance} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default GuidanceComponentCNT;
