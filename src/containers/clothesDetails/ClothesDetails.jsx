import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import Select from "react-select";

import "./ClothesDetails.css";
import ImageMagnifier from "./ImageMagnifier";
import AddToCartButton from "../../components/add_to_cart_button/AddToCartButton";
const ClothesDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [item] = useState({
    id: 1,
    name: "Electrónica",
    price: "93.0",
    description: "esto es la description",
    images: [
      {
        id: "1",
        url: "https://static.vecteezy.com/system/resources/thumbnails/017/323/709/small/close-up-of-a-reptile-on-a-tree-branch-set-against-a-stunning-hd-natural-background-wallpaper-photo.jpg",
      },
      {
        id: "2",
        url: "https://static.vecteezy.com/system/resources/thumbnails/017/323/709/small/close-up-of-a-reptile-on-a-tree-branch-set-against-a-stunning-hd-natural-background-wallpaper-photo.jpg",
      },
      {
        id: "3",
        url: "https://static.vecteezy.com/system/resources/thumbnails/017/323/709/small/close-up-of-a-reptile-on-a-tree-branch-set-against-a-stunning-hd-natural-background-wallpaper-photo.jpg",
      },
      {
        id: "4",
        url: "https://static.vecteezy.com/system/resources/thumbnails/017/323/709/small/close-up-of-a-reptile-on-a-tree-branch-set-against-a-stunning-hd-natural-background-wallpaper-photo.jpg",
      },
      {
        id: "5",
        url: "https://static.vecteezy.com/system/resources/thumbnails/017/323/709/small/close-up-of-a-reptile-on-a-tree-branch-set-against-a-stunning-hd-natural-background-wallpaper-photo.jpg",
      },
    ],
    size: [
      {
        id: "1",
        size: "2",
      },
      {
        id: "2",
        size: "33",
      },
      {
        id: "3",
        size: "33",
      },
      {
        id: "4",
        size: "33",
      },
      {
        id: "5",
        size: "33",
      },
      {
        id: "6",
        size: "33",
      },
      {
        id: "7",
        size: "33",
      },
    ],
  });
  const [selectedSize, setSelectedSize] = useState(null);

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
