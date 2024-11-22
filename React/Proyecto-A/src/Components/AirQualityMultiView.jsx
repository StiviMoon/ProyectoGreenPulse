import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "../Styles/AirQualityMonitor.css"; // Importa el archivo de estilos

const AirQualityMultiView = ({ zones, pm10Avg, pm25Avg, colors, descriptions }) => {
  const [chartType, setChartType] = useState("line");
  const [chartSize, setChartSize] = useState({
    width: window.innerWidth > 768 ? 700 : 360,
    height: window.innerWidth > 768 ? 400 : 360,
  });

  const toggleChartType = () => {
    setChartType(chartType === "line" ? "area" : "line");
  };

  useEffect(() => {
    const handleResize = () => {
      setChartSize({
        width: window.innerWidth > 768 ? 700 : 360,
        height: window.innerWidth > 768 ? 400 : 360,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    
      <div>
        <div className="contenedor-btn">
        <button onClick={toggleChartType} className="btn-cambiar-grafico">
        Cambiar a {chartType === "line" ? "Área Apilado" : "Líneas"}
        </button>
        </div>
        
      {chartType === "line" ? (
        <Plot
          data={[
            {
              x: zones,
              y: pm10Avg,
              type: "scatter",
              mode: "lines+markers",
              name: "PM10 Promedio",
              line: { color: "#FF5733" },
              marker: { color: colors },
              hovertemplate:
                "<b>%{x}</b><br>PM10 Promedio: %{y:.2f} μg/m³<br>Calidad: %{hovertext}<extra></extra>",
              hovertext: descriptions,
            },
            {
              x: zones,
              y: pm25Avg,
              type: "scatter",
              mode: "lines+markers",
              name: "PM2.5 Promedio",
              line: { color: "#3375FF" },
              marker: { color: colors },
              hovertemplate:
                "<b>%{x}</b><br>PM2.5 Promedio: %{y:.2f} μg/m³<br>Calidad: %{hovertext}<extra></extra>",
              hovertext: descriptions,
            },
          ]}
          layout={{
            title: "Calidad del Aire por Zona (Líneas)",
            xaxis: { title: "Zona" },
            yaxis: { title: "Concentración (μg/m³)" },
            width: chartSize.width,
            height: chartSize.height,
          }}
        />
      ) : (
        <Plot
          data={[
            {
              x: zones,
              y: pm10Avg,
              type: "scatter",
              mode: "lines",
              stackgroup: "one",
              name: "PM10 Promedio",
              line: { color: "#FF5733" },
              hovertemplate:
                "<b>Zona: %{x}</b><br>PM10 Promedio: %{y:.2f} μg/m³<extra></extra>",
            },
            {
              x: zones,
              y: pm25Avg,
              type: "scatter",
              mode: "lines",
              stackgroup: "one",
              name: "PM2.5 Promedio",
              line: { color: "#3375FF" },
              hovertemplate:
                "<b>Zona: %{x}</b><br>PM2.5 Promedio: %{y:.2f} μg/m³<extra></extra>",
            },
          ]}
          layout={{
            title: "Calidad del Aire por Zona (Área Apilada)",
            xaxis: { title: "Zona" },
            yaxis: { title: "Acumulada (μg/m³)" },
            width: chartSize.width,
            height: chartSize.height,
          }}
        />
      )}
    </div>

    
  );
};

export default AirQualityMultiView;
