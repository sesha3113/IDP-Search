import React, { useEffect, useContext } from "react";
import CollapseComponent from "../../components/collapseComponent/CollapseCourses";
import CoursesBanner from "../../components/coursesBanner/CoursesBanner";
import FormComponent from "../../components/formComponent/FormComponent";
import Layout from "../../components/layout/Layout";
import { TiTick } from "react-icons/ti";
import { config } from "../../configs/index";
import GuidanceComponent from "../../components/guidanceComponent/GuidanceSection";
import { Col, Row, Container } from "react-bootstrap";
import GalleryComponent from "../../components/galleryComponent/GallerySection";
import contentfulFetch from "../../utils/graphqlFetch";
import SEO from "../../components/seo/Seo";
import { performance } from "perf_hooks";
import {
  criteriaBodyObject,
  galleryBodyObject,
  guidanceBodyObject,
  overviewBodyObject,
  titleBodyObject,
} from "../../payload/coursePayload";
import { contentQuery } from "../../utils/ContentQuery";
// import { courseConstant } from "../../constants/courseConstants";
import {HEADER_QUERY_CONSTANT} from "../../constants/courseConstants";
import {FOOTER_QUERY_CONSTANT} from "../../constants/courseConstants";
import {FORM_QUERY_CONSTANT} from "../../constants/courseConstants";
import { localeData } from "../../configs/localeData";
import { AppContext } from "../../context/AppContext";
import LoadingIndicator from "../../components/loadingIndicator/LoadingIndicator";
import cookie from "cookie";
import Cookies from "js-cookie";
import {getSecretData} from "../../services/global/global.services";
import {addCoursesData} from "../../services/courses/courses.services";

