import React from 'react'
import "../Styles/Pages_M.css"
import CsvPlotter from '../Components/CsvPlotter'


const GreenRoute = () => {
  return (
    <div className="padre-contenedor">
      <div className='containers' >
        <h1>Ruta Verde</h1>
        <CsvPlotter/>
      </div>
    </div>
  )
}

export default GreenRoute