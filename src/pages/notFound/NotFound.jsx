import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfoundMain">
      <img src="/notfound/notfound2.svg" alt="imagen de chica Not Found" />
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to={"/"} alt="pagina inicial">
        Regresar a la página inicial
      </Link>
    </div>
  );
};

export default NotFound;
