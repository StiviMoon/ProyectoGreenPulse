import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Table from "./Table";
import data from "../utils/data.json";
import "../Styles/Desplegable.css";
import WeatherWidget from './WeatherWidget';

const Desplegable = () => {
  const [selectedLugar, setSelectedLugar] = useState("");

  const handleSelectChange = (event) => {
    setSelectedLugar(event.target.value);
  };

  // Filtrar los datos según el lugar seleccionado
  const lugarData = data.find((item) => item.Lugar === selectedLugar);

  return (
    <div className="container">
      <h1>Datos Ambientales</h1>
      <Dropdown options={data} onChange={handleSelectChange} />
      {selectedLugar && <Table data={lugarData ? [lugarData] : []} />}
      {lugarData && (
        <WeatherWidget
          lugar={lugarData.Lugar}
          calidadAire={lugarData.Calidad_Aire}
          calidadRuido={lugarData.Calidad_Ruido}
          calidadSol={lugarData.Calidad_Sol}
        />
      )}
    </div>
  );
};

export default Desplegable;
