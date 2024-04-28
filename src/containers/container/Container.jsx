import { Outlet } from "react-router-dom";

import "./Container.css";
import TopBar from "../topBar/TopBar";

const Container = () => {
  return (
    <div className="container">
      <div className="container-top">
        <TopBar />
      </div>
      <div className="container-outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
