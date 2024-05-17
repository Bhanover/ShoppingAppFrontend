import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CookieBanner.css";
import loadGoogleAnalytics from "./LoadGoogleAnalytics";
import { FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const cookieInfoDetails = {
  necessary: {
    description:
      "Estas cookies son necesarias para que la Plataforma funcione y no se pueden desactivar en nuestros sistemas...",
  },
  functional: {
    description:
      "Estas cookies permiten que la Plataforma ofrezca una mejor funcionalidad y personalización...",
  },
  analytical: {
    description:
      "Estas cookies nos permiten contar las visitas y fuentes de circulación para poder medir y mejorar el desempeño...",
  },
  advertising: {
    description:
      "Estas cookies pueden estar en toda la Plataforma, colocadas por nuestros socios publicitarios...",
  },
};

const CookieBanner = ({ isVisible, setIsVisible }) => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: false,
    analytical: false,
    advertising: false,
  });

  const [showDetails, setShowDetails] = useState({
    necessary: false,
    functional: false,
    analytical: false,
    advertising: false,
  });

  const toggleCookiePreference = (category) => {
    if (category === "necessary") return;
    setCookiePreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };
  const toggleAllCookies = () => {
    const newState = !areAllCookiesActive();
    setCookiePreferences({
      necessary: true,
      functional: newState,
      analytical: newState,
      advertising: newState,
    });
  };
  const [showBanner, setShowBanner] = useState(false);

  const openCookieSettings = () => {
    setShowBanner(true);
  };

  // Función para aceptar todas las cookies
  const handleAcceptAll = () => {
    setAllCookies(true);
    setIsVisible(false);
  };

  // Función para rechazar todas las cookies
  const handleRejectAll = () => {
    setAllCookies(false);
    setIsVisible(false);
  };

  // Función para alternar los detalles de cada categoría de cookies
  const handleToggleDetails = (category) => {
    setShowDetails((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Función para confirmar las preferencias de cookies
  const handleConfirmPreferences = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(cookiePreferences)
    );
    setIsVisible(false); // Cierra el banner principal
    if (cookiePreferences.analytical) {
      loadGoogleAnalytics();
    }
  };

  // Función para establecer todas las cookies basadas en el consentimiento
  const setAllCookies = (consent) => {
    const newPreferences = {
      necessary: true,
      functional: consent,
      analytical: consent,
      advertising: consent,
    };
    setCookiePreferences(newPreferences);
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences));
    if (consent) {
      loadGoogleAnalytics();
    }
  };

  // Función para cerrar el banner detallado
  const closeDetailedBanner = () => {
    setShowBanner(false); // Oculta el banner detallado
  };
  // Verificar si todas las cookies están activadas
  const areAllCookiesActive = () => {
    return (
      cookiePreferences.functional &&
      cookiePreferences.analytical &&
      cookiePreferences.advertising
    );
  };

  // Renderizado condicional basado en la visibilidad
  if (!isVisible) return null;

  return (
    <div className={`cookie-banner-backdrop ${isVisible ? "flex" : "none"}`}>
      {!showBanner ? (
        // Banner inicial
        <div className="cookie-banner-simple">
          <p>
            Utilizamos cookies propias y de terceros con finalidades analíticas
            y para mostrarte publicidad relacionada con tus preferencias a
            partir de tus hábitos de navegación y tu perfil. Puedes configurar o
            rechazar las cookies haciendo click en “Configuración de cookies”.
            También puedes aceptar todas las cookies pulsando el botón “Aceptar
            todas las cookies”. Para más información puedes visitar nuestra
            <a
              href="/cookies_policy/cookies_policy_es.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Cookies
            </a>
            .
          </p>
          <div className="cookie-banner-simpleButton">
            <button className="cookie-accept" onClick={handleAcceptAll}>
              Aceptar todas las cookies
            </button>
            <button className="cookie-reject" onClick={handleRejectAll}>
              Rechazar todas las cookies
            </button>
          </div>
          <button onClick={openCookieSettings}>Configuración de cookies</button>
        </div>
      ) : (
        <div className="cookie-banner">
          <button className="close-btn" onClick={closeDetailedBanner}>
            <FaTimes />
          </button>
          <div className="cookie-bannerTop">
            <p>
              Utilizamos cookies para personalizar contenido y anuncios,
              proporcionar funciones de redes sociales y analizar nuestro
              tráfico.
              <a
                href="/cookies_policy/cookies_policy_es.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Cookies
              </a>
              .
            </p>
            <button className="cookie-permt" onClick={toggleAllCookies}>
              {areAllCookiesActive()
                ? "DESACTIVAR TODAS LAS COOKIES"
                : "ACTIVAR TODAS LAS COOKIES"}
            </button>
          </div>
          {Object.keys(cookiePreferences).map((category) => (
            <div key={category} className="cookie-options-row">
              <div className="cookie-options-container">
                <label className="cookie-options-label">
                  <div
                    className={`custom-checkbox ${
                      cookiePreferences[category] ? "checked" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={cookiePreferences[category]}
                      onChange={() => toggleCookiePreference(category)}
                      disabled={category === "necessary"}
                    />
                    <span className="checkmark"></span>
                  </div>
                  <p>Permitir cookies {category}</p>
                  <button
                    className={`info cookie-info-toggle ${
                      showDetails[category] ? "expanded" : ""
                    }`}
                    onClick={() => handleToggleDetails(category)}
                  >
                    {showDetails[category] ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                </label>
              </div>
              {showDetails[category] && (
                <div
                  className={`cookie-details ${
                    showDetails[category] ? "expanded" : ""
                  }`}
                >
                  {cookieInfoDetails[category].description}
                </div>
              )}
            </div>
          ))}
          <div className="cookie-banner-actions">
            <button className="cookie-accept" onClick={handleAcceptAll}>
              PERMITIRLAS TODAS
            </button>

            <button
              className="cookie-confirm"
              onClick={handleConfirmPreferences}
            >
              CONFIRMAR MIS PREFERENCIAS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
