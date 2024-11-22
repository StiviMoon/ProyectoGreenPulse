import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "../Styles/AirQualityMonitor.css";

const AirQualityChart = ({ zones, pm10Avg, pm25Avg, colors, descriptions }) => {
  const [chartSize, setChartSize] = useState({
    width: window.innerWidth > 768 ? 700 : 360,
    height: window.innerWidth > 768 ? 400 : 360,
  });

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
    <Plot
      data={[
        {
          x: zones,
          y: pm10Avg,
          type: "bar",
          name: "PM10 Promedio",
          marker: { color: colors },
          hovertemplate:
            "<b>%{x}</b><br>PM10 Promedio: %{y:.2f} μg/m³<br>Calidad: %{hovertext}<extra></extra>",
          hovertext: descriptions,
        },
        {
          x: zones,
          y: pm25Avg,
          type: "bar",
          name: "PM2.5 Promedio",
          marker: { color: colors },
          hovertemplate:
            "<b>%{x}</b><br>PM2.5 Promedio: %{y:.2f} μg/m³<br>Calidad: %{hovertext}<extra></extra>",
          hovertext: descriptions,
        },
      ]}
      layout={{
        title: "Calidad del Aire por Zona",
        xaxis: { title: "Zona" },
        yaxis: { title: "Concentración (μg/m³)" },
        barmode: "group",
        width: chartSize.width,
        height: chartSize.height,
      }}
    />
  );
};

export default AirQualityChart;
