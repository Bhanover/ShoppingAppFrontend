import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import UseService from "../../service/UserService";
import { toast } from "react-toastify";
import "./Logout.css";
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await UseService.logout();
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("isAdmin");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      toast.error("No se pudo cerrar la sesión correctamente.");
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button" title="Logout">
      <FontAwesomeIcon icon={faSignOutAlt} />
      <span>Cerrar Sesión</span>
    </button>
  );
};

export default Logout;
