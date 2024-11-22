import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AirQualityChart from "./AirQualityChart";
import AirQualityLegend from "./AirQualityLegend";
import { fetchAirQualityData } from "../api/api";
import { obtenerCalidadAire } from "../utils/utils";
import AirQualityMultiView from "./AirQualityMultiView";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/AirQualityMonitor.css";

function AirQualityMonitor() {
  const [airData, setAirData] = useState([]);
  const [airQuality, setAirQuality] = useState({
    categoria: "Desconocida",
    color: "#000000",
    description: "",
  });

  const fetchData = () => {
    fetchAirQualityData()
      .then((data) => {
        setAirData(data);

        // Calcular el promedio de PM10 y PM2.5 en todas las zonas
        const pm10Sum = data.reduce((sum, zone) => sum + zone.datos.reduce((s, r) => s + r.PM10, 0), 0);
        const pm25Sum = data.reduce((sum, zone) => sum + zone.datos.reduce((s, r) => s + r.PM2_5, 0), 0);
        const totalReadings = data.reduce((count, zone) => count + zone.datos.length, 0);
        const pm10Avg = pm10Sum / totalReadings;
        const pm25Avg = pm25Sum / totalReadings;

        console.log(`Promedio de PM10: ${pm10Avg}, Promedio de PM2.5: ${pm25Avg}`);

        // Obtener la calidad general del aire
        const quality = obtenerCalidadAire(pm10Avg, pm25Avg);
        setAirQuality(quality);
        console.log(quality)

        // Mostrar alertas basadas en las categorías de calidad del aire
        switch (quality.categoria) {
          case "Peligrosa":
            toast.error(`Alerta extrema: La calidad del aire es "Peligrosa". PM10: ${pm10Avg.toFixed(2)}, PM2.5: ${pm25Avg.toFixed(2)}`, {
              position: "top-right",
              autoClose: 5000,
              className: "custom-toast-danger",
            });
            break;
          case "Muy dañina a la salud":
            toast.error(`Alerta crítica: La calidad del aire es "Muy dañina a la salud". PM10: ${pm10Avg.toFixed(2)}, PM2.5: ${pm25Avg.toFixed(2)}`, {
              position: "top-right",
              autoClose: 5000,
              className: "custom-toast-danger",
            });
            break;
          case "Dañina a la salud":
            toast.warn(`Alerta: La calidad del aire es "Dañina a la salud". PM10: ${pm10Avg.toFixed(2)}, PM2.5: ${pm25Avg.toFixed(2)}`, {
              position: "top-right",
              autoClose: 5000,
              className: "custom-toast-warning",
            });
            break;
          case "Dañina a la salud para grupos sensibles":
            toast.warn(`Advertencia: La calidad del aire puede ser dañina para grupos sensibles. PM10: ${pm10Avg.toFixed(2)}, PM2.5: ${pm25Avg.toFixed(2)}`, {
              position: "top-right",
              autoClose: 5000,
              className: "custom-toast-warning",
            });
            break;
          case "Moderada":
            toast.info("La calidad del aire es Moderada. Mantente informado de los cambios.", {
              position: "top-right",
              autoClose: 4000,
              className: "custom-toast-info",
            });
            break;
          case "Buena":
            toast.success("¡Buen trabajo! La calidad del aire es Excelente.", {
              position: "top-right",
              autoClose: 4000,
              className: "custom-toast-success",
            });
            break;

          case "Sin clasificación":
             toast.warn("¡Sin Clasificación! Los datos sobrepasan los parametros", {
              position: "top-right",
              autoClose: 4000,
              className: "custom-toast-success",
            });
            break;
          default:
            toast.info("Calidad del aire desconocida. Datos no disponibles.", {
              position: "top-right",
              autoClose: 4000,
              className: "custom-toast-info",
            });
            break;
        }
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 20000); // Actualizar cada 40 segundos
    return () => clearInterval(intervalId);
  }, []);

  const processGraphData = () => {
    const zones = airData.map((zone) => zone.zona);
    const pm10Avg = airData.map((zone) => {
      const pm10Sum = zone.datos.reduce((sum, reading) => sum + reading.PM10, 0);
      return pm10Sum / zone.datos.length;
    });
    const pm25Avg = airData.map((zone) => {
      const pm25Sum = zone.datos.reduce((sum, reading) => sum + reading.PM2_5, 0);
      return pm25Sum / zone.datos.length;
    });
    const colors = airData.map((zone, index) => {
      const quality = obtenerCalidadAire(pm10Avg[index], pm25Avg[index]);
      return quality.color;
    });
    const descriptions = airData.map((zone, index) => {
      const quality = obtenerCalidadAire(pm10Avg[index], pm25Avg[index]);
      return quality.description;
    });
    return { zones, pm10Avg, pm25Avg, colors, descriptions };
  };

  const { zones, pm10Avg, pm25Avg, colors, descriptions } = processGraphData();

  return (
    <div className="padre-contenedor">
      <div className="container">
      <h2 className="header">Promedio de Calidad del Aire</h2>
      <div className="air-quality-summary"  
      style={{
          backgroundColor: `${airQuality.color}6A`, // Color con transparencia (6 caracteres) para fondo
          borderColor: airQuality.color,
          
        }}>
        <p><strong>{airQuality.categoria} <br/> {airQuality.description} </strong></p>
      </div>
      <div className="container-grafico">
        <AirQualityChart zones={zones} pm10Avg={pm10Avg} pm25Avg={pm25Avg} colors={colors} descriptions={descriptions} />
      </div>
      <div className="container-grafico">
        <AirQualityMultiView zones={zones} pm10Avg={pm10Avg} pm25Avg={pm25Avg} colors={colors} descriptions={descriptions} />
      </div>
      
      <AirQualityLegend />
      <ToastContainer />
    </div>
    </div>
  );
}

export default AirQualityMonitor;
