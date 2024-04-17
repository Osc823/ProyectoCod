// import React from 'react'

import Bars from "./GraficoBarrasView/GraficoBarrasView"
import Pies from "./GraficoTortaView/GraficoTortaView"

const Estadisticas = () => {
  return (
    <div>
      <div>
        <p className="m-2">
          <b>Top 10 mas vendidos </b>
        </p>
        <div
          className="bg-light mx-auto px-2 border border-2 border-primary"
          style={{ width: '450px', height: '225px' }}
        >
          <Pies />
        </div>
      </div>
      <div>
        <p className="m-2">
          <b>Top 10 mas vendidos </b>
        </p>
        <div
          className="bg-light mx-auto px-2 border border-2 border-primary"
          style={{ width: '450px', height: '225px' }}
        >
          <Bars />
        </div>
      </div>
    </div>
  )
}

export default Estadisticas