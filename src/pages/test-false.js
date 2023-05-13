import dynamic from "next/dynamic";
import React from "react";
const TestComp = dynamic(() => import("nextpoc/TestComp"), {
  ssr: false,
});

// import TestComp from 'nextpoc/TestComp'

// eslint-disable-next-line react/prop-types
const Test = ({data}) => {
    console.log(data)
  return (
    <>
      server data == {data}
      <br />
      <TestComp />
    </>
  );
};

export async function getServerSideProps() {
  var data = 'data'
  return {
    props: {
      data
    },
  };
}

export default Test;
