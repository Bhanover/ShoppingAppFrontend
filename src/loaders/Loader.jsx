import { ThreeCircles } from "react-loader-spinner";
import "./Loader.css";
const Loader = () => (
  <div className="loader">
    <ThreeCircles
      height="20"
      width="20"
      color="white"
      outerCircleColor="#cccccc"
      innerCircleColor="#aaaaaa"
      middleCircleColor="#888888"
    />
  </div>
);

export default Loader;
