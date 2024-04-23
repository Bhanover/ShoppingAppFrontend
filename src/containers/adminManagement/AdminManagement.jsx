import React from "react";
import { Link } from "react-router-dom"; // Asumiendo que estás usando react-router para la navegación
import "./AdminManagement.css"; // Asegúrate de crear este archivo CSS para estilizar tu componente

const AdminManagement = () => {
  return (
    <div className="adminManagement">
      <h2>Panel de Administración</h2>
      <div className="managementOptions">
        <Link to="/category" className="option">
          Gestión de Categorías
        </Link>
        <Link to="/product-management" className="option">
          Gestión de Productos
        </Link>
        <Link to="/user-management" className="option">
          Gestión de Usuarios
        </Link>
        {/* Agrega más opciones según sea necesario */}
      </div>
    </div>
  );
};

export default AdminManagement;
