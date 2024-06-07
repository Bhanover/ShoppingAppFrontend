import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UserRegister.css";
import BASE_URL from "../../Enviroment";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Manejar el cambio en los campos del formulario
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(BASE_URL + "/api/register", formData)
      .then((response) => {
        console.log("Registration successful", response.data);
        // Redirigir al usuario a la página de login después del registro exitoso
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Registration failed:", error.response.data);
          // Mostrar al usuario los mensajes de error específicos de cada campo
          alert("Error: " + JSON.stringify(error.response.data));
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <div className="registerMain">
      <div className="register-form">
        <h1>User Registration</h1>
        <form onSubmit={onSubmit}>
          <div className="register-form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={onChange}
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={onChange}
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
        <Link to="/login">Loguearse</Link>
      </div>
    </div>
  );
};

export default UserRegister;
