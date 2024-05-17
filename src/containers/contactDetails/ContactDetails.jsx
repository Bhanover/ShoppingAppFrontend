// ContactScreen.jsx
import React from "react";
import "./ContactDetails.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BASE_URL from "../../Enviroment";
const ContactDetails = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Crear un objeto con los datos del formulario
    const data = {
      nombre: formData.get("nombre"),
      apellidos: formData.get("apellidos"),
      telefono: formData.get("codigoPais") + formData.get("telefono"),
      email: formData.get("email"),
      mercado: formData.get("mercado"),
      asunto: formData.get("asunto"),
      tema: formData.get("tema"),
      mensaje: formData.get("mensaje"),
    };

    // Enviar los datos al endpoint de Spring Boot usando axios
    axios
      .post(`${BASE_URL}/api/contact`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        alert("Mensaje enviado: " + response.data);
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
      });
  };

  return (
    <div className="contactMain">
      <h1>Contáctanos</h1>
      <form className="contactMain-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          title="Solo letras y espacios, máximo 40 caracteres"
        />
        <input
          type="text"
          id="apellidos"
          name="apellidos"
          placeholder="Apellidos"
          required
          pattern="[A-Za-zÀ-ÿ\s]{1,40}"
          title="Solo letras y espacios, máximo 40 caracteres"
        />
        <select id="codigoPais" name="codigoPais" required>
          <option value="+34">España (+34)</option>
          <option value="+1">Estados Unidos (+1)</option>
          <option value="+591">Bolivia (+591)</option>
          <option value="+351">Portugal (+351)</option>
        </select>
        <input
          type="text"
          id="telefono"
          name="telefono"
          placeholder="Teléfono móvil"
          required
          pattern="\d{9,15}"
          title="Número de teléfono debe tener entre 9 y 15 dígitos"
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          title="Ingresa un email válido"
        />
        <select id="mercado" name="mercado" required>
          <option value="España">España</option>
          <option value="Estados Unido">Estados Unidos</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Portugal">Portugal</option>
        </select>
        <select id="asunto" name="asunto" required>
          <option value="">Selecciona un asunto</option>
          <option value="Devolución">Devolución</option>
          <option value="Estado del Pedido">Estado del Pedido</option>
          <option value="Información sobre artículos">
            Información sobre artículos
          </option>
        </select>
        <input type="text" id="tema" name="tema" placeholder="Tema" required />
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Mensaje"
          required
          maxLength="500"
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactDetails;
/*
<Layout>
      <Helmet>
        <title>StyleSwype España - Bolivia Contacta con Nosotros</title>
        <meta
          name="description"
          content="Ponte en contacto con StyleSwype.shop para consultas, soporte o cualquier pregunta relacionada con nuestros productos y servicios. Estamos aquí para ayudarte."
        />
      </Helmet>*/
