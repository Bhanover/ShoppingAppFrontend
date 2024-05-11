import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./CarruselCategoriesStore.css";
import BASE_URL from "../../Enviroment";

const CarruselCategoriesStore = ({ categoryNameWithId }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryName = categoryNameWithId
    ? categoryNameWithId.split("-")[0]
    : null;
  const categoryId = categoryNameWithId
    ? categoryNameWithId.split("-")[1]
    : null;

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      axios
        .get(BASE_URL + `/api/categories/${categoryId}/subcategories`)
        .then((response) => {
          setSubCategories(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading subcategories", err);
          setError(`Failed to load subcategories: ${err.message}`);
          setLoading(false);
        });
    }
  }, [categoryId]);

  if (loading) return <p>Loading subcategories...</p>;
  if (error) return <p>{error}</p>;
  if (subCategories.length === 0) return <p>No subcategories found.</p>;

  return (
    <div className="carruselCategoriesStore">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Scrollbar]}
        spaceBetween={0}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: {
            slidesPerView: Math.max(3),
            spaceBetween: 0,
          },
          480: {
            slidesPerView: Math.max(4),
            spaceBetween: 0,
          },
          860: {
            slidesPerView: Math.max(7),
            spaceBetween: 0,
          },
        }}
      >
        {subCategories.map((subCategory) => (
          <SwiperSlide
            key={subCategory.id}
            className="carruselCategoriesStore-item"
          >
            <Link
              to={
                subCategory.id === 0
                  ? `/store/${categoryName}-${categoryId}`
                  : `/store/${categoryName}-${categoryId}/${subCategory.name}-${subCategory.id}`
              }
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
