import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar1";
import Home from "./Pages/Home1";
import Map from "./Pages/Map1";
import GreenRoute from "./Pages/GreenRoute1";
import Notifications from "./Pages/Notifications1";
import Data from "./Pages/Data1";
import "../src/Styles/App.css";
import "leaflet/dist/leaflet.css";

import { NotificationProvider } from "./Components/NotificationContext"; // Importar el proveedor
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (

      <Router>
        <div className="contenedor-app">
          <Sidebar />

          <div className="contenedor-pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/green-route" element={<GreenRoute />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/data" element={<Data />} />
            </Routes>
          </div>
        </div>

      </Router>

  );
};

export default App;
