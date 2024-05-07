import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Página no encontrada</h1>
      <p>La página que estás buscando no existe.</p>
      <Link to="/home">Volver a la página de inicio</Link>
    </div>
  );
};

export default NotFound;
