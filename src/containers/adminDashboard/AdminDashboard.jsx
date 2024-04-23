import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lastWindowWidth, setLastWindowWidth] = useState(window.innerWidth);
  const [manualToggle, setManualToggle] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setManualToggle(true);
  };

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
          <button onClick={toggleSidebar} className="sidebarToggle">
            {isSidebarOpen ? "<-" : "->"}
          </button>
          <Link to="/" className="sidebarLink">
            Página de Inicio
          </Link>
          <Link
            to="/admin-dashboard/category-management"
            className="sidebarLink"
          >
            Gestión de Categorías
          </Link>
          <Link
            to="/admin-dashboard/addClothing-management"
            className="sidebarLink"
          >
            Gestión de Ropa
          </Link>
        </div>
        <div className="adminDashboardContent">
          <h1>Admin Management</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
