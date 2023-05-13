import { criteriaBodyObject } from '../../payload/coursePayload';
import { config } from '../../configs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const CriteriaCNT = () => {
  const [criteriaData, setcriteriaData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { token, courseUrl } = config;
    let header = new Headers();
    header.append('authorization_token', token);
    header.append('Content-Type', 'application/json');
    criteriaBodyObject.key_attributes.course_id = `${router.query.key}`;
    let criteriaBody = JSON.stringify(criteriaBodyObject);
    let payloadCriteria = {
      method: 'POST',
      headers: header,
      body: criteriaBody,
      redirect: 'follow',
    };
    await fetch(courseUrl, payloadCriteria)
      .then((res) => res.json())
      .then((dta) =>
        setcriteriaData(
          dta.result['app-module-criteria']['start-dates-component'].data
        )
      );
  };
  return (
    <div>
      <p>
        Course fees are indicative and should be used as a guide.{' '}
        <strong className='boldText'>Speak to a counsellor</strong> to get an
        accurate price.
      </p>
      <table>
        <thead>
          <tr className='tableHead'>
            <th className='tablecontent'>intake</th>
            <th className='tablecontent'>location</th>
            <th className='tablecontent'>duration</th>
          </tr>
        </thead>
        <tbody>
          {criteriaData.length !== 0 &&
            criteriaData.map((ctria,index) => (
              <tr key={index} className='tableHead'>
                <td className='tablecontent'>{ctria.commencement_date}</td>
                <td className='tablecontent boldText'>{ctria.campusName}</td>
                <td className='tablecontent'>{ctria.duration_of_study}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CriteriaCNT;
