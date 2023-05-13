import React, { useEffect, useState, Suspense, useContext } from "react";
import CourseCard from "@/components/courseCard/CourseCard";
import Layout from "@/components/layout/Layout";
import { Container, Col, Row } from "react-bootstrap";
import FormInput from "@/components/formComponent/Form";
import RecommendedSubjects from "@/components/recommendedSubjects/RecommendedSubjects";
import CoursesTemplate from "@/components/coursesTemplate/CoursesTemplate";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import SettingsIcons from "../../assets/icons/settings.svg";
import { config } from "../../configs";
import { useRouter } from "next/router";
import contentfulFetch from "@/utils/graphqlFetch.js";
import Image from "next/image";
import SEO from "@/components/seo/Seo";
import { performance } from "perf_hooks";
import dynamic from "next/dynamic";
//import { homeConstant } from "../../constants/homeConstants";
import { HEADER_QUERY_CONSTANT } from "../../constants/homeConstants";
import { FOOTER_QUERY_CONSTANT } from "../../constants/homeConstants";
import {
  studyLevelArray,
  StudyLevelDisplay,
  sortByOptions,
  searchConstants,
} from "../../constants/searchConstants";
import { searchPayload } from "../../payload/searchPayload";
import { contentQuery } from "@/utils/ContentQuery";
import styles from "../../components/searchHeaderSection/Search.module.scss";
import { localeData } from "@/configs/localeData";
import cookie from "cookie";
import Cookies from "js-cookie";
import { AppContext } from "@/context/AppContext";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";
import PropTypes from 'prop-types';
import {addSearchCategory} from "../../services/search/search.service";
import {getSecretData} from "../../services/global/global.services";

