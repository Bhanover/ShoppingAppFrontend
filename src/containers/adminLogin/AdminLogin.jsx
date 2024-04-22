import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`ss/api/auth/signin`, formData)
      .then((response) => {
        localStorage.setItem("JwtToken", response.data.jwt);
        const isAdmin = response.data.roles.includes("ROLE_ADMIN");
        localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
        isAdmin
          ? navigate("/admin-dashboard/category-management")
          : navigate("/");
      })
      .catch((error) => {
        console.error("Error de autenticación:", error);
      });
  };

  return (
    <div className="adminMain">
      <img src="/static/logo_page/logo.svg" alt="logo" />
      <div className="admin-login-form">
        <h1>Admin Login</h1>
        <form onSubmit={onSubmit}>
          <div className="admin-login-form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={onChange}
            />
          </div>
          <div className="admin-login-form-group">
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
      </div>
    </div>
  );
};

export default AdminLogin;
