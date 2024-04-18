import React, { useState } from "react";
import "./CarruselCategories.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const CarruselCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electrónica" }, // Cambiado 'nombre' por 'name'
    { id: 2, name: "Gimnasio" },
    { id: 3, name: "Relojes" },
    { id: 4, name: "Moda" },
    { id: 5, name: "Accesorios" },
    { id: 6, name: "Zapatos" },
    { id: 7, name: "Moda" },
    { id: 8, name: "Accesorios" },
    { id: 9, name: "Zapatos" },
  ]);

  const categorySettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    draggable: false,
  };

  return (
    <div className="carruselCategories">
      <h1>Categorías</h1>
      {categories.length > 0 ? (
        <Slider {...categorySettings}>
          {categories.map((category) => (
            <div key={category.id} className="carruselCategories-contain">
              <Link
                to={`/clothes-shop/category/${category.name}-${category.id}`}
              >
                <img
                  src="https://th.bing.com/th/id/OIP.zgcx04nqAjZgmpGkrEpuSAHaLG?w=195&h=292&c=7&r=0&o=5&dpr=1.5"
                  alt={category.name}
                />
                <span>{category.name}</span>
              </Link>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="homeScreennoCategories">
          No se encuentran categorías
        </div>
      )}
    </div>
  );
};

export default CarruselCategories;
