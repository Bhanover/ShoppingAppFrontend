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

  // Simula una carga de 2 segundos
  setTimeout(() => setLoading(false), 2000);

  useEffect(() => {
    // Obtener categorías de la API
    axios
      .get(BASE_URL + "/api/simple-name-categories")
      .then((response) => {
        const categoriesData = response.data;
        // Encontrar la categoría de zapatos
        setShoesCategory(
          categoriesData.find(
            (category) => category.name.toLowerCase() === "zapatos"
          )
        );
        // Encontrar la categoría de vestidos
        setDressesCategory(
          categoriesData.find(
            (category) => category.name.toLowerCase() === "vestidos"
          )
        );
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
        {/* Video de introducción */}
        <SwiperSlide className="home-video1">
          <video autoPlay loop muted>
            <source src="/video/videoHome1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <ButtonHome name="novedades" />
        </SwiperSlide>

        {/* Carrusel de categorías */}
        <SwiperSlide className="home-categories">
          <CarruselCategories />
        </SwiperSlide>

        {/* Botón para la categoría de zapatos */}
        <SwiperSlide className="home-image2">
          {shoesCategory ? (
            <ButtonHome name={`${shoesCategory.name}-${shoesCategory.id}`} />
          ) : (
            <p>Categoría 'Zapatos' no encontrada</p>
          )}
        </SwiperSlide>

        {/* Botón para la categoría de vestidos */}
        <SwiperSlide className="home-image3">
          {dressesCategory ? (
            <ButtonHome
              name={`${dressesCategory.name}-${dressesCategory.id}`}
            />
          ) : (
            <p>Categoría 'Vestidos' no encontrada</p>
          )}
        </SwiperSlide>

        {/* Sección de suscripción al boletín */}
        <SwiperSlide className="home-newsletter">
          <div className="home-newsletter-background"></div>
          <NewsletterSignUp />
          <div className="home-newsletter-background"></div>
        </SwiperSlide>

        {/* Barra inferior */}
        <SwiperSlide className="home-bottomBar">
          <BottomBar />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
