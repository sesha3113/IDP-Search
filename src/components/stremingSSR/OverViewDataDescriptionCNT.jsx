import { overviewBodyObject } from '../../payload/coursePayload';
import { config } from '../../configs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';

const OverViewDataDescriptionCNT = () => {
  const router = useRouter();

  const [description, setdescription] = useState('')

  useEffect(() => {
    let { token, courseUrl } = config;
    let header = new Headers();
    header.append('authorization_token', token);
    header.append('Content-Type', 'application/json');
    overviewBodyObject.key_attributes.course_id = `${router.query.key}`;
    let overviewBody = JSON.stringify(overviewBodyObject);
    let payloadOverview = {
      method: 'POST',
      headers: header,
      body: overviewBody,
      redirect: 'follow',
    };
    let fetchData = () => {
      fetch(courseUrl, payloadOverview)
        .then((res) => res.json())
        .then((dta) => setdescription(dta.result['app-module-content-hub'].overview.description));
    };
    fetchData();
  }, []);

  return (
    <div>
      <p className='content'>{description}</p>
      <br />
      <p className='about-list'>
        <TiTick color='green' size={25} /> Scholarships -{' '}
        <strong className='boldText'>View all scholarships</strong>
      </p>
      <p className='about-list'>
        <TiTick color='green' size={25} /> Internships
      </p>
    </div>
  );
}

export default OverViewDataDescriptionCNT;
