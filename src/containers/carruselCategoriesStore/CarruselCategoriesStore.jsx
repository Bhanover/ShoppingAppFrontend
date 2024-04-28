import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import "./CarruselCategoriesStore.css";

const CarruselCategoriesStore = ({ categoryId }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  categoryId = 1;
  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      axios
        .get(`http://localhost:8081/api/categories/${categoryId}/subcategories`)
        .then((response) => {
          setSubCategories(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading subcategories", err);
          setError(err);
          setLoading(false);
        });
    }
  }, [categoryId]);

  if (loading) return <p>Loading subcategories...</p>;
  if (error) return <p>Error loading subcategories: {error.message}</p>;

  return (
    <div className="carruselCategoriesStore">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Scrollbar]}
        spaceBetween={0}
        slidesPerView={6}
        scrollbar={{ draggable: true }}
        breakpoints={{
          260: { slidesPerView: 3, spaceBetween: 0 },
          480: { slidesPerView: 4, spaceBetween: 0 },
          860: { slidesPerView: 7, spaceBetween: 0 },
        }}
      >
        {subCategories.map((subCategory) => (
          <SwiperSlide
            key={subCategory.id}
            className="carruselCategoriesStore-item"
          >
            <Link
              to={`/subcategory/${subCategory.id}`}
              className="carruselCategoriesStore-item-in"
            >
              <img
                src={subCategory.subCategoryImage || "default-image-url"}
                alt={subCategory.name}
              />
              <span>{subCategory.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselCategoriesStore;
