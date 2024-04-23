import { ThreeCircles } from "react-loader-spinner";

const Loader = () => (
  <div className="loader">
    <ThreeCircles
      loading={true}
      width="15px"
      height="15px"
      color="rgb(244, 88, 168)"
    />
  </div>
);

export default Loader;
