import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  // Tabla de referencia ICA
const ICA_REFERENCE = {
  "Buena": { PM10: [0, 54], PM2_5: [0, 12], color: "#8BC34A", description: "Verde: Buena" },
  "Moderada": { PM10: [55, 154], PM2_5: [13, 37], color: "#FFEB3B", description: "Amarillo: Moderada" },
  "Dañina para grupos sensibles": { PM10: [155, 254], PM2_5: [38, 55], color: "#F28D35", description: "Naranja: Dañina para grupos sensibles" },
  "Dañina a la salud": { PM10: [255, 354], PM2_5: [56, 150], color: "#EC3F2D", description: "Rojo: Dañina a la salud" },
  "Muy dañina a la salud": { PM10: [355, 424], PM2_5: [151, 250], color: "#812B7A", description: "Púrpura: Muy dañina a la salud" },
  "Peligrosa": { PM10: [425, 604], PM2_5: [251, 500], color: "#66321B", description: "Marrón: Peligrosa" },
};

// Función para determinar el color según la calidad del aire
function getAirQualityColor(PM10, PM2_5) {
  for (let key in ICA_REFERENCE) {
    const range = ICA_REFERENCE[key];
    if (PM10 >= range.PM10[0] && PM10 <= range.PM10[1] && PM2_5 >= range.PM2_5[0] && PM2_5 <= range.PM2_5[1]) {
      return range.color;
    }
  }
  return "#000000"; // Color por defecto (negro) si no entra en ningún rango
}

// Simulación de calidad del aire para cada zona (estos valores serían reemplazados por los reales)
const airQualityData = [
  { PM10: 30, PM2_5: 8 },  // Ecoparque Corazón de Pance (Buena)
  { PM10: 70, PM2_5: 20 },  // Ecoparque Las Garzas (Moderada)
  { PM10: 200, PM2_5: 50 }, // Universidad San Buenaventura (Dañina para grupos sensibles)
  { PM10: 300, PM2_5: 100 }, // Universidad ICESI (Dañina a la salud)
  { PM10: 400, PM2_5: 200 }, // Universidad Autónoma de Occidente (Muy dañina a la salud)
  { PM10: 50, PM2_5: 12 },  // Universidad Javeriana (Buena)
  { PM10: 60, PM2_5: 20 },  // Fundación Universitaria San Martin (Moderada)
  { PM10: 120, PM2_5: 40 }, // Universidad Libre (Dañina para grupos sensibles)
  { PM10: 80, PM2_5: 30 },  // Colegio Bennett (Moderada)
  { PM10: 45, PM2_5: 9 },   // Colegio Nuevo Cambridge (Buena)
  { PM10: 42, PM2_5: 10 },  // Club Campestre Cali (Buena)
  {PM10: 300, PM2_5: 100 }, // Universidad Católica Meléndez (Dañina a la salud)
  { PM10: 33, PM2_5: 9 },   // Holguines Trade Center (Buena)
  { PM10: 160, PM2_5: 70 },  // Universidad Santiago de Cali (Dañina para grupos sensibles)
  { PM10: 45, PM2_5: 9  },  // Zonamérica (Dañina para grupos sensibles)
  { PM10: 190, PM2_5: 80 },  // Fundación Valle del Lili (Dañina a la salud)
  { PM10: 45, PM2_5: 9 }, // Colegio Nuestra Señora del Rosario 
  { PM10: 200, PM2_5: 50 },  // Condominio Bagatelle (Dañina para grupos sensibles)
];

  // Lista de nodos e instituciones con sus coordenadas y configuración de círculos
  // Ubicaciones con colores dinámicos basados en la calidad del aire
