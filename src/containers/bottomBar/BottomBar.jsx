import React, { useState, useEffect } from "react";
import "./BottomBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faTwitter,
  faYoutube,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const BottomBar = () => {
  const [showDropdown, setShowDropdown] = useState({
    ayuda: window.innerWidth > 860,
    empresa: window.innerWidth > 860,
    app: window.innerWidth > 860,
    pago: window.innerWidth > 860,
    social: window.innerWidth > 860,
  });

  useEffect(() => {
    const handleResize = () => {
      const shouldShowDropdowns = window.innerWidth > 860;
      setShowDropdown({
        ayuda: shouldShowDropdowns,
        empresa: shouldShowDropdowns,
        app: shouldShowDropdowns,
        pago: shouldShowDropdowns,
        social: shouldShowDropdowns,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (section) => {
    setShowDropdown((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  return (
    <footer className="bottomBar">
      <div className="bottomBar-container">
        <div className="bottomBar-column">
          <div
            className="bottomBar-header"
            onClick={() => toggleDropdown("ayuda")}
          >
            <h4>AYUDA</h4>
            {showDropdown.ayuda ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          <div
            className={`bottomBar-dropdown-content ${
              showDropdown.ayuda ? "show" : ""
            }`}
          >
            <Link to="/faq">Preguntas frecuentes</Link>
            <Link to="/order-status">Estado de mi pedido</Link>
            <Link to="/returns">Cómo devolver</Link>
            <Link to="/store-ticket">Ticket de tienda</Link>
            <Link to="/shipping">Envíos</Link>
            <Link to="/gift-card">Tarjeta Regalo</Link>
            <Link to="/online-fraud">Evitar estafas al comprar online</Link>
          </div>
        </div>

        <div className="bottomBar-column">
          <div
            className="bottomBar-header"
            onClick={() => toggleDropdown("empresa")}
          >
            <h4>EMPRESA</h4>
            {showDropdown.empresa ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          <div
            className={`bottomBar-dropdown-content ${
              showDropdown.empresa ? "show" : ""
            }`}
          >
            <a href="/about">Quiénes somos</a>
            <a href="/stores">Localizador de tiendas</a>
            <a href="/about">Quiénes somos</a>
            <a href="/stores">Localizador de tiendas</a>
            <a href="/about">Quiénes somos</a>
            <a href="/stores">Localizador de tiendas</a>
          </div>
        </div>
        <div className="bottomBar-column">
          <div
            className="bottomBar-header"
            onClick={() => toggleDropdown("app")}
          >
            <h4>NUESTRA APP</h4>
            {showDropdown.app ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          <div
            className={`bottomBar-dropdown-content ${
              showDropdown.app ? "show" : ""
            }`}
          >
            <a href="#">appStore</a>
            <a href="#">googleplay</a>
          </div>

          <div
            className="bottomBar-header"
            onClick={() => toggleDropdown("pago")}
          >
            <h4>MÉTODOS DE PAGO</h4>
            {showDropdown.pago ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          <div
            className={`bottomBar-dropdown-content ${
              showDropdown.app ? "show" : ""
            }`}
          >
            <a href="#">appStore</a>
            <a href="#">googleplay</a>
          </div>
          <div className="bottomBar-social">
            <div
              className="bottomBar-header"
              onClick={() => toggleDropdown("social")}
            >
              <h4>SIGUENOS</h4>
              {showDropdown.social ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </div>
            <div
              className={`bottomBar-dropdown-content ${
                showDropdown.social ? "show" : ""
              }`}
            >
              <div className="bottomBar-row">
                <Link to="/instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to="/facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link to="/twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link to="/youtube">
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
                <Link to="/pinterest">
                  <FontAwesomeIcon icon={faPinterest} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottomBar-links">
        <a href="/privacy-policy">Política de privacidad</a>
        <a href="/terms-of-purchase">Condiciones de compra</a>
        <a href="/cookie-policy">Política de cookies</a>
        <a href="/preferences">Preferencias de cookies</a>
        <a href="/spain">España</a>
        <a href="/language">Español</a>
      </div>
    </footer>
  );
};

export default BottomBar;
