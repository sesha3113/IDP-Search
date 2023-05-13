//import { homeConstant } from '../../constants/homeConstants';
import { HEADER_QUERY_CONSTANT } from "../../constants/homeConstants";
import { FOOTER_QUERY_CONSTANT } from "../../constants/homeConstants";
import Layout from '@/components/layout/Layout';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import VideoPlayer from '@/components/videoPlayer/VideoPlayer';
import { localeData } from '@/configs/localeData';
import { contentQuery } from '@/utils/ContentQuery';
import contentfulFetch from '@/utils/graphqlFetch';
import React, { useContext, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BsArrowRightCircle } from 'react-icons/bs';
import { AppContext } from "@/context/AppContext";
import PropTypes from 'prop-types'

const studentQueries = ({ serverData }) => {
  const { headerData, footerData, location } = serverData;
  const { setLocationContext } = useContext(AppContext);
  let dataObject = serverData.askidpData[0];

  useEffect(() => {
    setLocationContext(location)
  }, [])
  

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <div className='layout-margin queryPage'>
        <Row>
          <Col sm={12} md={8} lg={8}>
            <h2 className='fontColor'>{dataObject?.question}</h2>
            <br />
            <p>{dataObject?.questionContent}</p>
          </Col>
          <Col>
            <Button size='md' className='idpbutton' variant='secondary'>
              Help me study abroad
            </Button>
          </Col>
        </Row>
        <br />
        <div className='videoSection'>
          <Row>
            <Col sm={12} md={3} lg={3} className='videoContainer'>
              <VideoPlayer height={359} src={dataObject?.videoTest?.url} className ="videoTag"/>
            </Col>
            <Col>
              <h4 className='fontColor text-center my-4'>
                {dataObject?.heading}
              </h4>
              <p className='mx-2 my-5 contentFont'>{dataObject?.content}</p>
            </Col>
          </Row>
          <div className='text-end px-3 py-3'>
            <span className='videoLinks'>
              View all answers <BsArrowRightCircle />
            </span>{' '}
            &nbsp; &nbsp; &nbsp;
            <span className='videoLinks'>
              View all courses <BsArrowRightCircle />
            </span>
          </div>
        </div>
        <div>
          <h4 className='my-5'>Similar questions from students</h4>
          <ul className='questionsLi'>
            <li>You asked, we answered.</li>
            <li>Which courses or study areas are in demand for the USA?</li>
            <li>What is the weather like in the USA?</li>
            <li>
              Why should international students choose New Zealand to study
              abroad?
            </li>
            <li>
              this is second roundoff testing with its maximum character limit
              of this question incldd
            </li>
            <li>
              what is the weather be like in india i want to migrate there?
            </li>
            <li>Which city in the USA is best for international students?</li>
            <li>
              Why should international students choose to study at your
              university?
            </li>
            <li>How safe is the USA for international students?</li>
            <li>
              What will be the university of Kent provide us for students1?
            </li>
            <li>
              Why IDP? Why choose IDP? Inspiring students since 1969, we partner
              with all leading. lead?
            </li>
            <li>
              Why should international students choose Australia over other
              destinations?
            </li>
            <li>
              Can international students stay in the USA after graduation?
            </li>
            <li>
              Can international students stay in Australia after graduation?
            </li>
            <li>
              What scholarships & financial aid do you offer international
              students?
            </li>
            <li>
              What accommodation options do you offer international students?
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default LoadingIndicator(studentQueries);

studentQueries.propTypes ={
  serverData: PropTypes.object,
}

export async function getServerSideProps(context) {
  let location, locale;
  location = context.query.location || context.req.url.split('/')[1];
  locale = context.query.lang || localeData[`${location}`]?.defaultLocale;
  // const { headerQueryConstant, footerQueryConstant } = homeConstant;

  const askIdpQueryConstant = `{ askIdpCollection( where:{ question: ${JSON.stringify(
    context.query.question
  )}}){ items{ question heading videoLink videoTest { url } content questionContent } } }`;

  const headerQuery = contentQuery(HEADER_QUERY_CONSTANT, {}, locale);
  const footerQuery = contentQuery(FOOTER_QUERY_CONSTANT, {}, locale);
  const askIdpQuery = contentQuery(askIdpQueryConstant, {}, locale);

  const coursePayload = [headerQuery, footerQuery, askIdpQuery];

  let [header, footer, askidp] = await Promise.allSettled(
    coursePayload.map((payload) =>
      contentfulFetch(payload)
        .then((res) => res)
        .catch((err) => {
          console.log('Error', err);
        })
    )
  );
  let [headerData, footerData, askidpData] = [
    header.value.navbarCollection.items,
    footer.value.footerCollection.items,
    askidp.value.askIdpCollection.items,
  ];
  return {
    props: {
      serverData: {
        headerData,
        footerData,
        askidpData,
        location
      },
    },
  };
}
