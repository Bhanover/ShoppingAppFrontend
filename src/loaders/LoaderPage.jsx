import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import "./LoaderPage.css"; // Asegúrate de que el archivo CSS está correctamente vinculado

const LoaderPage = () => {
  return (
    <div className="loader-page">
      <ThreeCircles
        height="80"
        width="80"
        color="#ffffff" // Color blanco para los círculos
        wrapperStyle={{ justifyContent: "center" }}
        wrapperClass="loader-wrapper"
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#cccccc" // Color gris claro para el círculo exterior
        innerCircleColor="#aaaaaa" // Color gris medio para el círculo interior
        middleCircleColor="#888888" // Color gris oscuro para el círculo del medio
      />
    </div>
  );
};

export default LoaderPage;
