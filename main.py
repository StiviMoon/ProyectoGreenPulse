from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],  # Permitir solicitudes solo desde React (puerto 5173)
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los encabezados
)


# Modelo de datos de calidad del aire
class AirQualityReading(BaseModel):
    PM10: int
    PM2_5: int


class AirQualityZone(BaseModel):
    zona: str
    datos: List[AirQualityReading]


# Datos de calidad del aire
# Datos de calidad del aire
air_quality_data = [
    {
        "zona": "Zona Verde",
        "datos": [{"PM10": 30, "PM2_5": 8}, {"PM10": 40, "PM2_5": 10}],
    },
    {
        "zona": "Zona Amarilla",
        "datos": [{"PM10": 70, "PM2_5": 20}, {"PM10": 100, "PM2_5": 35}],
    },
    {
        "zona": "Zona Naranja",
        "datos": [{"PM10": 200, "PM2_5": 50}, {"PM10": 150, "PM2_5": 40}],
    },
    {
        "zona": "Zona Roja",
        "datos": [{"PM10": 300, "PM2_5": 100}, {"PM10": 250, "PM2_5": 140}],
    },
    {
        "zona": "Zona Púrpura",
        "datos": [{"PM10": 400, "PM2_5": 200}, {"PM10": 370, "PM2_5": 230}],
    },
    {
        "zona": "Zona Marrón",
        "datos": [{"PM10": 500, "PM2_5": 300}, {"PM10": 550, "PM2_5": 400}],
    },
]

air_quality_data_2 = [
    {"zona": "Zona1", "datos": [{"PM10": 30, "PM2_5": 9}, {"PM10": 40, "PM2_5": 12}]},
    {
        "zona": "Zona2",
        "datos": [{"PM10": 120, "PM2_5": 50}, {"PM10": 115, "PM2_5": 48}],
    },
    {
        "zona": "Zona3",
        "datos": [{"PM10": 190, "PM2_5": 80}, {"PM10": 185, "PM2_5": 75}],
    },
    {
        "zona": "Zona4",
        "datos": [{"PM10": 300, "PM2_5": 150}, {"PM10": 280, "PM2_5": 140}],
    },
    {"zona": "Zona5", "datos": [{"PM10": 20, "PM2_5": 5}, {"PM10": 25, "PM2_5": 7}]},
    {
        "zona": "Zona6",
        "datos": [{"PM10": 140, "PM2_5": 60}, {"PM10": 130, "PM2_5": 55}],
    },
    {"zona": "Zona7", "datos": [{"PM10": 50, "PM2_5": 10}, {"PM10": 45, "PM2_5": 12}]},
    {
        "zona": "Zona8",
        "datos": [{"PM10": 250, "PM2_5": 120}, {"PM10": 240, "PM2_5": 110}],
    },
    {"zona": "Zona9", "datos": [{"PM10": 80, "PM2_5": 30}, {"PM10": 85, "PM2_5": 32}]},
    {"zona": "Zona10", "datos": [{"PM10": 60, "PM2_5": 25}, {"PM10": 65, "PM2_5": 27}]},
    {
        "zona": "Zona11",
        "datos": [{"PM10": 350, "PM2_5": 180}, {"PM10": 360, "PM2_5": 190}],
    },
    {"zona": "Zona12", "datos": [{"PM10": 45, "PM2_5": 18}, {"PM10": 50, "PM2_5": 20}]},
    {"zona": "Zona13", "datos": [{"PM10": 15, "PM2_5": 4}, {"PM10": 18, "PM2_5": 6}]},
    {
        "zona": "Zona14",
        "datos": [{"PM10": 500, "PM2_5": 250}, {"PM10": 520, "PM2_5": 260}],
    },
    {"zona": "Zona15", "datos": [{"PM10": 90, "PM2_5": 40}, {"PM10": 95, "PM2_5": 45}]},
    {
        "zona": "Zona16",
        "datos": [{"PM10": 160, "PM2_5": 70}, {"PM10": 170, "PM2_5": 75}],
    },
    {
        "zona": "Zona17",
        "datos": [{"PM10": 120, "PM2_5": 55}, {"PM10": 125, "PM2_5": 57}],
    },
    {"zona": "Zona18", "datos": [{"PM10": 60, "PM2_5": 20}, {"PM10": 70, "PM2_5": 22}]},
]

air_quality_data_3 = [
    {"zona": "Zona1", "datos": [{"PM10": 30, "PM2_5": 8}, {"PM10": 40, "PM2_5": 10}]},
    {"zona": "Zona2", "datos": [{"PM10": 45, "PM2_5": 9}, {"PM10": 35, "PM2_5": 7}]},
    {"zona": "Zona3", "datos": [{"PM10": 50, "PM2_5": 11}, {"PM10": 45, "PM2_5": 10}]},
    {"zona": "Zona4", "datos": [{"PM10": 40, "PM2_5": 8}, {"PM10": 39, "PM2_5": 9}]},
    {"zona": "Zona5", "datos": [{"PM10": 38, "PM2_5": 6}, {"PM10": 30, "PM2_5": 5}]},
    {"zona": "Zona6", "datos": [{"PM10": 42, "PM2_5": 10}, {"PM10": 41, "PM2_5": 9}]},
    {"zona": "Zona7", "datos": [{"PM10": 32, "PM2_5": 7}, {"PM10": 33, "PM2_5": 8}]},
    {"zona": "Zona8", "datos": [{"PM10": 43, "PM2_5": 10}, {"PM10": 44, "PM2_5": 11}]},
    {"zona": "Zona9", "datos": [{"PM10": 50, "PM2_5": 12}, {"PM10": 48, "PM2_5": 11}]},
    {"zona": "Zona10", "datos": [{"PM10": 29, "PM2_5": 5}, {"PM10": 35, "PM2_5": 6}]},
    {"zona": "Zona11", "datos": [{"PM10": 33, "PM2_5": 9}, {"PM10": 34, "PM2_5": 8}]},
    {"zona": "Zona12", "datos": [{"PM10": 31, "PM2_5": 6}, {"PM10": 32, "PM2_5": 7}]},
    {"zona": "Zona13", "datos": [{"PM10": 40, "PM2_5": 8}, {"PM10": 36, "PM2_5": 7}]},
    {"zona": "Zona14", "datos": [{"PM10": 28, "PM2_5": 4}, {"PM10": 30, "PM2_5": 5}]},
    {"zona": "Zona15", "datos": [{"PM10": 34, "PM2_5": 7}, {"PM10": 38, "PM2_5": 8}]},
    {"zona": "Zona16", "datos": [{"PM10": 41, "PM2_5": 9}, {"PM10": 37, "PM2_5": 8}]},
    {"zona": "Zona17", "datos": [{"PM10": 33, "PM2_5": 6}, {"PM10": 32, "PM2_5": 7}]},
    {"zona": "Zona18", "datos": [{"PM10": 29, "PM2_5": 5}, {"PM10": 30, "PM2_5": 6}]},
]


# Ruta para obtener los datos de calidad del aire
@app.get("/api/air-quality", response_model=List[AirQualityZone])
async def get_air_quality():
    return air_quality_data_3
