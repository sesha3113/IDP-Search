//import { homeConstant } from "../../constants/homeConstants";
import { HEADER_QUERY_CONSTANT } from "../../constants/homeConstants";
import { FOOTER_QUERY_CONSTANT } from "../../constants/homeConstants";
import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { contentQuery } from "@/utils/ContentQuery";
import contentfulFetch from "@/utils/graphqlFetch";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { AppContext } from "@/context/AppContext";
import { utils } from "@/utils/index";
import SEO from "@/components/seo/Seo";
import { localeData } from "@/configs/localeData";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";

const verify = ({ serverData }) => {
  const { headerData, footerData, location } = serverData;
  const router = useRouter();
  const [code, setCode] = useState("");
  const { setLoginType, setIsAuthenticated, setLocationContext, pass, setPass } = useContext(AppContext);
  const { setSessionStorage, getSessionStorage } = utils;

  useEffect(() => {
    setLocationContext(location);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const email = getSessionStorage("email");
      console.log("email jgds", email);
      const user = await Auth.confirmSignUp(email, code);
      const accessToken = user;
      console.log("Access Token:", accessToken);
      setLoginType("cognito-login");
      setIsAuthenticated(true);
      setSessionStorage("token", accessToken);
      setSessionStorage("user", email[0]);
      const users = await Auth.signIn(email, pass);
      const token = users.signInUserSession.accessToken.jwtToken;
      setSessionStorage("Access Token", token);
      setPass('')
      await router.push(`/${location}`);
    } catch (error) {
      console.log("Error verifying user:", error);
    }
  }

  return (
    <>
      <SEO
        title="Study Abroad, Overseas Education Consultant, Get Free Counselling! | IDP India"
        description="Study Overseas Consultants in India - Study abroad with IDP education, we help students to study overseas in Australia, USA, Canada, UK & New Zealand."
      />
      <Layout headerData={headerData} footerData={footerData}>
        <Container>
          <Row className="w-100 justify-content-center p-4">
            <Col md={6} className="bg-white p-4 rounded-lg shadow mt-5">
              <h2 className="text-center mb-2 fw-bold">Verify your email</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formVerificationCode">
                  <Form.Label>Verification code</Form.Label>
                  <Form.Control
                    type="text"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="Enter verification code"
                  />
                </Form.Group>
                <div className="btn-account">
                  <button>Verify</button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default LoadingIndicator(verify);

export async function getServerSideProps(context) {
  let location, locale;
  location = context.query.location || context.req.url.split("/")[1];
  locale = context.query.lang || localeData[`${location}`]?.defaultLocale;
  //const { headerQueryConstant, footerQueryConstant } = homeConstant;

  const headerQuery = contentQuery(HEADER_QUERY_CONSTANT, {}, locale);
  const footerQuery = contentQuery(FOOTER_QUERY_CONSTANT, {}, locale);

  const coursePayload = [headerQuery, footerQuery];

  let [header, footer] = await Promise.allSettled(
    coursePayload.map((payload) =>
      contentfulFetch(payload)
        .then((res) => res)
        .catch((err) => {
          console.log("Error", err);
        })
    )
  );
  let [headerData, footerData] = [
    header.value.navbarCollection.items,
    footer.value.footerCollection.items,
  ];
  return {
    props: {
      serverData: {
        headerData,
        footerData,
        location,
      },
    },
  };
}