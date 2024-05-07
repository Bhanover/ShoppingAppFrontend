import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./Container.css";
import TopBar from "../topBar/TopBar";
import BottomBar from "../bottomBar/BottomBar";

const Container = () => {
  const location = useLocation();

  useEffect(() => {
    // Cada vez que cambia la ruta, se desplaza la ventana al inicio de la página
    window.scrollTo(0, 0);
  }, [location.pathname]); // Dependencia del efecto: el pathname de la ubicación

  return (
    <div className="container">
      <div className="container-top">
        <TopBar />
      </div>
      <div className="container-outlet">
        <Outlet />
      </div>
      {location.pathname !== "/home" && (
        <div className="container-bottombar">
          <BottomBar />
        </div>
      )}
    </div>
  );
};

export default Container;
