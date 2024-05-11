import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="aboutUsContainer">
      <Helmet>
        <title>Store Sobre Nosotros </title>
        <meta
          name="description"
          content="Conoce más sobre Store: Nuestra historia, misión, visión y valores. Comprometidos con la moda sostenible y la excelencia en el servicio al cliente."
        />
      </Helmet>

      <section className="intro">
        <h1>Bienvenidos a StyleSwype.shop</h1>
        <img src="/static/logo_page/StyleSwype.svg" alt="logo" />
        <p>
          Somos un equipo dedicado a ofrecer ropa de calidad a través de nuestra
          plataforma online. Con sede en España, nos enorgullecemos de brindar
          moda accesible sin una tienda física, llegando a clientes en todo el
          mundo.
        </p>
      </section>

      <section className="ourStory">
        <h2>Nuestra Historia</h2>
        <p>
          StyleSwype.shop nació de la pasión por la moda y el deseo de hacerla
          accesible para todos. Desde nuestros inicios, nos hemos comprometido a
          ofrecer prendas de alta calidad, seleccionadas cuidadosamente para
          nuestros clientes.
        </p>
      </section>

      <section className="missionVision">
        <h2>Misión y Visión</h2>
        <p>
          Nuestra misión es proveer una experiencia de compra excepcional con
          ropa de la mejor calidad. Aspiramos a ser un referente en el mercado
          de moda online, destacándonos por nuestro compromiso con la excelencia
          y la satisfacción del cliente.
        </p>
      </section>

      <section className="ourValues">
        <h2>Nuestros Valores</h2>
        <ul>
          <li>Calidad: Compromiso con la excelencia en cada prenda.</li>
          <li>
            Innovación: Siempre a la vanguardia de las tendencias de moda.
          </li>
          <li>
            Sostenibilidad: Respeto por el medio ambiente en todos nuestros
            procesos.
          </li>
        </ul>
      </section>

      <section className="contactInfo">
        <h2>Contacto</h2>
        <p>
          Para más información o consultas, no dudes en contactarnos a través de
          nuestras redes sociales o nuestro formulario de contacto en la web.
        </p>
        <Link to="/contact" alt="contacto">
          Contactar
        </Link>
      </section>

      <section className="customerCommitment">
        <h2>Compromiso con Nuestros Clientes</h2>
        <p>
          En StyleSwype.shop, la satisfacción del cliente es nuestra prioridad.
          Nos esforzamos por brindar la mejor experiencia de compra.
        </p>
      </section>

      <section className="sustainability">
        <h2>Sostenibilidad y Responsabilidad Social</h2>
        <p>
          Estamos comprometidos con prácticas sostenibles y apoyamos iniciativas
          comunitarias.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
