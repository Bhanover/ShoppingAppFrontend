import "./TopBar.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faUser,
  faShoppingCart,
  faX,
  faHome,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import React, { useContext } from "react";

import { CSSTransition } from "react-transition-group";
import CartContext from "../../context/cartContext/CartContext";
import Cart from "../cart/Cart";
import BASE_URL from "../../Enviroment";
import ProfileMenu from "../../components/profile_menu/ProfileMenu";
import CartMenu from "../../components/cart_menu/CartMenu";

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState("Mujer");
  const menuRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [categorias, setCategorias] = useState({ Mujer: [], Hombre: [] });

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/api/simple-categories-home"
      );
      setCategorias({ Mujer: response.data, Hombre: response.data });
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const menuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const searchBar = document.querySelector(".topBar-search");
    const searchBar_2 = document.querySelector(".topBar-search-2");
    const brandName = document.querySelector(".topBar-brand");

    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        searchBar.style.transform = "translateY(-100px)";
        searchBar_2.style.transform = "translateY(-200px)";
        brandName.style.transform = "translateY(-100px)";
        searchBar.style.opacity = "0.5";
        searchBar_2.style.opacity = "0.5";
        brandName.style.opacity = "0.5";
      } else {
        searchBar.style.transform = "translateY(0)";
        searchBar_2.style.transform = "translateY(0)";
        brandName.style.transform = "translateY(0)";
        searchBar.style.opacity = "1";
        searchBar_2.style.opacity = "1";
        brandName.style.opacity = "1";
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <header className="topBar">
      <div className="topBar-promo">Envíos y devoluciones gratuitos</div>
      <div className="topBar-content">
        <div className="topBar-content-center">
          <div className="topBar-menu">
            <FontAwesomeIcon
              aria-label="Abrir menú"
              icon={faBars}
              onClick={() => menuOpen()}
            />
          </div>
          <CSSTransition
            in={isMenuOpen}
            timeout={1000}
            classNames="menu"
            unmountOnExit
            nodeRef={menuRef}
          >
            <nav ref={menuRef} className="topBar-nav-menu">
              <div className="topBar-nav-menu-categories">
                <ul>
                  <li
                    className={isActive === "Mujer" ? "active" : ""}
                    onClick={() => setIsActive("Mujer")}
                  >
                    <span>Mujer</span>
                  </li>
                  <li
                    className={isActive === "Hombre" ? "active" : ""}
                    onClick={() => setIsActive("Hombre")}
                  >
                    <span>Hombre</span>
                  </li>
                </ul>
                <Link
                  to="/"
                  alt="Volver a la página principal"
                  onClick={() => menuOpen()}
                >
                  <FontAwesomeIcon icon={faHome} />
                </Link>
                <Link
                  to="#"
                  alt="Salir"
                  onClick={(e) => {
                    e.preventDefault();
                    menuOpen();
                  }}
                >
                  <FontAwesomeIcon icon={faX} />
                </Link>
              </div>
              <ul className="topBar-nav-menu-categories-names">
                {categorias[isActive].map((categoria) => (
                  <li key={categoria.id}>
                    <Link
                      to={`/store/${categoria.name}-${categoria.id}`}
                      alt={`/${categoria.name}`}
                      onClick={() => menuOpen()}
                    >
                      <img
                        src={categoria.categoryImage}
                        alt={`Imagen de ${categoria.nombre}`}
                      />
                      <span className="categoria-texto">{categoria.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </CSSTransition>

          <div className="topBar-brand">
            <Link to="/">
              <img src="/images/logo.png" alt="Logo"></img>
            </Link>
          </div>

          <div className="topBar-icons">
            <form className="topBar-search">
              <input
                type="search"
                placeholder="Buscar..."
                value={searchValue}
                onChange={handleSearchChange}
              />
              <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            <Link to="/contact" title="contacto">
              <FontAwesomeIcon icon={faEnvelope} />
            </Link>
            <ProfileMenu />
            <CartMenu />
          </div>
        </div>

        <form className="topBar-search-2">
          <input
            type="search"
            placeholder="Buscar..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
    </header>
  );
};

export default TopBar;
