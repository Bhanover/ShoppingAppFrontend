import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import "./Home.css";
import TopBar from "../../containers/topBar/TopBar";
import ButtonHome from "../../components/buttonHome/ButtonHome";
const Home = () => (
  <ReactFullpage
    scrollingSpeed={1000}
    render={({ state, fullpageApi }) => {
      return (
        <div className="home">
          <div id="fullpage">
            <div className="section home-image1">
              <ButtonHome nombre="Novedades" />
            </div>
            <div className="section home-categories"></div>
            <div className="section home-image2">
              <ButtonHome nombre="Novedades" />
            </div>
            <div className="section home-image3">
              <ButtonHome nombre="Novedades" />
            </div>
          </div>
        </div>
      );
    }}
  />
);

export default Home;
