import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./ProfileMenu.css";
import Logout from "../logout/Logout";

const ProfileMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null); // Crear la referencia

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="profileMenu">
      <button
        onClick={toggleMenu}
        aria-label="Toggle profile menu"
        className="profileMenu-button"
      >
        <FontAwesomeIcon icon={faUser} />
      </button>
      <CSSTransition
        in={isVisible}
        timeout={300}
        classNames="profileMenu"
        unmountOnExit
        nodeRef={menuRef} // Usar la referencia aquí
      >
        <div className="profileMenu-container" ref={menuRef}>
          <ul>
            {localStorage.getItem("jwtToken") ? (
              <>
                <li className="profileMenu-user">
                  <FontAwesomeIcon icon={faUser} />
                  <Link to="/perfil">Perfil</Link>
                </li>
                <li>
                  <Logout />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Iniciar Sesión</Link>
                </li>
                <li>
                  <Link to="/register">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ProfileMenu;
