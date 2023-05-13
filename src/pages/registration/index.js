//import { homeConstant } from "../../constants/homeConstants";
import { HEADER_QUERY_CONSTANT } from "../../constants/homeConstants";
import { FOOTER_QUERY_CONSTANT } from "../../constants/homeConstants";
import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { contentQuery } from "@/utils/ContentQuery";
import contentfulFetch from "@/utils/graphqlFetch";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import CryptoJS from "crypto-js";
import logo from "@/assets/images/idp-logo.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import SEO from "@/components/seo/Seo";
import { localeData } from "@/configs/localeData";
import { utils } from "@/utils/index";
import { AppContext } from "@/context/AppContext";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";

const registration = ({ serverData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { headerData, footerData, location } = serverData;
  const { setLocationContext, setPass } = useContext(AppContext);
  useEffect(() => {
    setLocationContext(location);
  }, []);

  const router = useRouter();
  const { setSessionStorage } = utils;

  const onSubmit = async (data) => {
    const enEmail = CryptoJS.SHA256(data.email);
    console.log(`SHA256 Email Encryption: ${enEmail}`);
    try {
      await Auth.signUp({
        username: data.email,
        password: data.password,
        attributes: {
          email: data.email,
          name: enEmail.toString(),
        },
      });
      console.log(
        "Sign up successful! Please check your email to verify your account."
      );
      setSessionStorage("email", data.email);
      setPass(data.password);
      await router.push(`/${location}/verify`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <SEO
        title="Study Abroad, Overseas Education Consultant, Get Free Counselling! | IDP India"
        description="Study Overseas Consultants in India - Study abroad with IDP education, we help students to study overseas in Australia, USA, Canada, UK & New Zealand."
      />
      <Layout headerData={headerData} footerData={footerData}>
        <Container>
          <Row>
            <Col lg={6} sm={12} className="mt-5">
              <div className="signin-contant">
                <div className="signin-image">
                  <Image alt="logo" src={logo} width={240} height={57} />
                </div>
                <h3>
                  IDP has been helping international students for over 50 years
                </h3>
                <h4>
                  Our full suite of student placement services and support is
                  available to you
                </h4>
                <ul>
                  <li>
                    Supporting you in every step of your study abroad journey
                  </li>
                  <li>Approachable international education experts</li>
                  <li>Get instant offer with IDP FastLane</li>
                  <li>Proud co-owners of IELTS</li>
                </ul>
              </div>
            </Col>
            <Col lg={6} sm={12} className="my-5">
              <div className="signin-form">
                <h4>Sign up using your email</h4>
                <p className="text-center">
                  Already have an IDP profile?
                  <span
                    className="signInSwitch"
                    onClick={() => router.push(`/${location}/login`)}
                  >
                     sign in.
                  </span>
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col lg={6}>
                      <div className="input-div">
                        <input
                          {...register("firstName", { required: true })}
                          type="text"
                          placeholder="First Name"
                        />
                        {errors.firstName?.type === "required" && (
                          <p className="error">First name is required</p>
                        )}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="input-div">
                        <input
                          {...register("LastName", { required: true })}
                          type="text"
                          placeholder="Last Name"
                        />
                        {errors.LastName?.type === "required" && (
                          <p className="error">Last name is required</p>
                        )}
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="input-div">
                        <input
                          {...register("mobile", { required: true })}
                          type="text"
                          placeholder="Mobile Number"
                        />
                        {errors.mobile?.type === "required" && (
                          <p className="error">Mobile Number is required</p>
                        )}
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="input-div">
                        <input
                          {...register("email", { required: true })}
                          type="email"
                          placeholder="Email Address"
                        />
                        {errors.email?.type === "required" && (
                          <p className="error">Email Address is required</p>
                        )}
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="input-div">
                        <input
                          {...register("password", { required: true })}
                          type="password"
                          placeholder="Enter Password"
                        />
                        {errors.password?.type === "required" && (
                          <p className="error">Enter Password is required</p>
                        )}
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label">
                          I agree to IDPs terms and conditions and privacy
                          policy
                        </label>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="input-div btn-account">
                        <button>Create An Account</button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default LoadingIndicator(registration);

export async function getServerSideProps(context) {
  let location, locale;
  location = context.query.location || context.req.url.split("/")[1];
  locale = context.query.lang || localeData[`${location}`]?.defaultLocale;
  console.log("localtion at register", location);
  console.log("locale at register", locale);
  // const { headerQueryConstant, footerQueryConstant } = homeConstant;

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