import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import PropTypes from 'prop-types';

// import Header from 'nextpoc/header';
// const Header = dynamic(() => import("nextpoc/header"))

const Layout = (props) => {
  const { headerData, children, footerData, location } = props;
  return (
    <div>
      <Header headerData={headerData} location={location}/>
      <div className='layoutBody'> {children} </div>
      <Footer footerData={footerData} />
    </div>
  );
}

export default Layout;

Layout.propTypes = {
  headerData: PropTypes.arrayOf(Object),
  footerData: PropTypes.arrayOf(Object),
  location:PropTypes.string,
  children:PropTypes.any
};
