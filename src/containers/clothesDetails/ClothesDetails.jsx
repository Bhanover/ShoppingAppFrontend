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
import { useNavigate, useParams } from "react-router-dom";
import LoaderPage from "../../loaders/LoaderPage";

const ClothesDetails = () => {
  const { productNameWithId } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [item, setItem] = useState(null);
  const productName = productNameWithId
    ? productNameWithId.split("-")[0]
    : null;
  const productId = productNameWithId ? productNameWithId.split("-")[1] : null;
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/products/${productId}`
        );
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);
  useEffect(() => {
    setSelectedSize(null);
  }, [productId]);
  if (!item) {
    return (
      <div>
        <LoaderPage />
      </div>
    );
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
