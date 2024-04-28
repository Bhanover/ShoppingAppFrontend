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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

import { CSSTransition } from "react-transition-group";

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState("Mujer");
  const menuRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const [categorias, setCategorias] = useState({ Mujer: [], Hombre: [] });

  // Función para cargar las categorías desde el backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/simple-categories"
      );
      // Suponiendo que response.data es un array de categorías
      setCategorias({ Mujer: response.data, Hombre: response.data });
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);
  const menuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
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
        // Scroll hacia abajo, oculta el buscador y el nombre
        searchBar.style.transform = "translateY(-100px)";
        searchBar_2.style.transform = "translateY(-200px)";
        brandName.style.transform = "translateY(-100px)";
        searchBar.style.opacity = "0.5";
        searchBar_2.style.opacity = "0.5";
        brandName.style.opacity = "0.5";
      } else {
        // Scroll hacia arriba, muestra el buscador y el nombre
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
                  to="/home"
                  alt="Volver a la página principal"
                  onClick={() => menuOpen()}
                >
                  <FontAwesomeIcon icon={faHome} />
                </Link>
                <Link
                  to={`/${isActive}`}
                  alt="Salir"
                  onClick={() => menuOpen()}
                >
                  <FontAwesomeIcon icon={faX} />
                </Link>
              </div>
              <ul className="topBar-nav-menu-categories-names">
                {categorias[isActive].map((categoria) => (
                  <li key={categoria.id}>
                    <Link to={`/${categoria.name}`} alt={`/${categoria.name}`}>
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

          <div className="topBar-brand">Nombre</div>
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
            <Link to="/perfil">
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <Link to="/carrito">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
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
