import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import axios from "axios";
import "swiper/css"; // Estilos base de Swiper
import "swiper/css/pagination"; // Estilos para la paginación
import "swiper/css/navigation"; // Si planeas usar la navegación

import "./Home.css";
import ButtonHome from "../../components/buttonHome/ButtonHome";
import CarruselCategories from "../../containers/carruselCategories/CarruselCategories";
import NewsletterSignUp from "../../containers/newsletter_sign_up/NewsletterSignUp";
import BottomBar from "../../containers/bottomBar/BottomBar";
import LoaderPage from "../../loaders/LoaderPage";
import BASE_URL from "../../Enviroment";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [shoesCategory, setShoesCategory] = useState(null);
  const [dressesCategory, setDressesCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 2000);
  useEffect(() => {
    axios
      .get(BASE_URL + "/api/simple-name-categories")
      .then((response) => {
        const categoriesData = response.data;
        setShoesCategory(
          categoriesData.find(
            (category) =>
              category.name.toLowerCase() === "zapatos".toLowerCase()
          )
        );
        setDressesCategory(
          categoriesData.find(
            (category) => category.name.toLowerCase() === "vestidos"
          )
        );
        console.log(shoesCategory);
        setCategories(categoriesData);
      })

      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  if (loading) {
    return <LoaderPage />;
  }
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
        <SwiperSlide className="home-video1">
          <video autoPlay loop muted>
            <source src="/video/videoHome1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <ButtonHome name="novedades" />
        </SwiperSlide>
        <SwiperSlide className="home-categories">
          <CarruselCategories />
        </SwiperSlide>
        <SwiperSlide className="home-image2">
          {shoesCategory ? (
            <ButtonHome name={`${shoesCategory.name}-${shoesCategory.id}`} />
          ) : (
            <p>Categoría 'Zapatos' no encontrada</p>
          )}
        </SwiperSlide>
        <SwiperSlide className="home-image3">
          {dressesCategory ? (
            <ButtonHome
              name={`${dressesCategory.name}-${dressesCategory.id}`}
            />
          ) : (
            <p>Categoría 'Vestidos' no encontrada</p>
          )}
        </SwiperSlide>
        <SwiperSlide className="home-newsletter">
          <div className="home-newsletter-background"></div>
          <NewsletterSignUp />
          <div className="home-newsletter-background"></div>
        </SwiperSlide>
        <SwiperSlide className="home-bottomBar">
          <BottomBar />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
