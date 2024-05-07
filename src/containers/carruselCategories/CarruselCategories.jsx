import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import "./CarruselCategories.css";

const CarruselCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/simple-categories"
        ); // Asegúrate de tener la URL correcta
        setCategories(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>Error al cargar las categorías: {error.message}</p>;

  return (
    <div className="carruselCategories">
      <h1>SEASONAL FAVS</h1>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={4}
        breakpoints={{
          260: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          860: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id} className="carruselCategories-item">
            <Link
              className="carruselCategories-item-in"
              to={`/home/store/${category.name}-${category.id}`}
            >
              <img
                src={category.categoryImage || "default-image-url"} // Usar una imagen por defecto si no hay imagen
                alt={category.name}
              />
              <span>{category.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselCategories;
