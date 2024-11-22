import React, { useState, useEffect } from "react";
import "../Styles/Sidebar.css";
import { FaHome, FaMap, FaMapSigns, FaDatabase, FaBars } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom"; // Importar Link para manejar rutas
import logo from "../../public/img/1SLogo.png"; // Ruta desde public

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 769);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button className="menu-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        
        <div className="contenedor-img">
          <img className="img-logo" src={logo} alt="LogoGreen" />
        </div>
        <div className="contenedor-ul">
        <ul>
          
          <li>
            <Link to="/">
              <FaHome className="icon" /> Inicio
            </Link>
          </li>
          <li>
            <Link to="/map">
              <FaMap className="icon" /> Mapa
            </Link>
          </li>
          <li>
            <Link to="/green-route">
              <FaMapSigns className="icon" /> Ruta Verde
            </Link>
          </li>
          <li>
            <Link to="/notifications">
              <IoMdNotifications className="icon" /> Notificaciones
            </Link>
          </li>
          <li>
            <Link to="/data">
              <FaDatabase className="icon" /> Datos
            </Link>
          </li>
        </ul>
        </div>
       
      </div>
    </>
  );
};

export default Sidebar;
