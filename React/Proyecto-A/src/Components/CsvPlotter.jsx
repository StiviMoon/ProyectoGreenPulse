import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import '../Styles/CsvPlotter.css';

// Componente principal
const CsvPlotter = () => {
  const [data, setData] = useState(null); // Para almacenar los datos procesados

  // Función para cargar los datos desde el backend
  const loadCSV = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/csv-data');
      const jsonData = await response.json();
      // Procesar los datos recibidos
      setData(jsonData);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  // Usamos useEffect para cargar los datos al iniciar el componente
  useEffect(() => {
    loadCSV(); // Cargar los datos cuando el componente se monta
  }, []);

  // Configuración para la gráfica
  const plotData = {
    type: 'scatter',
    mode: 'lines+markers',
    x: data?.map((item) => item.FF_HH), // Eje X: Tiempo
    y: data?.map((item) => item.PM2_5Avg), // Eje Y: Promedio PM2.5
    name: 'PM2.5 Promedio',
  };

  const layout = {
    title: 'Gráfica de PM2.5',
    xaxis: { title: 'Fecha y Hora' },
    yaxis: { title: 'Concentración de PM2.5 (µg/m³)' },
  };

  return (
    <div className="csv-plotter">
      <h2>Gráfico de PM2.5 desde CSV</h2>
      {data ? (
        <Plot data={[plotData]} layout={layout} className="react-plotly-graph" />
      ) : (
        <p className="loading-message">Cargando datos del archivo CSV...</p>
      )}
    </div>
  );
};

export default CsvPlotter;
