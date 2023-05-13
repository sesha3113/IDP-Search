import React, { useState, useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../../assets/images/idp-logo.svg";
import { GoLocation } from "react-icons/go";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsSearch, BsPerson } from "react-icons/bs";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./Header.module.scss";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import MenuHover from "../menuHover/MenuHover";
import { AppContext } from "../../context/AppContext";
import { utils } from "../../utils/index";
import { Auth } from "aws-amplify";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LocationOptions from "../locationOptions/LocationOptions";
import Dropdown from "react-bootstrap/Dropdown";
import { localeData } from "../../configs/localeData";

const SearchModal = dynamic(() => import("../searchModal/SearchModal"), {
  ssr: false,
});

const Header = ({ headerData, location }) => {
  const router = useRouter();
  const [modal, setmodal] = useState(false);
  const [showLocaleOption, setShowLocaleOption] = useState(false);
  const [showSigninOption, setShowSigninOption] = useState(false);
  const {
    setLoginType,
    isAuthenticated,
    setIsAuthenticated,
    setIsLogout,
    loginType,
    locationContext
  } = useContext(AppContext);
  const { getSessionStorage, clearSessionStorage } = utils;
  useEffect(() => {
    console.log("location at header", location)
  }, [location])
  
  const localeOptions = location != "_next" && localeData[`${location}`]?.localeOptions

  const logout = () => {
    Auth.signOut()
      .then(() => {
        console.log("User signed out");
        localStorage.clear();
      })
      .catch((error) => console.log("Error signing out", error));
    setIsAuthenticated(false);
    clearSessionStorage("token");
    clearSessionStorage("Access Token");
    clearSessionStorage("email");
    clearSessionStorage("user");
    router.push(`/${locationContext}/login`);
  };

  return (
    <div className={styles.headerWidth}>
      <nav className={styles.header}>
        <Row className={styles.headerRow}>
          <Col sm={12} md={3} className={styles.headerLogo}>
            <a href={`/${locationContext}`}>
              <div className={styles.headerLogo}>
                <Image alt="logo" src={logo} width={240} height={57} />
              </div>
            </a>
          </Col>
          <Col sm={12} md={3} lg={5} className={styles.headerSearch}>
            <div className="position-relative">
              <input
                className={styles.searchTag}
                placeholder={`Search courses, universities or scholarships`}
                onClick={() => setmodal(true)}
              />
              <BsSearch size={15} className={styles.searchBtnIcon} />
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} className={styles.headerLinks}>
            <div>
              <ul className={styles.interaction}>
                <li className={`${styles.interactionLinks} interactionLinksIconC`}>
                  <span>
                    <AiOutlineCalendar color="#717583" size={30} />
                  </span>{" "}
                  &nbsp;Events
                </li>
                <li
                 className={`${styles.interactionLinks} interactionLinksIconS`}
                  onMouseEnter={() => setShowLocaleOption(true)}
                  onMouseLeave={() => setShowLocaleOption(false)}
                >
                  <span>
                    <GoLocation color="#717583" size={30} />
                  </span>
                  &nbsp; Find us
                  {showLocaleOption && (
                    <MenuHover>
                      <div className={`text-start p-3`}>
                        <p className="fw-bold"> Other IDP websites </p>
                        <div className="ms-2">
                          <LocationOptions />
                        </div>
                      </div>
                    </MenuHover>
                  )}
                </li>
                <li className="position-relative">
                  <button
                    className={`${styles.buttonHeader} ${styles.buttonHeaderHover} d-flex align-items-center`}
                    onMouseEnter={() => setShowSigninOption(true)}
                    onMouseLeave={() => setShowSigninOption(false)}
                  >
                    <BsPerson size={25}></BsPerson>
                    {!isAuthenticated ? (
                      <span className="ms-1">
                      Login Options
                      </span>
                    ) : (
                      <span className="ms-1">{getSessionStorage("user")}</span>
                    )}
                    {showSigninOption && (
                      <MenuHover>
                        {!isAuthenticated ? (
                          <div className={`text-start p-3`}>
                            <p
                              className={`fw-bold ${styles.signupOptionsHeader}`}
                            >
                              Login Options
                            </p>
                            <div className="ms-2">
                              <div
                                role="button"
                                className={`${styles.signupOptions} ${styles.signupOptionsHover}`}
                                onClick={() => {
                                  setLoginType("iframe-login");
                                  router.push(`/${locationContext}/user-signup`);
                                }}
                              >
                                iFrame Login
                              </div>
                              <div
                                role="button"
                                className={`${styles.signupOptions} ${styles.signupOptionsHover}`}
                                onClick={() => {
                                  setLoginType("cognito-login");
                                  router.push(`/${locationContext}/login`);
                                }}
                              >
                                Login
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={`text-start p-3`}>
                            <div className="ms-2">
                              {loginType === "iframe-login" && (
                                <div
                                  role="button"
                                  className={styles.signupOptions}
                                  onClick={() => {
                                    router.push(`/${locationContext}/user-signup`);
                                  }}
                                >
                                  Profile
                                </div>
                              )}
                              <div
                                role="button"
                                className={styles.signupOptions}
                                onClick={() => {
                                  if (loginType === "iframe-login") {
                                    setIsLogout(true);
                                  } else logout();
                                }}
                              >
                                Logout
                              </div>
                            </div>
                          </div>
                        )}
                      </MenuHover>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </nav>
      <div className={styles.linksHeader}>
        <Navbar collapseOnSelect expand="lg" className="w-100 bg-color-header">
          <Container className="container-bg-color">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                {headerData && headerData.map((nav, index) => (
                  <Nav.Link
                    key={index}
                    href={nav.navbarUrl}
                    className={`${styles.linksLi} ${styles.linksListLi}`}
                  >
                    {nav.navbarTitle}
                  </Nav.Link>
                ))}
              </Nav>
            </Navbar.Collapse>
            {localeOptions && Object.keys(localeOptions).length > 1 && (
              <Dropdown className="nav-dropdown-local">
                <Dropdown.Toggle variant="Secondary" id="locale-dropdown" active >
                  Locale
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-bg-items">
                  {Object.keys(localeOptions).map(function (language, index) {
                    return (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          router.push({
                            pathname: `/${location}`,
                            query: {
                              lang: localeOptions[language],
                            },
                          });
                        }}
                      >
                        {language}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Container>
        </Navbar>
      </div>
      {modal && <SearchModal modal={modal} setmodal={setmodal} />}
    </div>
  );
}

export default Header;

Header.propTypes = {
  headerData: PropTypes.arrayOf(Object),
  location :PropTypes.string
};
