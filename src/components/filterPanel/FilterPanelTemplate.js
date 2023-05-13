import React, { useState, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './FilterPanelTemplate.module.scss';
import {
  studyLevelCourse,
  studyLevelProps,
  studyLevelProps1,
  DestinationCountries,
  DestinationCountries1,
  institutionsToShow,
  institutionsToShow1,
  institutionsToShowAll,
  institutionsToShowAll1,
  citiesToShow,
  citiesToShow1,
  citiesToShowAll,
  citiesToShowAll1,
} from '../../constants/searchConstants';
import { AppContext } from "@/context/AppContext";


const FilterPanel = (prop) => {
  const Router = useRouter();
  const { locationContext } = useContext(AppContext);

  const {
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
  } = prop;
  const [showCities, setshowCities] = useState(false);
  const [showInstitutions, setshowInstitutions] = useState(false);


  return (
    <>
      <div className={styles.filtersPannelMain}>
        <div className={styles.filterPannelFilters}>
          <Row className={styles.filterRow}>
            <Col className={styles.filterCol}>
              <h3 className={styles.filterHeader}>Filter Courses</h3>
            </Col>
            <Col className={styles.filterCol}>
              <p className={styles.filterStart}>Start a new search</p>
            </Col>
          </Row>
          <div className={styles.scrollWrapper}>
            <div className={styles.filterWrapperNoBorder}>
              <h5 className={styles.filterSubject}>Subject area</h5>
              <select
                onChange={(e) =>
                  applyfiltersApi(e.target.value, studyLevelCheck, '')
                }
                className={styles.selectCourse}
              >
                {studyLevelCourse.map((crse, index) => (
                  <option
                    key={index}
                    selected={courseType == crse.value}
                    value={crse.value}
                    className={styles.selectCourseOption}
                  >
                    {crse.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.filterWrapper}>
              <h5 className={styles.filterSubject}>Specific subject area</h5>
              <div className={styles.checkBoxWrapper}>
                <div className={styles.filterContentKey}>
                  <label className={styles.container}>
                    <span className='mx-3'>Law</span>
                    <input type='checkbox' />
                    <span className={styles.checkmark}></span>
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.filterWrapper}>
              <h5 className={styles.filterSubject}>Study Level</h5>
              <div className={styles.checkBoxWrapper}>
                <Row className={styles.filterOptionRow}>
                  <Col>
                    {studyLevelProps.map((dta) => (
                      <div className={styles.filterContentKey} key={dta.key}>
                        <label className={styles.container}>
                          <span className='mx-3'>{dta.value}</span>
                          <input
                            value={studyLevelCheck}
                            onChange={() =>
                              applyfiltersApi(courseType, dta.key, '')
                            }
                            checked={studyLevelCheck == dta.key}
                            name='studylevel'
                            type='radio'
                          />
                          <span className={styles.checkmark}></span>
                        </label>
                      </div>
                    ))}
                  </Col>
                  <Col>
                    {studyLevelProps1.map((dta) => (
                      <div className={styles.filterContentKey} key={dta.key}>
                        <label className={styles.container}>
                          <span className='mx-3'>{dta.value}</span>
                          <input
                            value={studyLevelCheck}
                            onChange={() =>
                              applyfiltersApi(
                                courseType,
                                dta.key,
                                ''
                              )
                            }
                            checked={studyLevelCheck == dta.key}
                            name='studylevel'
                            type='radio'
                          />
                          <span className={styles.checkmark}></span>
                        </label>
                      </div>
                    ))}
                  </Col>
                </Row>
              </div>
            </div>
            <div className={styles.filterWrapper}>
              <h5 className={styles.filterSubject}>Study destination</h5>
              <div className={styles.checkBoxWrapper}>
                <Row className={styles.filterOptionRow}>
                  <Col>
                    {DestinationCountries.map((dta) => (
                      <div className={styles.filterContentKey} key={dta.key}>
                        <label className={styles.container}>
                          <span className='mx-3'>
                            {dta.destination_country}
                          </span>
                          <input
                            onChange={() =>
                              applyfiltersApi(courseType, studyLevelCheck, dta)
                            }
                            type='checkbox'
                          />
                          <span className={styles.checkmark}></span>
                        </label>
                      </div>
                    ))}
                  </Col>
                  <Col>
                    {DestinationCountries1.map((dta) => (
                      <div className={styles.filterContentKey} key={dta.key}>
                        <label className={styles.container}>
                          <span className='mx-3'>
                            {dta.destination_country}
                          </span>
                          <input
                            onChange={() =>
                              applyfiltersApi(courseType, studyLevelCheck, dta)
                            }
                            type='checkbox'
                          />
                          <span className={styles.checkmark}></span>
                        </label>
                      </div>
                    ))}
                  </Col>
                </Row>
              </div>
            </div>
            <div className={styles.filterWrapper}>
              <h5 className={styles.filterSubject}>Study mode</h5>
              <div className={styles.checkBoxWrapper}>
                <div className={styles.filterContentKey}>
                  <label className={styles.container}>
                    <span className='mx-3'>On campus study</span>
                    <input type='checkbox' />
                    <span className={styles.checkmark}></span>
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.filterWrapper}>
              <h5 className={styles.filterSubject}>Course fee range</h5>
              <div className={styles.checkBoxWrapper}>
                <div className={styles.filterContentKey}>
                  <span className={styles.BrownColor}>From $0 to $50000+</span>
                  <br />
                </div>
              </div>
            </div>
            <div className={styles.filterWrapper}>
              <h5 className={styles.filterSubject}>Cities</h5>
              <div className={styles.checkBoxWrapper}>
                <Row className={styles.filterOptionRow}>
                  <Col>
                    {showCities
                      ? citiesToShowAll.map((dta) => (
                          <div
                            className={styles.filterContentKey}
                            key={dta.key}
                          >
                            <label className={styles.container}>
                              <span className='mx-3'>{dta.value}</span>
                              <input type='checkbox' />
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        ))
                      : citiesToShow.map((dta) => (
                          <div
                            className={styles.filterContentKey}
                            key={dta.key}
                          >
                            <label className={styles.container}>
                              <span className='mx-3'>{dta.value}</span>
                              <input type='checkbox' />
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        ))}
                  </Col>
                  <Col>
                    {showCities
                      ? citiesToShowAll1.map((dta) => (
                          <div
                            className={styles.filterContentKey}
                            key={dta.key}
                          >
                            <label className={styles.container}>
                              <span className='mx-3'>{dta.value}</span>
                              <input type='checkbox' />
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        ))
                      : citiesToShow1.map((dta) => (
                          <div
                            className={styles.filterContentKey}
                            key={dta.key}
                          >
                            <label className={styles.container}>
                              <span className='mx-3'>{dta.value}</span>
                              <input type='checkbox' />
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        ))}
                  </Col>
                </Row>
                <div
                  className={styles.showCitiesBtn}
                  onClick={() => setshowCities(!showCities)}
                >
                  Show more &nbsp;{' '}
                  {showCities ? (
                    <RiArrowUpSLine size={25} opacity='0.7' />
                  ) : (
                    <RiArrowDownSLine size={25} opacity='0.7' />
                  )}
                </div>
              </div>
            </div>

            <div className={styles.filterWrapper}>
              <h5 className={styles.filterSubject}>Courses with FastLane</h5>
              <div className={styles.checkBoxWrapper}>
                <div className={styles.filterContentKey}>
                  <span className={`mx-3 ${styles.BrownColor}`}>
                    instant Offer
                  </span>
                  <br />
                </div>
              </div>
            </div>
            <div className={styles.filterWrapper}>
              <h5 className={styles.filterSubject}>institution</h5>
              <div className={styles.checkBoxWrapper}>
                <Row className={styles.filterOptionRow}>
                  <Col>
                    {showInstitutions
                      ? institutionsToShowAll.map((dta) => (
                          <div
                            className={styles.filterContentKey}
                            key={dta.key}
                          >
                            <label className={styles.container}>
                              <span className='mx-3'>{dta.value}</span>
                              <input type='checkbox' />
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        ))
                      : institutionsToShow.map((dta) => (
                          <div
                            className={styles.filterContentKey}
                            key={dta.key}
                          >
                            <label className={styles.container}>
                              <span className='mx-3'>{dta.value}</span>
                              <input type='checkbox' />
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        ))}
                  </Col>
                  <Col>
                    {showInstitutions
                      ? institutionsToShowAll1.map((dta) => (
                          <div
                            className={styles.filterContentKey}
                            key={dta.key}
                          >
                            <label className={styles.container}>
                              <span className='mx-3'>{dta.value}</span>
                              <input type='checkbox' />
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        ))
                      : institutionsToShow1.map((dta) => (
                          <div
                            className={styles.filterContentKey}
                            key={dta.key}
                          >
                            <label className={styles.container}>
                              <span className='mx-3'>{dta.value}</span>
                              <input type='checkbox' />
                              <span className={styles.checkmark}></span>
                            </label>
                          </div>
                        ))}
                  </Col>
                </Row>
                <div
                  className={styles.showCitiesBtn}
                  onClick={() => setshowInstitutions(!showInstitutions)}
                >
                  Show more &nbsp;{' '}
                  {showInstitutions ? (
                    <RiArrowUpSLine size={25} opacity='0.7' />
                  ) : (
                    <RiArrowDownSLine size={25} opacity='0.7' />
                  )}
                </div>
              </div>
            </div>
          </div>

          <Row className={styles.filterRowfFooter}>
            <Col className={styles.filterCol}>
              <p className={styles.matchedResults}>
                {matchedResults || ' matched results'}
              </p>
            </Col>
            <Col className={styles.filterCol}>
              <button
                className={styles.filterButton}
                onClick={() => {
                  setstudyLevelCheck(Router.query.studyLevel);
                  setcourseType(Router.query.course);
                  setmatchedResults(
                    serverData?.result['app-module-header']['no-of-results']
                      .overAllCourseCount
                  );
                  setOpen(!open);
                }}
              >
                Cancel
              </button>{' '}
              &nbsp;&nbsp;
              <button
                className='idp-primary-btn-manual'
                onClick={() => {
                  Router.push(
                    `/${locationContext}/search?course=${courseType}&studyLevel=${studyLevelCheck}`
                  );
                  setOpen(!open);
                }}
              >
                Apply filters
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;

FilterPanel.propTypes = {
  courseType: PropTypes.object,
  setcourseType: PropTypes.func,
  studyLevelCheck: PropTypes.string,
  setstudyLevelCheck: PropTypes.func,
  matchedResults: PropTypes.string,
  applyfiltersApi: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setmatchedResults: PropTypes.func,
  serverData: PropTypes.object,
};
