import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { RiArrowUpSLine,RiArrowDownSLine } from "react-icons/ri";
import PropTypes from 'prop-types';
import styles from './CollapseCourses.module.scss';


const CollapseComponent = (props) => {
  const [open, setopen] = useState(false);
  return (
    <div className={styles.collapseMain}>
      <div className={styles.collapseBody}>
        <div
          className={`row ${styles.collapseHeader}`}
          onClick={() => setopen(!open)}
        >
          <div className='col-md-11'>
            <h4 className={styles.collapseTitle}>{props.title}</h4>
          </div>
          <div className='col-md-1'>
            {open ? (
              <RiArrowUpSLine size={35} opacity='0.7' />
            ) : (
              <RiArrowDownSLine size={35} opacity='0.7' />
            )}
          </div>
        </div>
        <Collapse in={open}>{props.children}</Collapse>
      </div>
    </div>
  );
}

export default CollapseComponent;

CollapseComponent.propTypes ={
  title: PropTypes.string,
  children :PropTypes.object
}
