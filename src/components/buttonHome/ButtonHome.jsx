import React from "react";
import "./ButtonHome.css";
import { Link } from "react-router-dom";

const ButtonHome = ({ nombre }) => {
  const path = `/home/store/${nombre}`;

  return (
    <div className="buttonHome">
      <Link to={path}>Click me {nombre}</Link>
    </div>
  );
};

export default ButtonHome;
