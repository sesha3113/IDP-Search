import React from "react";
import PropTypes from 'prop-types';

const MenuHover = ({children}) => {
  return (
    <>
      <div className={`position-absolute localeDropdown`}>
        <span className={`arrowUp position-absolute`}></span>
        {children}
      </div>
    </>
  );
};

export default MenuHover;

MenuHover.propTypes = {
  children:PropTypes.any
};