const FilterPanel = dynamic(() => import("@/components/filterPanel/FilterPanelTemplate"), {
  suspense: true,
  ssr: false,
});
const Search = ({ serverSideData }) => {
  const {
    serverData,
    headerData,
    courseTemplateData,
    footerData,
    token,
    isNewToken,
    location
  } = serverSideData;
  const { courseUrl } = config;
  const Router = useRouter();
  const [open, setOpen] = useState(false);
  const [studyLevelCheck, setstudyLevelCheck] = useState("Postgraduate");
  const [courseType, setcourseType] = useState("Art");
  const [destinationFilter, setdestinationFilter] = useState([]);
  const [matchedResults, setmatchedResults] = useState(
    serverData?.result["app-module-header"]["no-of-results"].overAllCourseCount
  );
  const [dispalyCourseName, setdispalyCourseName] = useState({
    key: "",
    value: "",
  });
  const { setLocationContext } = useContext(AppContext);


  useEffect(() => {
    setLocationContext(location)
    if (isNewToken) {
      Cookies.set("token", token, { expires: 1 });
    }
  }, []);

  useEffect(() => {
    console.log("Search page api response time", serverSideData.responseTime);
    const DisplayStudyType = StudyLevelDisplay.filter(
      (dta) => dta.key == Router.asPath.split("studyLevel=")[1]
    );
    setdispalyCourseName(DisplayStudyType[0]);
    setstudyLevelCheck(Router.asPath.split("studyLevel=")[1]);
    setcourseType(Router.asPath.split("&studyLevel")[0].split("course=")[1]);
  }, [Router.asPath]);

  const applyfiltersApi = (crseType, stdylevel, destination) => {
    let destinationMain = [];

    if (destination !== "") {
      if (destinationFilter.length === 0) {
        setdestinationFilter([destination]);
        destinationMain.push(destination);
      }
      if (
        destinationFilter.length !== 0 &&
        !destinationFilter.some(
          (dst) => dst.destination_country === destination.destination_country
        )
      ) {
        destinationMain = [...destinationFilter, destination];
        setdestinationFilter([...destinationFilter, destination]);
      }
      if (
        destinationFilter.length !== 0 &&
        destinationFilter.some(
          (dst) => dst.destination_country === destination.destination_country
        )
      ) {
        destinationMain = destinationFilter.filter(
          (dta) => dta.destination_country !== destination.destination_country
        );
        setdestinationFilter(
          destinationFilter.filter(
            (dta) => dta.destination_country !== destination.destination_country
          )
        );
      }
    } else {
      destinationMain = destinationFilter;
    }

    const studyLevelValue = studyLevelArray.filter(
      (val) => val.study_level_name == stdylevel
    );

    setcourseType(crseType);
    setstudyLevelCheck(stdylevel);
    searchPayload.key_attributes.search_criteria.subject_keyword = `${crseType}`;
    searchPayload.key_attributes.search_criteria.qualification =
      studyLevelValue;
    searchPayload.key_attributes.search_criteria.country = destinationMain;
    let payloadBody = searchPayload;
    let body = JSON.stringify(payloadBody);

    let header = new Headers();
    header.append("authorization_token", token);
    header.append("Content-Type", "application/json");
    let payloadData = {
      method: "POST",
      headers: header,
      body: body,
      redirect: "follow",
    };

    fetch(courseUrl, payloadData)
      .then((resData) => resData.json())
      .then((crseData) => {
        setmatchedResults(
          crseData.result["app-module-header"]["no-of-results"]
            .overAllCourseCount
        );
      });
  };

  const filterProp = {
    courseType,
    setcourseType,
    studyLevelCheck,
    setstudyLevelCheck,
    matchedResults,
    applyfiltersApi,
    open,
    setOpen,
    setmatchedResults,
    serverData,
  };
  return (
    <>
      <SEO
        title={`${dispalyCourseName.value || "Postgraduate"}
    ${
      serverData?.result["app-module-header"].title.subjectTitle || "Art"
    } courses`}
        description={`${dispalyCourseName.value || "Postgraduate"}
      ${
        serverData?.result["app-module-header"].title.subjectTitle || "Art"
      } courses`}
      />

      <div className="position-relative">
        {open && (
          <Suspense
            fallback={
              <div className={styles.filtersPannelFallback}>
                <div>Loading....</div>
              </div>
            }
          >
            <FilterPanel {...filterProp} />
          </Suspense>
        )}
        <Layout headerData={headerData} footerData={footerData} location={location}>
          <Container className="mt-5">
            <Row>
              <Col lg={12} sm={12}>
                <div>
                  <h1 className={styles.courseName}>
                    {dispalyCourseName.value}{" "}
                    {serverData?.result["app-module-header"].title
                      .subjectTitle || "Art"}{" "}
                    courses
                  </h1>
                  <strong className={styles.resultCount}>
                    {serverData?.result["app-module-header"]["no-of-results"]
                      .overAllCourseCount || "151 international courses found"}
                    , showing 1-10 below
                  </strong>
                  <div className="my-4 d-flex flex-row">
                    <div className="action-items">
                      <Select
                        className={styles.searchSort}
                        classNamePrefix="select"
                        defaultValue={sortByOptions[0]}
                        isClearable
                        name="sort-by"
                        options={sortByOptions}
                      />
                    </div>
                    <div className="mx-3">
                      <Button
                        onClick={() => setOpen(!open)}
                        variant="outline-secondary"
                        className={styles.filterBtn}
                      >
                        <div className="d-flex align-items-center">
                          <Image
                            height="15px"
                            src={SettingsIcons}
                            alt="logo"
                            width={20}
                          />
                          <span className="px-2">Filter</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={8} sm={12}>
                <Row>
                  {serverData?.result["app-module-omni-search"][
                    "dynamic-omni-search-courses-component"
                  ].courses?.length !== 0 &&
                    serverData?.result["app-module-omni-search"][
                      "dynamic-omni-search-courses-component"
                    ].courses.map((dta,index) => {
                      return <CourseCard key={index} cardData={dta} />;
                    })}
                </Row>
              </Col>
              <Col lg={4} sm={12}>
                <div className={styles.searchHeader}>
                  <div className={styles.searchHeaderTitle}>
                    Interested in Art?
                  </div>
                  <div className={styles.searchHeaderDesc}>
                    Enter your details below and we will call you back when it
                    suits you
                  </div>
                </div>
                <div className={styles.searchFormParent}>
                  <FormInput />
                </div>
              </Col>
            </Row>
          </Container>
          <RecommendedSubjects />
          <CoursesTemplate courseTemplateData={courseTemplateData} />
        </Layout>
      </div>
    </>
  );
}

