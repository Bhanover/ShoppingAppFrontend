import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import "./CarruselCategories.css";
import BASE_URL from "../../Enviroment";
import Loader from "../../loaders/Loader";
import LoaderPage from "../../loaders/LoaderPage";

const CarruselCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          BASE_URL + "/api/simple-categories-home"
        );
        setCategories(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <LoaderPage />;
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
              to={`/store/${category.name}-${category.id}`}
            >
              <img
                src={category.categoryImage || "default-image-url"}
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
