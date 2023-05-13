import { localeData } from "../../configs/localeData";
import React from "react";
import styles from "../header/Header.module.scss";
import { useRouter } from "next/router";

const LocationOptions = () => {
    const router = useRouter();
  return (
    <>
      {Object.keys(localeData).map(function (location, index) {
        return (
          <div
            role="button"
            className={`${styles.localOptions} text-capitalize`}
            key={index}
            onClick={() => {
              router.push(`/${location}`);
            }}
          >
            {location}
          </div>
        );
      })}
    </>
  );
};

export default LocationOptions;
