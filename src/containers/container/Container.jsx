import { Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Container.css";
import TopBar from "../topBar/TopBar";
import BottomBar from "../bottomBar/BottomBar";
import WhatsAppButton from "../../components/whatssap_button/WhatsAppButton";
import loadGoogleAnalytics from "../cookieBanner/LoadGoogleAnalytics";
import CookieBanner from "../cookieBanner/CookieBanner";

const Container = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(
    !localStorage.getItem("cookiePreferences")
  );

  useEffect(() => {
    const storedPreferences = localStorage.getItem("cookiePreferences");
    const preferences = storedPreferences && JSON.parse(storedPreferences);

    if (preferences && preferences.analytics) {
      loadGoogleAnalytics();
    } else if (preferences === null) {
      setIsVisible(true);
    }
  }, []);

  return (
    <div className="container">
      {/* Barra superior */}
      <div className="container-top">
        <TopBar />
      </div>

      {/* Banner de cookies */}
      {isVisible && (
        <CookieBanner isVisible={isVisible} setIsVisible={setIsVisible} />
      )}

      {/* Contenido principal */}
      <div className="container-outlet">
        <Outlet />
        <div className="container-whatsAppButton">
          <WhatsAppButton />
        </div>
      </div>

      {/* Barra inferior, se muestra si no estamos en la página principal */}
      {location.pathname !== "/" && (
        <div className="container-bottombar">
          <BottomBar />
        </div>
      )}
    </div>
  );
};

export default Container;
