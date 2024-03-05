// En el componente Cards
// import React from "react";
import Card from "../Card/Card.jsx";
import zapa1 from "../../assets/zapa1.png"
import zapa2 from "../../assets/zapa2.png"
import zapa3 from "../../assets/zapa3.png"
import zapa4 from "../../assets/zapa4.png"
import zapa5 from "../../assets/zapa5.png"

const Cards = () => {
  const data = [
    {
      imagen: zapa1,
      titulo: "Título 1",
      contenido: "Contenido de la tarjeta 1.",
    },
    {
      imagen: zapa2,
      titulo: "Título 2",
      contenido: "Contenido de la tarjeta 2.",
    },
    {
      imagen: zapa3,
      titulo: "Título 3",
      contenido: "Contenido de la tarjeta 3.",
    },
    {
      imagen: zapa4,
      titulo: "Título 4",
      contenido: "Contenido de la tarjeta 4.",
    },
    {
      imagen: zapa5,
      titulo: "Título 5",
      contenido: "Contenido de la tarjeta 5.",
    },
  ];


  return (
    <div className="row " style={{ margin: "0" }}>
      {data.map((card, index) => (
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

export default Cards;