export default LoadingIndicator(Search);

Search.propTypes ={
  serverSideData: PropTypes.object,
}

export async function getServerSideProps(context) {
  let location,
    locale,
    token,
    isNewToken = false;
  // console.log("context", context)
  // console.log("context req", context.req)
  location = context.query.location || context.req.url.split("/")[1];
  locale = context.query.lang || localeData[`${location}`]?.defaultLocale;
  const { req } = context;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  // const origin = `https://ui.htcpoc.com`;
  // const origin = `${protocol}://${host}`;
  const cookies = cookie.parse(req.headers.cookie || "");
  console.log("cookies starting", cookies);
  // console.log("origin", origin);
  console.log("protocol", protocol);
  console.log("host", host);
  if (typeof cookies == "undefined" || !cookies?.token) {
    console.log("fetching cookies");
    isNewToken = true;
    // let response = await fetch(`${origin}/api/getSecret`); 
    let response = await getSecretData();
    if (response.status === 200) {
      const tokenRes = await response.json();
      token = tokenRes.token;
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        domain: ".cloudfront.net",
      };
      const cookieString = cookie.serialize("token", token, cookieOptions);
      context.res.setHeader("Set-Cookie", cookieString);
      console.log("fetched cookies - token", token);
    } else {
      console.log("response", response);
    }
  } else {
    console.log("cookie is present", cookies.token);
    token = cookies.token;
  }
  const { courseUrl } = config;
  const { courseTemplateQueryConstant } = searchConstants;
  // const { headerQueryConstant, footerQueryConstant } = homeConstant;
  let headerData, courseTemplateData, footerData;
  console.log("localtion at search", location);
  console.log("locale at search", locale);

  const headerQuery = contentQuery(HEADER_QUERY_CONSTANT, {}, locale);
  const footerQuery = contentQuery(FOOTER_QUERY_CONSTANT, {}, locale);
  const courseTemplateQuery = contentQuery(
    courseTemplateQueryConstant,
    {},
    locale
  );

  await contentfulFetch(headerQuery)
    .then((res) => {
      headerData = res.navbarCollection.items;
    })
    .catch((err) => {
      console.log("Error", err);
    });

  await contentfulFetch(footerQuery)
    .then((res) => {
      footerData = res.footerCollection.items;
    })
    .catch((err) => {
      console.log("Error", err);
    });

  await contentfulFetch(courseTemplateQuery)
    .then((res) => {
      courseTemplateData = res.coursesTemplateCollection.items;
    })
    .catch((err) => {
      console.log("Error", err);
    });

  const studyLevelValue = studyLevelArray.filter(
    (val) => val.study_level_name == context.query.studyLevel
  );

  searchPayload.key_attributes.search_criteria.subject_keyword = `${
    context.query.course || "Art"
  }`;
  searchPayload.key_attributes.search_criteria.qualification = studyLevelValue;
  let payloadBody = searchPayload;

  let body = JSON.stringify(payloadBody);
  let header = new Headers();
  header.append("authorization_token", token);
  header.append("Content-Type", "application/json");
  let payloadData = {
    method: "POST",
    headers: header,
    body: body,
    redirect: "follow",
  };
  const start = performance.now();
  const res = await addSearchCategory({courseUrl, payloadData});
  const resData = await res.json();
  console.log("resdata from IDP", resData);
  const end = performance.now();
  const responseTime = end - start;
  return {
    props: {
      serverSideData: {
        serverData: resData,
        headerData,
        courseTemplateData,
        footerData,
        responseTime,
        token,
        isNewToken,
        location
      },
    },
  };
}
