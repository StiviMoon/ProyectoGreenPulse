export const ICA_REFERENCE = {
  "Buena": { PM10: [0, 54], PM2_5: [0, 12], color: "#8BC34A", description: "Verde: Buena" },
  "Moderada": { PM10: [55, 154], PM2_5: [13, 37], color: "#FFEB3B", description: "Amarillo: Moderada" },
  "Dañina para grupos sensibles": { PM10: [155, 254], PM2_5: [38, 55], color: "#F28D35", description: "Naranja: Dañina para grupos sensibles" },
  "Dañina a la salud": { PM10: [255, 354], PM2_5: [56, 150], color: "#EC3F2D", description: "Rojo: Dañina a la salud" },
  "Muy dañina a la salud": { PM10: [355, 424], PM2_5: [151, 250], color: "#812B7A", description: "Púrpura: Muy dañina a la salud" },
  "Peligrosa": { PM10: [425, 604], PM2_5: [251, 500], color: "#66321B", description: "Marrón: Peligrosa" },
}; 
 
// Función para obtener la calidad del aire individual
export const obtenerCalidadAire = (pm10, pm2_5) => {
  for (const [categoria, valores] of Object.entries(ICA_REFERENCE)) {
    const { PM10, PM2_5, color, description } = valores;
    if (pm10 >= PM10[0] && pm10 <= PM10[1] && pm2_5 >= PM2_5[0] && pm2_5 <= PM2_5[1]) {
      return { categoria, color, description };
    }
  }
  return { categoria: "Sin clasificación", color: "#696969", description: "Datos fuera de parámetros" };
};

// Función para calcular el promedio general de calidad del aire en todas las zonas
export const obtenerCalidadAirePromedio = (zonas) => {
  let totalPM10 = 0;
  let totalPM2_5 = 0;

  // Sumar los valores de PM10 y PM2.5 de todas las zonas
  zonas.forEach((zona) => {
    totalPM10 += zona.pm10;
    totalPM2_5 += zona.pm2_5;
  });

  // Calcular los promedios de PM10 y PM2.5
  const promedioPM10 = totalPM10 / zonas.length;
  const promedioPM2_5 = totalPM2_5 / zonas.length;

  // Obtener la calidad de aire basada en los promedios
  return obtenerCalidadAire(promedioPM10, promedioPM2_5);
};
