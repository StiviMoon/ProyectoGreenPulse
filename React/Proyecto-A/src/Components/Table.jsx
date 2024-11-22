import React from "react";

const Table = ({ data }) => {
  return (
    <div className="table-container">
      <h2>Datos para {data[0]?.Lugar}</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Calidad Aire</th>
            <th>Calidad Ruido</th>
            <th>Calidad Sol</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Fecha}</td>
              <td>{item.Calidad_Aire}</td>
              <td>{item.Calidad_Ruido}</td>
              <td>{item.Calidad_Sol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
