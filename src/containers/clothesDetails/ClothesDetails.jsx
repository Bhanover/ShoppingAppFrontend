import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import Select from "react-select";
import axios from "axios";

import "./ClothesDetails.css";
import ImageMagnifier from "./ImageMagnifier";
import AddToCartButton from "../../components/add_to_cart_button/AddToCartButton";

const ClothesDetails = ({ productId = 1 }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/products/${productId}`
        );
        setItem(response.data); // Set the product in the state
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const handleChange = (selectedOption) => {
    setSelectedSize(selectedOption);
  };

  const sizeOptions = item.variants.map((variant) => ({
    value: variant.sizeLabel,
    label: variant.sizeLabel,
  }));

  return (
    <div className="clothesDetails">
      <div className="clothesDetails-image-container">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          direction={"vertical"}
          modules={[Thumbs, Pagination]}
          className="clothesDetails-swiper-thumbs"
        >
          {item.images.map((image) => (
            <SwiperSlide
              key={image.id}
              className="clothesDetails-image-thumbs-container"
            >
              <img src={image.imageUrl} alt={`Thumbnail ${image.id}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Navigation, Pagination, Zoom, Thumbs]}
          zoom={true}
          direction={"vertical"}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className="clothesDetails-swiper-main"
        >
          {item.images.map((image) => (
            <SwiperSlide
              key={image.id}
              className="clothesDetails-image-main-container"
            >
              <ImageMagnifier
                src={image.imageUrl}
                alt={`Image ${image.id}`}
                className="clothesDetails-swiper-zoom-container"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="clothesDetails-info-container">
        <div className="clothesDetails-info-container-details">
          <h1>{item.name}</h1>
          <h1>{item.price}</h1>
          <p>{item.description}</p>
        </div>
        <div className="clothesDetails-info-container-options">
          <Select
            placeholder="Size"
            maxMenuHeight={200}
            value={selectedSize}
            onChange={handleChange}
            options={sizeOptions}
            classNamePrefix="custom-select"
          />
          <AddToCartButton product={item} selectedSize={selectedSize} />
        </div>
      </div>
    </div>
  );
};

export default ClothesDetails;

/*

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import Select from "react-select";
import axios from "axios";

import "./ClothesDetails.css";
import ImageMagnifier from "./ImageMagnifier";
import AddToCartButton from "../../components/add_to_cart_button/AddToCartButton";
const ClothesDetails = (productId = 1) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/products/${productId}`
        );
        setItem(response.data); // Establecer el producto en el estado
      } catch (error) {
        console.error("Error fetching product details:", error);
        // Manejar el error como sea apropiado
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!item) {
    return <div>Loading...</div>; // o algún componente de carga
  }

  const handleChange = (selectedOption) => {
    setSelectedSize(selectedOption);
  };

  const sizeOptions = item.size.map((size) => ({
    value: size.size,
    label: size.size,
  }));

  return (
    <div className="clothesDetails">
      <div className="clothesDetails-image-container">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          direction={"vertical"}
          navigation
          modules={[Thumbs, Navigation, Pagination]}
          className="clothesDetails-swiper-thumbs"
        >
          {item.images.map((image) => (
            <SwiperSlide
              key={image.id}
              className="clothesDetails-image-thumbs-container"
            >
              <img src={image.url} alt={`Thumbnail ${image.id}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Navigation, Pagination, Zoom, Thumbs]}
          zoom={true}
          direction={"vertical"}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className="clothesDetails-swiper-main"
        >
          {item.images.map((image) => (
            <SwiperSlide
              key={image.id}
              className="clothesDetails-image-main-container"
            >
              <ImageMagnifier
                src={image.url}
                alt={`Imagen ${image.id}`}
                className="clothesDetails-swiper-zoom-container"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="clothesDetails-info-container">
        <div className="clothesDetails-info-container-details">
          <h1>{item.name}</h1>
          <h1>{item.price}</h1>
          <p>{item.description}</p>
        </div>
        <div className="clothesDetails-info-container-options">
          <Select
            placeholder="Talla"
            maxMenuHeight={200}
            value={selectedSize}
            onChange={handleChange}
            options={sizeOptions}
            classNamePrefix="custom-select"
          />
          <AddToCartButton product={item} />
        </div>
      </div>
    </div>
  );
};

export default ClothesDetails;
*/
