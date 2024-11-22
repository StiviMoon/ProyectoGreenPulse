import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React Frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/csv-data")
async def get_csv_data():
    csv_path = "path/to/your/MP.csv"
    try:
        df = pd.read_csv(csv_path)
        data = df[["FF_HH", "PM2_5Max", "PM2_5Min", "PM2_5Avg"]]
        data["PM2_5Max"] = data["PM2_5Max"].str.replace(",", ".").astype(float)
        data["PM2_5Min"] = data["PM2_5Min"].str.replace(",", ".").astype(float)
        data["PM2_5Avg"] = data["PM2_5Avg"].str.replace(",", ".").astype(float)
        return data.to_dict(orient="records")
    except FileNotFoundError:
        return {"error": "El archivo CSV no fue encontrado."}
    except Exception as e:
        return {"error": f"Ocurrió un error: {str(e)}"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
