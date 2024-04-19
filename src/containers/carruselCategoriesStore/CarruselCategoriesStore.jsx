import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import "./CarruselCategoriesStore.css";
const CarruselCategoriesStore = () => {
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
    <div className="carruselCategoriesStore">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Scrollbar]}
        spaceBetween={0}
        slidesPerView={6}
        scrollbar={{ draggable: true }}
        /* autoplay={{
          delay: 3000, // Delay in milliseconds between slides (300 is very fast, consider using a larger value like 3000)
          disableOnInteraction: false, // This will keep autoplay running even after manual interaction
        }}*/
        breakpoints={{
          260: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          480: {
            slidesPerView: 6,
            spaceBetween: 0,
          },
          860: {
            slidesPerView: 7,
            spaceBetween: 0,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide
            key={category.id}
            className="carruselCategoriesStore-item"
          >
            <Link
              className="carruselCategoriesStore-item-in"
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

export default CarruselCategoriesStore;
