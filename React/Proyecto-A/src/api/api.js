// api.js
const API_URL = "http://localhost:8000/api/air-quality";

export const fetchAirQualityData = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al cargar los datos");
  }
  return await response.json();
};