const locations = [
  { name: "Ecoparque Corazón de Pance", lat: 3.346318, lon: -76.551716, radius: 400, color: getAirQualityColor(airQualityData[0].PM10, airQualityData[0].PM2_5) },
  { name: "Ecoparque Las Garzas", lat: 3.332191, lon: -76.537009, radius: 400, color: getAirQualityColor(airQualityData[1].PM10, airQualityData[1].PM2_5) },
  { name: "Universidad San Buenaventura", lat: 3.345536, lon: -76.544498, radius: 400, color: getAirQualityColor(airQualityData[2].PM10, airQualityData[2].PM2_5) },
  { name: "Universidad ICESI", lat: 3.342216, lon: -76.530548, radius: 400, color: getAirQualityColor(airQualityData[3].PM10, airQualityData[3].PM2_5) },
  { name: "Universidad Autónoma de Occidente", lat: 3.353909, lon: -76.522698, radius: 400, color: getAirQualityColor(airQualityData[4].PM10, airQualityData[4].PM2_5) },
  { name: "Universidad Javeriana", lat: 3.348833, lon: -76.531648, radius: 400, color: getAirQualityColor(airQualityData[5].PM10, airQualityData[5].PM2_5) },
  { name: "Fundación Universitaria San Martin", lat: 3.341744, lon: -76.521554, radius: 400, color: getAirQualityColor(airQualityData[6].PM10, airQualityData[6].PM2_5) },
  { name: "Universidad Libre", lat: 3.360396, lon: -76.526303, radius: 400, color: getAirQualityColor(airQualityData[7].PM10, airQualityData[7].PM2_5) },
  { name: "Colegio Bennett", lat: 3.358739, lon: -76.531051, radius: 400, color: getAirQualityColor(airQualityData[8].PM10, airQualityData[8].PM2_5) },
  { name: "Colegio Nuevo Cambridge", lat: 3.337370, lon: -76.537795, radius: 400, color: getAirQualityColor(airQualityData[9].PM10, airQualityData[9].PM2_5) },
  { name: "Club Campestre Cali", lat: 3.369167, lon: -76.542355, radius: 400, color: getAirQualityColor(airQualityData[10].PM10, airQualityData[10].PM2_5) },
  { name: "Universidad Católica Meléndez", lat: 3.375333, lon: -76.545468, radius: 400, color: getAirQualityColor(airQualityData[11].PM10, airQualityData[11].PM2_5) },
  { name: "Holguines Trade Center", lat: 3.371799, lon: -76.539445, radius: 400, color: getAirQualityColor(airQualityData[12].PM10, airQualityData[12].PM2_5) },
  { name: "Universidad Santiago de Cali", lat: 3.4034074, lon: -76.547067, radius: 400, color: getAirQualityColor(airQualityData[13].PM10, airQualityData[13].PM2_5) },
  { name: "Zonamérica", lat: 3.327979, lon: -76.521282, radius: 400, color: getAirQualityColor(airQualityData[14].PM10, airQualityData[14].PM2_5) },
  { name: "Fundación Valle del Lili", lat: 3.37272, lon: -76.52565, radius: 400, color: getAirQualityColor(airQualityData[15].PM10, airQualityData[15].PM2_5) },
  { name: "Colegio Nuestra Señora del Rosario", lat: 3.339056, lon: -76.52768, radius: 400, color: getAirQualityColor(airQualityData[16].PM10, airQualityData[16].PM2_5) },
  { name: "Condominio Bagatelle", lat: 3.364458, lon: -76.540323, radius: 400, color: getAirQualityColor(airQualityData[17].PM10, airQualityData[17].PM2_5) },
];

  // Calcular el centro del mapa basado en la media de las coordenadas
  const centerLat = locations.reduce((acc, location) => acc + location.lat, 0) / locations.length;
  const centerLon = locations.reduce((acc, location) => acc + location.lon, 0) / locations.length;

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <MapContainer
        center={[centerLat, centerLon]} // Centrado dinámico del mapa
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        {locations.map((location, index) => (
          <React.Fragment key={index}>
            <Marker position={[location.lat, location.lon]}>
              <Popup>{location.name}</Popup>
            </Marker>
            <Circle
              center={[location.lat, location.lon]}
              radius={location.radius} 
              pathOptions={{
                color: location.color,      // Color del borde
                weight: 1,                  // Grosor del borde
                opacity: 0.4,               // Opacidad del borde (0.5 es un valor moderado)
                fillColor: location.color,  // Color de relleno
                fillOpacity: 0.4          // Opacidad del relleno
              }}
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
