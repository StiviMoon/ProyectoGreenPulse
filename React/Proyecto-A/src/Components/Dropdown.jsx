import React from "react";

const Dropdown = ({ options, onChange }) => {
  return (
    <div className="dropdown">
      <label htmlFor="lugar-select">Selecciona un lugar: </label>
      <select id="lugar-select" onChange={onChange}>
        <option value="">-- Selecciona un lugar --</option>
        {options.map((item, index) => (
          <option key={index} value={item.Lugar}>
            {item.Lugar}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
