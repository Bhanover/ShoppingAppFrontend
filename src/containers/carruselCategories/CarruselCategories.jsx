import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import "./CarruselCategories.css";
const CarruselCategories = () => {
  const [categories] = useState([
    { id: 1, name: "Electrónica" },
    { id: 2, name: "Gimnasio" },
    { id: 3, name: "Relojes" },
    { id: 4, name: "Moda" },
    { id: 5, name: "Accesorios" },
    { id: 6, name: "Zapatos" },
    { id: 7, name: "Moda" },
    { id: 8, name: "Accesorios" },
    { id: 9, name: "Zapatos" },
  ]);

  return (
    <div className="carruselCategories">
      <h1>SEASONAL FAVS</h1>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={4}
        /* autoplay={{
          delay: 3000, // Delay in milliseconds between slides (300 is very fast, consider using a larger value like 3000)
          disableOnInteraction: false, // This will keep autoplay running even after manual interaction
        }}*/
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
              to={`/clothes-shop/category/${category.name}-${category.id}`}
            >
              <img
                src="https://th.bing.com/th/id/OIP.pHuSFWGW1N86TriC7iKSLAHaEo?rs=1&pid=ImgDetMain"
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
