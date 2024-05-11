import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import "./LoaderInfinite.css";
const LoaderInfinite = () => {
  return (
    <div className="loader-infinite">
      <ThreeCircles
        wrapperStyle={{}}
        wrapperClass="loader-infinite-wrapper"
        visible={true}
        ariaLabel="three-circles-rotating"
        height="35"
        width="35"
        outerCircleColor="#cccccc"
        innerCircleColor="#aaaaaa"
        middleCircleColor="#888888"
      />
    </div>
  );
};

export default LoaderInfinite;