const courses = (props) => {
  const { setLocationContext } = useContext(AppContext);

  const {
    titleComponent,
    overviewComponent,
    criteriaComponet,
    guidanceComponent,
    galleryComponent,
    headerData,
    footerData,
    formData,
    location,
    token,
    isNewToken
  } = props;
  const bannerData = titleComponent.result["app-module-header"].title;
  const overViewDataDescription =
    overviewComponent.result["app-module-content-hub"].overview.description;
  const criteriaData =
    criteriaComponet.result["app-module-criteria"]["start-dates-component"]
      .data;
  const guidanceData = guidanceComponent.result["app-module-article"][
    "destination-based-article-component"
  ].data.slice(0, 6);
  const galleryData = galleryComponent.result["app-module-gallery"][
    "institution-media-carousel-component"
  ].data.slice(0, 6);

  useEffect(() => {
    console.log("isnewtoken:", isNewToken)
    console.log("locaiton", location)
    setLocationContext(location);
    if (isNewToken) {
      console.log("isnewtoken:", isNewToken)
      Cookies.set("token", token, { expires: 1 });
    }
  }, []);

  return (
    <>
      <SEO
        title={`${bannerData.institutionName} - ${bannerData.courseTitle}`}
        description={overViewDataDescription}
      />
      <Layout headerData={headerData} footerData={footerData} location={location}>
        <CoursesBanner bannerData={bannerData} />
        <div className="layout-margin">
          <Container>
            <Row>
              <Col lg={12}>
                <CollapseComponent title="About the course">
                  <div>
                    <p className="content">{overViewDataDescription}</p>
                    <br />
                    <p className="about-list">
                      <TiTick color="green" size={25} /> Scholarships -{" "}
                      <strong className="boldText">
                        View all scholarships
                      </strong>
                    </p>
                    <p className="about-list">
                      <TiTick color="green" size={25} /> Internships
                    </p>
                  </div>
                </CollapseComponent>
                <CollapseComponent title="Start dates and prices">
                  <div>
                    <p>
                      Course fees are indicative and should be used as a guide.{" "}
                      <strong className="boldText">
                        Speak to a counsellor
                      </strong>{" "}
                      to get an accurate price.
                    </p>
                    <table>
                      <thead>
                        <tr className="tableHead">
                          <th className="tablecontent">intake</th>
                          <th className="tablecontent">location</th>
                          <th className="tablecontent">duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {criteriaData.length !== 0 &&
                          criteriaData.map((ctria, index) => (
                            <tr key={index} className="tableHead">
                              <td className="tablecontent">
                                {ctria.commencement_date}
                              </td>
                              <td className="tablecontent boldText">
                                {ctria.campusName}
                              </td>
                              <td className="tablecontent">
                                {ctria.duration_of_study}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CollapseComponent>
                <CollapseComponent title="Guidance">
                  <div className="layout-margin px-0">
                    <Row>
                      {guidanceData.map((guidance, index) => (
                        <Col
                          key={index}
                          className="marginBottom20"
                          md={4}
                          sm={12}
                        >
                          <GuidanceComponent guidance={guidance} />
                        </Col>
                      ))}
                    </Row>
                  </div>
                </CollapseComponent>
                <CollapseComponent title="Gallery">
                  <div className="layout-margin px-0">
                    <strong>University Gallery</strong>
                    <br />
                    <Row>
                      {galleryData.map((gallery) => (
                        <>
                          {gallery.externalMimeType === "Image" && (
                            <Col className="marginBottom20" md={4} sm={12}>
                              <GalleryComponent gallery={gallery} />
                            </Col>
                          )}
                        </>
                      ))}
                    </Row>
                  </div>
                </CollapseComponent>
                <CollapseComponent title="Recommended courses">
                  <div className="collapse-show-content">
                    <p className="content">
                      Students who applied for this course also applied for the
                      courses below. If you want to widen your search, you can
                      view all courses in Law here.
                    </p>
                  </div>
                </CollapseComponent>
                <CollapseComponent title="About The University of Southern Queensland (UniSQ)">
                  <div className="collapse-show-content">
                    <strong>CRICOS code: 088073M</strong>
                    <ui style={{ listStyleType: "none" }}>
                      <li className="content">
                        More about The University of Southern Queensland (UniSQ)
                      </li>
                      <li className="content">
                        Calculate your cost of living in Australia
                      </li>
                    </ui>
                  </div>
                </CollapseComponent>
              </Col>
            </Row>
          </Container>
        </div>

        <FormComponent courses formComponentData={formData} />
        <Container>
          <Row>
            <Col lg={8} className="m-auto">
              <div className="courseContextMain">
                <p className="courseContext-course-banner mt-4">
                  To find out more about the information shown here – read about
                  How we collect and display course information. IDP assumes no
                  responsibility or liability for any errors or omissions in the
                  content of this site. We always recommend that you speak to an
                  IDP counsellor to get the latest and most accurate advice.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default LoadingIndicator(courses);

export async function getServerSideProps(context) {
  let location, locale, token, isNewToken = false;
  location = context.query.location || context.req.url.split("/")[1];
  if( Object.keys(localeData).includes(location)) {
    locale = context.query.lang || localeData[`${location}`]?.defaultLocale;
  }
  const { req } = context;
  console.log("localtion at course", location);
  console.log("locale at search", locale);
  console.log("context", context);
  console.log("is url location is present in localedata", Object.keys(localeData).includes(location))
  // const {
  //   HEADER_QUERY_CONSTANT,
  //   FOOTER_QUERY_CONSTANT,
  //   formComponentQueryConstant,
  // } = courseConstant;

  const { courseUrl } = config;
  // const origin = `https://ui.htcpoc.com`;
  const cookies = cookie.parse(req.headers.cookie || "");
  if (typeof cookies == "undefined" || !cookies?.token) {
    console.log("fetching cookies");
    isNewToken = true;
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
  let headerData, footerData, formData;
  const headerQuery = contentQuery(HEADER_QUERY_CONSTANT, {}, locale);
  const formQuery = contentQuery(FORM_QUERY_CONSTANT, {}, locale);
  const footerQuery = contentQuery(FOOTER_QUERY_CONSTANT, {}, locale);

  await contentfulFetch(headerQuery)
    .then((res) => {
      headerData = res.navbarCollection.items;
    })
    .catch((err) => {
      console.log("Error", err);
    });

  await contentfulFetch(formQuery)
    .then((res) => {
      formData = res.homeFormComponentCollection.items;
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

  let header = new Headers();
  header.append("authorization_token", token);
  header.append("Content-Type", "application/json");

  titleBodyObject.key_attributes.course_id = `${
    context.query.key || "PRG-CA-00295474"
  }`;

  let titleBody = JSON.stringify(titleBodyObject);

  overviewBodyObject.key_attributes.course_id = `${
    context.query.key || "PRG-CA-00295474"
  }`;

  let overviewBody = JSON.stringify(overviewBodyObject);
  criteriaBodyObject.key_attributes.course_id = `${
    context.query.key || "PRG-CA-00295474"
  }`;
  let criteriaBody = JSON.stringify(criteriaBodyObject);

  guidanceBodyObject.key_attributes.course_id = `${
    context.query.key || "PRG-CA-00295474"
  }`;
  guidanceBodyObject.key_attributes.article_id = `${
    context.query.key || "PRG-CA-00295474"
  }`;

  let guidanceComponent = JSON.stringify(guidanceBodyObject);

  galleryBodyObject.key_attributes.course_id = `${
    context.query.key || "PRG-CA-00295474"
  }`;

  let galleryComponent = JSON.stringify(galleryBodyObject);

  var payloadTitle = {
    method: "POST",
    headers: header,
    body: titleBody,
    redirect: "follow",
  };

  var payloadOverview = {
    method: "POST",
    headers: header,
    body: overviewBody,
    redirect: "follow",
  };

  var payloadCriteria = {
    method: "POST",
    headers: header,
    body: criteriaBody,
    redirect: "follow",
  };

  var payloadGuidance = {
    method: "POST",
    headers: header,
    body: guidanceComponent,
    redirect: "follow",
  };

  var payloadGallery = {
    method: "POST",
    headers: header,
    body: galleryComponent,
    redirect: "follow",
  };

  const coursePayload = [
    payloadTitle,
    payloadOverview,
    payloadCriteria,
    payloadGuidance,
    payloadGallery,
  ];
  const start = performance.now();
  let [resHeader, resOverView, resCriteria, resGuidance, resGallery] =
    await Promise.allSettled(
      coursePayload.map((payload) =>
         addCoursesData({courseUrl, payload})
        .then((res) => res.json())
      )
    );
  const end = performance.now();
  const responseTime = end - start;

  return {
    props: {
      titleComponent: resHeader.value,
      overviewComponent: resOverView.value,
      criteriaComponet: resCriteria.value,
      guidanceComponent: resGuidance.value,
      galleryComponent: resGallery.value,
      headerData,
      footerData,
      formData,
      responseTime,
      location,
      token,
      isNewToken
    },
  };
}
