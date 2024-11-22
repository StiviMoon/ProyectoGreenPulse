import React from "react";
import "../Styles/WeatherWidget.css";

const WeatherWidget = ({ lugar, calidadAire, calidadRuido, calidadSol }) => {
  return (
    <div className="weather-widget">
      <h3>{lugar}</h3>
      <div className="widget-section">
        <div className="widget-item">
          <span className="widget-icon">☀️</span>
          <p className="widget-label">Calidad del Sol</p>
          <p className="widget-value">{calidadSol}</p>
        </div>
        <div className="widget-item">
          <span className="widget-icon">🌬️</span>
          <p className="widget-label">Calidad del Aire</p>
          <p className="widget-value">{calidadAire}</p>
        </div>
        <div className="widget-item">
          <span className="widget-icon">🔇</span>
          <p className="widget-label">Calidad del Ruido</p>
          <p className="widget-value">{calidadRuido}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
