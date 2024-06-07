import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UserLogin.css";
import BASE_URL from "../../Enviroment";

const UserLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // Manejar el cambio en los campos del formulario
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(BASE_URL + `/api/session`, formData)
      .then((response) => {
        // Guardar el token JWT en el localStorage
        localStorage.setItem("jwtToken", response.data.jwtToken);
        console.log(response.data);
        // Verificar si el usuario es administrador
        const isAdmin = response.data.roles.includes("ROLE_ADMIN");
        localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
        // Redirigir al usuario según su rol
        isAdmin ? navigate("/admin-dashboard/management") : navigate("/");
      })
      .catch((error) => {
        console.error("Error de autenticación:", error);
      });
  };

  return (
    <div className="loginMain">
      <div className="login-form">
        <h1>User Login</h1>
        <form onSubmit={onSubmit}>
          <div className="login-form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={onChange}
            />
          </div>
          <div className="login-form-group">
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
            Login
          </button>
        </form>
        <Link to="/register">Registrarse</Link>
      </div>
    </div>
  );
};

export default UserLogin;
