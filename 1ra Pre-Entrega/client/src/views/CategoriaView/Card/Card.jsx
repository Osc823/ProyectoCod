import { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import axios from "axios";

const CardCategoria = ({}) => {
  

  console.log('propiedades',props);
  return (
    <div className="row" style={{ margin: "0" }}>
      {props && props?.map((card, index) => (
        <div key={index} className="justify-content-center col-md-3 mb-4" style={{ padding: "0" }}>
          <Card
            titulo={card.titulo}
            contenido={card.contenido}
            imagen={card.imagen}
          />
        </div>
      ))}
    </div>
  );
};

export default CardCategoria;
