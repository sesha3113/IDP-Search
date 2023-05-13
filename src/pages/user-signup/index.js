import React, { useContext, useEffect } from "react";
//import { homeConstant } from "../../constants/homeConstants";
import { HEADER_QUERY_CONSTANT } from "../../constants/homeConstants";
import { FOOTER_QUERY_CONSTANT } from "../../constants/homeConstants";
import Layout from "@/components/layout/Layout";
import { contentQuery } from "@/utils/ContentQuery";
import contentfulFetch from "@/utils/graphqlFetch";
import IframeSignup from "@/components/iframeSignup/IframeSignUp";
import { localeData } from "@/configs/localeData";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";
import { AppContext } from "@/context/AppContext";
import PropTypes from 'prop-types'

const Signup = ({ serverData }) => {
  const { headerData, footerData, location } = serverData;
  const { setLocationContext } = useContext(AppContext);
  
  useEffect(() => {
    setLocationContext(location);
  }, [])
  

  return (
    <>
      <Layout headerData={headerData} footerData={footerData}>
        <IframeSignup />
      </Layout>
    </>
  );
};

export default LoadingIndicator(Signup);


Signup.propTypes ={
  serverData: PropTypes.object,
}

export async function getServerSideProps(context) {
  let location, locale;
  location = context.query.location || context.req.url.split('/')[1];
  locale = context.query.lang || localeData[`${location}`]?.defaultLocale;
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
