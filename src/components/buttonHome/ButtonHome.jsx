import React from "react";
import "./ButtonHome.css";
import { Link } from "react-router-dom";

const ButtonHome = ({ name }) => {
  const path = `/store/${name}`;

  const nameHome = name ? name.split("-")[0] : null;
  const idHome = name ? name.split("-")[1] : null;

  return (
    <div className="buttonHome">
      <Link to={path}>Click me {nameHome}</Link>
    </div>
  );
};

export default ButtonHome;
