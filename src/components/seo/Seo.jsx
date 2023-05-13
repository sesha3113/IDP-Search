import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types'

export const SEO = ({
  title = "IDP website",
  description = "Study Abroad, Overseas Education Consultant, Get Free Counselling! | IDP India",
  ogType = 'website',
}) => {

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} />
      <meta key="og_type" property="og:type" content={ogType} />
      <meta name="google-site-verification" content="Xtml9NLtI0NDz8DMkF0Jzy13IWMig4bcXkxK9Ey2QeE" />
    </Head>
  );
};

export default SEO;

SEO.propTypes ={
  title: PropTypes.string,
  description: PropTypes.string,
  ogType: PropTypes.string,
}

