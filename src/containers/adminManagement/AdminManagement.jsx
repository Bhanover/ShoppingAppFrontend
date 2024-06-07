import React from "react";
import { Link } from "react-router-dom";
import "./AdminManagement.css";

// Componente para el panel de administración
const AdminManagement = () => {
  return (
    <div className="adminManagement">
      <h2>Panel de Administración</h2>
      <div className="managementOptions">
        {/* Enlaces a las diferentes secciones de gestión */}
        <Link to="/category" className="option">
          Gestión de Categorías
        </Link>
        <Link to="/product-management" className="option">
          Gestión de Productos
        </Link>
        <Link to="/user-management" className="option">
          Gestión de Usuarios
        </Link>
      </div>
    </div>
  );
};

export default AdminManagement;
