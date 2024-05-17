import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./ProfileMenu.css";
import Logout from "../logout/Logout";

const ProfileMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="profileMenu">
      <button
        ref={buttonRef}
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
        nodeRef={menuRef}
      >
        <div className="profileMenu-container" ref={menuRef}>
          <ul>
            {localStorage.getItem("jwtToken") ? (
              <>
                <li className="profileMenu-user">
                  <Link to="/perfil">
                    {" "}
                    <FontAwesomeIcon icon={faUser} />
                    Perfil
                  </Link>
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
