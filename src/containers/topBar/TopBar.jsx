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

import { CSSTransition } from "react-transition-group";

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState("Mujer");
  const menuRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [categorias, setCategorias] = useState({
    Mujer: [
      { id: 1, nombre: "Moda" },
      { id: 2, nombre: "Accesorios" },
      { id: 3, nombre: "Zapatos" },
      { id: 4, nombre: "Moda" },
      { id: 5, nombre: "Accesorios" },
      { id: 6, nombre: "Zapatos" },
      { id: 7, nombre: "Moda" },
      { id: 8, nombre: "Accesorios" },
      { id: 9, nombre: "Zapatos" },
    ],
    Hombre: [
      { id: 10, nombre: "Electrónica" },
      { id: 11, nombre: "Gimnasio" },
      { id: 12, nombre: "Relojes" },
      { id: 13, nombre: "Moda" },
      { id: 14, nombre: "Accesorios" },
      { id: 15, nombre: "Zapatos" },
      { id: 16, nombre: "Moda" },
      { id: 17, nombre: "Accesorios" },
      { id: 18, nombre: "Zapatos" },
    ],
  });
  const menuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

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
                    <Link
                      to={`/${categoria.nombre}`}
                      alt={`/${categoria.nombre}`}
                    >
                      <img
                        src="https://th.bing.com/th/id/OIP.zgcx04nqAjZgmpGkrEpuSAHaLG?w=195&h=292&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                        alt={`Imagen de ${categoria.nombre}`}
                      />
                      <span className="categoria-texto">
                        {categoria.nombre}
                      </span>
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
