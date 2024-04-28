import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";

import "swiper/css"; // Estilos base de Swiper
import "swiper/css/pagination"; // Estilos para la paginación
import "swiper/css/navigation"; // Si planeas usar la navegación

import "./Home.css";
import ButtonHome from "../../components/buttonHome/ButtonHome";
import CarruselCategories from "../../containers/carruselCategories/CarruselCategories";
import NewsletterSignUp from "../../containers/newsletter_sign_up/NewsletterSignUp";
import BottomBar from "../../containers/bottomBar/BottomBar";

const Home = () => {
  return (
    <div className="home">
      <Swiper
        className="fullpage-wrapper"
        direction={"vertical"}
        slidesPerView={1}
        speed={1500}
        spaceBetween={0}
        mousewheel={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Mousewheel, Pagination]}
      >
        <SwiperSlide className="home-image1">
          <ButtonHome nombre="Novedades" />
        </SwiperSlide>
        <SwiperSlide className="home-categories">
          <CarruselCategories />
        </SwiperSlide>
        <SwiperSlide className="home-image2">
          <ButtonHome nombre="Novedades" />
        </SwiperSlide>
        <SwiperSlide className="home-image3">
          <ButtonHome nombre="Novedades" />
        </SwiperSlide>
        <SwiperSlide className="home-newsletter">
          <div className="home-newsletter-space"></div>
          <NewsletterSignUp className="home-newsletter-up" />
          <div className="home-newsletter-space"></div>
        </SwiperSlide>
        <SwiperSlide className="home-bottomBar">
          <BottomBar />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
