import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { AppContext } from "../../context/AppContext";
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';

const SearchModal = (prop) => {
  const { modal, setmodal } = prop;
  const [courseKey, setCourseKey] = useState('');
  const [studyLevelKey, setstudyLevelKey] = useState([]);
  const [studyLevelError, setstudyLevelError] = useState(false)
  const [courseError, setcourseError] = useState(false)
  const { locationContext } = useContext(AppContext);

  const studyLevel = [
    { value: 'Doctorate', label: 'Doctorate' },
    { value: 'Postgraduate', label: 'Postgraduate' },
    { value: 'UniversityPreparation', label: 'University Preparation' },
    { value: 'EnglishLanguage', label: 'English Language' },
    { value: 'Undergraduate', label: 'Undergraduate' },
    { value: 'Pre-Degree&Vocational', label: 'Pre-Degree & Vocational' },
    { value: 'Foundation', label: 'Foundation' },
    { value: 'VET', label: 'VET' },
  ];

  const studyLevelCourse = [
    { label: 'Law', value: 'Law' },
    { label: 'Art', value: 'Art' },
    { label: 'Civil', value: 'Civil' },
  ];

  const searchHanduler =()=>{
    if(studyLevelKey.length !== 0 && courseKey){
      Router.push(
        `/${locationContext}/search?course=${courseKey}&studyLevel=${studyLevelKey[0].value}`
      );
      setmodal(false);
      setstudyLevelKey([]);
    }

    studyLevelKey.length === 0 && setstudyLevelError(true)
    !courseKey && setcourseError(true)
    
  }

  const promiseOptions = async (inputValue) =>
    new Promise((resolve) => {
      if (inputValue) {
        resolve(studyLevelCourse);
      } else {
        resolve([]);
      }
    });

  return (
    <>
      <Modal show={modal} onHide={() => setmodal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search for courses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            options={studyLevel}
            isMulti
            className={`${studyLevelError && 'ErrorBorder'}`}
            value={studyLevelKey}
            placeholder='Select study level'
            onChange={(e) => {
              setstudyLevelKey(e);
              console.log(e);
              setstudyLevelError(false)
            }}
          />
          <br />
          <AsyncCreatableSelect
            className={`${courseError && 'ErrorBorder'}`}
            isClearable
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            placeholder='Course subject e.g. law'
            onChange={(val) => {
              setCourseKey(val?.value);
              setcourseError(false)}
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='outline-secondary'
            onClick={() => {
              setmodal(false);
              setstudyLevelKey([]);
            }}
          >
            Close
          </Button>
          <Button
            variant='outline-info'
            onClick={searchHanduler}
          >
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoadingIndicator(SearchModal);

SearchModal.propTypes = {
  modal: PropTypes.bool,
  setmodal: PropTypes.func,
};
