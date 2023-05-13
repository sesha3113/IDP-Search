import React, { Profiler, useEffect, useContext } from 'react';
import Layout from '@/components/layout/Layout';
import HomePage from '@/components/homePage/HomePage';
import contentfulFetch from '@/utils/graphqlFetch';
import SEO from '@/components/seo/Seo';
// import { homeConstant } from '../constants/homeConstants';
import { HEADER_QUERY_CONSTANT } from "../constants/homeConstants";
import { HOME_PAGE_QUERY_CONSTANT } from "../constants/homeConstants";
import { FORM_QUERY_CONSTANT } from "../constants/homeConstants";
import { DETAILS_CARD_QUERY_CONSTANT } from "../constants/homeConstants";
import { STUDENT_STORIES_QUERY_CONSTANT } from "../constants/homeConstants";
import { STUDENT_SAYING_QUERY_CONSTANT } from "../constants/homeConstants";
import { COURSES_QUERY_CONSTANT } from "../constants/homeConstants";
import { FOOTER_QUERY_CONSTANT } from "../constants/homeConstants";
import { ASKIDP_QUERY_CONSTANT } from "../constants/homeConstants";
import { contentQuery } from '@/utils/ContentQuery';
import { utils } from '@/utils';
import { localeData } from "@/configs/localeData";
import Cookies from "js-cookie";
import { performance } from "perf_hooks";
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import { AppContext } from "@/context/AppContext";
import PropTypes from 'prop-types'

const IndexPage = ({ serverData }) => {
  const { headerData, footerData, user_ip, locale, location } = serverData;
  const { setLocationContext } = useContext(AppContext);
  const { setSessionStorage } = utils;
  useEffect(() => {
    setSessionStorage("ip", user_ip);
    setLocationContext(location);
    console.log("Home page api response time", serverData.responseTime);
    // console.log("host nameee",window.location.hostname);
    Cookies.set("user_name_key", "Htc User", {
      domain: '.htcpoc.com',
    });
  }, []);

  const onRenderConsole = (
    id,
    phase,
    actualDuration,
  ) => {
    if (phase === "mount") {
      console.table([
        ["Component Name", id],
        ["activity", phase],
        ["time spent rendering the committed update", actualDuration],
      ]);
    }
  };

  return (
    <main key={locale}>
      <SEO
        title="Study Abroad, Overseas Education Consultant, Get Free Counselling! | IDP India"
        description="Study Overseas Consultants in India - Study abroad with IDP education, we help students to study overseas in Australia, USA, Canada, UK & New Zealand."
      />
      <Layout
        headerData={headerData}
        footerData={footerData}
        location={location}
      >
        <Profiler id="HomePage" onRender={onRenderConsole}>
          <HomePage serverData={serverData} />
        </Profiler>
      </Layout>
    </main>
  );
};

export default LoadingIndicator(IndexPage);

IndexPage.propTypes ={
  serverData: PropTypes.object,
}

export async function getServerSideProps(context) {
  let location, locale;
  location = context.query.location;
  locale = context.query.lang || localeData[`${location}`]?.defaultLocale;
  console.log("=========================================================");
  console.log("Location", location);
  console.log("locale", locale);

  let ip;
  const { req } = context;
  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  // const cookieOptions = {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'strict',
  //   path: '/',
  //   domain: '.cloudfront.net',
  //   };
  //   const cookieString = cookie.serialize('Test_Cookie', 'MuniKumar', cookieOptions);
  //   context.res.setHeader('Set-Cookie', cookieString);
  // const {
  //   headerQueryConstant,
  //   homePageBannerQueryConstant,
  //   formComponentQueryConstant,
  //   detailCardQueryConstant,
  //   studentStoryQueryConstant,
  //   studentSayingQueryConstant,
  //   courseTemplateQueryConstant,
  //   footerQueryConstant,
  //   askIdpQueryConstant,
  // } = homeConstant;

  const headerQuery = contentQuery(HEADER_QUERY_CONSTANT, {}, locale);

  const askIdpQuery = contentQuery(ASKIDP_QUERY_CONSTANT, {}, locale);

  const homePageBannerQuery = contentQuery(
    HOME_PAGE_QUERY_CONSTANT,
    {},
    locale
  );

  const formComponentQuery = contentQuery(
    FORM_QUERY_CONSTANT,
    {},
    locale
  );

  const detailCardQuery = contentQuery(DETAILS_CARD_QUERY_CONSTANT, {}, locale);

  const studentStoryQuery = contentQuery(STUDENT_STORIES_QUERY_CONSTANT, {}, locale);

  const studentSayingQuery = contentQuery(
    STUDENT_SAYING_QUERY_CONSTANT,
    {},
    locale
  );

  const courseTemplateQuery = contentQuery(
    COURSES_QUERY_CONSTANT,
    {},
    locale
  );

  const footerQuery = contentQuery(FOOTER_QUERY_CONSTANT, {}, locale);

  const coursePayload = [
    headerQuery,
    homePageBannerQuery,
    formComponentQuery,
    detailCardQuery,
    studentStoryQuery,
    studentSayingQuery,
    courseTemplateQuery,
    footerQuery,
    askIdpQuery,
  ];
  const start = performance.now();
  let [
    header,
    homePage,
    formComponent,
    detailCard,
    studentStory,
    studentSaying,
    courseTemplate,
    footer,
    askidp,
  ] = await Promise.allSettled(
    coursePayload.map((payload) =>
      contentfulFetch(payload)
        .then((res) => res)
        .catch((err) => {
          console.log("Error", err);
        })
    )
  );
  const end = performance.now();
  const responseTime = end - start;
  let [
    headerData,
    homePageBannerData,
    formComponentData,
    detailCardData,
    studentStoryData,
    studentSayingsData,
    courseTemplateData,
    footerData,
    askidpData,
  ] = [
    header.value.navbarCollection.items,
    homePage.value.homepageBannerCollection.items,
    formComponent.value.homeFormComponentCollection.items,
    detailCard.value.detailsCardsCollection.items,
    studentStory.value.studentStoriesCollection.items,
    studentSaying.value.studentSayingsCollection.items,
    courseTemplate.value.coursesTemplateCollection.items,
    footer.value.footerCollection.items,
    askidp.value.askIdpCollection.items,
  ];

  return {
    props: {
      serverData: {
        headerData,
        homePageBannerData,
        formComponentData,
        detailCardData,
        studentStoryData,
        studentSayingsData,
        courseTemplateData,
        footerData,
        askidpData,
        user_ip: ip,
        responseTime: responseTime,
        locale: locale,
        location: location,
      },
    },
  };
}
