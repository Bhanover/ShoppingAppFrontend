import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "../../components/logout/Logout";

// Componente encargado de gestionar el panel de administración
const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lastWindowWidth, setLastWindowWidth] = useState(window.innerWidth);
  const [manualToggle, setManualToggle] = useState(false);

  // Función para alternar la visibilidad de la barra lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setManualToggle(true);
  };

  // Efecto para manejar el cambio de tamaño de la ventana y ajustar la barra lateral
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (
        currentWidth < 860 &&
        currentWidth < lastWindowWidth &&
        isSidebarOpen &&
        !manualToggle
      ) {
        setIsSidebarOpen(false);
      }
      if (currentWidth > 860 && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
      setLastWindowWidth(currentWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen, lastWindowWidth, manualToggle]);

  return (
    <div className="adminDashboardMain">
      <div className="adminDashboard-container">
        <div
          className={`adminDashboardSidebar ${
            isSidebarOpen ? "expanded" : "collapsed"
          }`}
        >
          {/* Botón para alternar la barra lateral */}
          <button onClick={toggleSidebar} className="sidebarToggle">
            {isSidebarOpen ? (
              <FontAwesomeIcon icon={faChevronLeft} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} />
            )}
          </button>
          {/* Enlaces de la barra lateral */}
          <Link to="/admin-dashboard/management" className="sidebarLink">
            Inicio
          </Link>
          <Link
            to="/admin-dashboard/clothing-management"
            className="sidebarLink"
          >
            Agregar un producto
          </Link>
          <Link
            to="/admin-dashboard/delete-clothing-management"
            className="sidebarLink"
          >
            Eliminar un producto
          </Link>
          <Link
            to="/admin-dashboard/category-management"
            className="sidebarLink"
          >
            Gestión de Categorías
          </Link>
          <Link
            to="/admin-dashboard/subcategory-management"
            className="sidebarLink"
          >
            Gestión de SubCategorías
          </Link>
        </div>
        <div className="adminDashboardContent">
          {/* Barra superior */}
          <div className="adminDashboardContent-topBar">
            <div className="left"></div>
            <h1>Admin Management</h1>
            <div className="right">
              <Link to="/">
                <FontAwesomeIcon icon={faGlobe} />
              </Link>
              <Logout />
            </div>
          </div>
          {/* Área de contenido */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
