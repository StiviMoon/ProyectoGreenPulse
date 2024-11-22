import React from 'react'
import MapComponent from "../Components/MapComponent.jsx"
import AirQualityLegend from '../Components/AirQualityLegend.jsx'
import '../Styles/Pages_M.css'

const Map = () => {
  return (
    <div className='containers'>
      <h1>Mapa Ciudad de Cali</h1>
        <MapComponent/>
        <AirQualityLegend/>
    </div>
  )
}

export default Map