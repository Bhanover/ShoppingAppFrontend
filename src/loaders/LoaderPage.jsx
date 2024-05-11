import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import "./LoaderPage.css";

const LoaderPage = () => {
  return (
    <div className="loader-page">
      <ThreeCircles
        height="80"
        width="80"
        color="#ffffff"
        wrapperStyle={{ justifyContent: "center" }}
        wrapperClass="loader-wrapper"
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#cccccc"
        innerCircleColor="#aaaaaa"
        middleCircleColor="#888888"
      />
    </div>
  );
};

export default LoaderPage;
