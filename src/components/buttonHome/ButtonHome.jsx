import React from "react";
import "./ButtonHome.css";
import { Link } from "react-router-dom";
const ButtonHome = ({ nombre }) => {
  // Utiliza desestructuración para acceder directamente a nombre
  return (
    <div className="buttonHome">
      <Link>Click me {nombre}</Link>
    </div>
  );
};

export default ButtonHome;
