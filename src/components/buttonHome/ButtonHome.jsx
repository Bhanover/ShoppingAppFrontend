import React from "react";

const ButtonHome = ({ nombre }) => {
  // Utiliza desestructuración para acceder directamente a nombre
  return (
    <div className="buttonHome">
      <button>Click me {nombre}</button>
    </div>
  );
};

export default ButtonHome;
