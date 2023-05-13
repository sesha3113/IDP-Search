//import { homeConstant } from "../../constants/homeConstants";
import { HEADER_QUERY_CONSTANT } from "../../constants/homeConstants";
import { FOOTER_QUERY_CONSTANT } from "../../constants/homeConstants";
import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { contentQuery } from "@/utils/ContentQuery";
import contentfulFetch from "@/utils/graphqlFetch";
import Layout from "@/components/layout/Layout";
import { Auth } from 'aws-amplify';
import { AppContext } from "@/context/AppContext";
import { utils } from "@/utils/index";
import logo from "@/assets/images/idp-logo.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import SEO from '@/components/seo/Seo';
import { localeData } from "@/configs/localeData";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";


const login = ({ serverData }) => {
    const { headerData, footerData, location } = serverData;
    const router = useRouter();
    const { setIsAuthenticated, setLoginType, setLocationContext } = useContext(AppContext);
    const { setSessionStorage } = utils;
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const user = await Auth.signIn(data.email, data.password);
            const accessToken = user.signInUserSession.accessToken.jwtToken;
            console.log('Access Token:', accessToken);
            setLoginType('cognito-login')
            setIsAuthenticated(true);
            setSessionStorage("token", accessToken);
            setSessionStorage("user", data.email[0]);
            await router.push(`/${location}`);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        setLocationContext(location)
    }, [])
    

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
                            <div className='signin-contant'>
                                <div className='signin-image'>
                                    <Image alt="logo" src={logo} width={240} height={57} />
                                </div>
                                <h3>IDP has been helping international students for over 50 years</h3>
                                <h4>Our full suite of student placement services and support is available to you</h4>
                                <ul>
                                    <li>Supporting you in every step of your study abroad journey</li>
                                    <li>Approachable international education experts</li>
                                    <li>Get instant offer with IDP FastLane</li>
                                    <li>Proud co-owners of IELTS</li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={6} sm={12} className="my-5">
                            <div className='signin-form signup-form'>
                                <h4>Sign up using your email</h4>
                                <p className='text-center'>If you are new to IDP, <span className="signInSwitch" onClick={() => router.push(`/${location}/registration`)}>create your profile.</span></p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col lg={12}>
                                            <div className='input-div'>
                                                <input
                                                    {...register("email", { required: true })}
                                                    type="email"
                                                    placeholder='Email Address'
                                                />
                                                {errors.email?.type === 'required' && <p className='error'>Email Address is required</p>}
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className='input-div'>
                                                <input
                                                    {...register("password", { required: true })}
                                                    type="password"
                                                    placeholder='Enter Password'
                                                />
                                                {errors.password?.type === 'required' && <p className='error'>Enter Password is required</p>}
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className='input-div btn-account'>
                                                <button>Sign In</button>
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

export default LoadingIndicator(login);

export async function getServerSideProps(context) {
    let location, locale;
    location = context.query.location || context.req.url.split('/')[1];
    locale = context.query.lang || localeData[`${location}`]?.defaultLocale;
    console.log("localtion at login", location)
    console.log("locale at login", locale)
    console.log("context", context)
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
                location
            },
        },
    };
}
