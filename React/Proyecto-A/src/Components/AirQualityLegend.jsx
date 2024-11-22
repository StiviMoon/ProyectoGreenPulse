import React from "react";
import { ICA_REFERENCE } from "../utils/utils";
import "../Styles/AirQualityLegend.css";

const AirQualityLegend = () => {
  const sinClasificacion = {
    categoria: "Sin clasificación",
    color: "#696969",
    description: "Sin clasificación: Datos fuera de parámetros",
  };

  const getLighterColor = (color) => {
    // Convertir el color hexadecimal a RGB y calcular un color más claro
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const lighten = (channel) => Math.min(255, Math.floor(channel + (255 - channel) * 0.8));

    return `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;
  };

  return (
    <div className="legend-container">
      {Object.entries(ICA_REFERENCE).map(([categoria, valores]) => (
        <div
          key={categoria}
          className="legend-item"
          style={{
            backgroundColor: getLighterColor(valores.color), // Fondo más claro
            borderColor: valores.color, // Borde con el color original
          }}
        >
          <div className="legend-content">
            <h4 className="legend-title">{categoria}</h4>
            <p className="legend-values">
              PM10: {valores.PM10[0]} - {valores.PM10[1]} µg/m³
              <br />
              PM2.5: {valores.PM2_5[0]} - {valores.PM2_5[1]} µg/m³
            </p>
          </div>
        </div>
      ))}
      <div
        className="legend-item"
        style={{
          backgroundColor: getLighterColor(sinClasificacion.color),
          borderColor: sinClasificacion.color,
        }}
      >
        <div className="legend-content">
          <h4 className="legend-title">{sinClasificacion.categoria}</h4>
          <p className="legend-description">{sinClasificacion.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AirQualityLegend;
