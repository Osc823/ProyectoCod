// En el componente Cards
// import React from "react";
import Card from "../Card/Card.jsx";
import zapa1 from "../../assets/zapa1.png"
import zapa2 from "../../assets/zapa2.png"
import zapa3 from "../../assets/zapa3.png"
import zapa4 from "../../assets/zapa4.png"
import zapa5 from "../../assets/zapa5.png"
import { useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Cards = ({userId}) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response =  await axios.get("/api/products/");
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener o crear el carrito:", error);
      }
    }

      fetchCart()

    }, []);

  const data = [
    {
      imagen: zapa1,
      title: "Título 1",
      description: "description de la tarjeta 1.",
    },
    {
      imagen: zapa2,
      title: "Título 2",
      description: "description de la tarjeta 2.",
    },
    {
      imagen: zapa3,
      title: "Título 3",
      description: "description de la tarjeta 3.",
    },
    {
      imagen: zapa4,
      title: "Título 4",
      description: "description de la tarjeta 4.",
    },
    {
      imagen: zapa5,
      title: "Título 5",
      description: "Contenido de la tarjeta 5.",
    },
  ];

  const unionData = [...data,...product]

  return (
    <div className="row " style={{ margin: "0" }}>
      {unionData.map((card, index) => (
          <div key={index} className="justify-content-center col-md-3 mb-4" style={{ padding: "0" }}>
          <Card
            _id={card._id}
            title={card.title}
            description={card.description}
            imagen={card.imagen}
            price={card.price}
            userId={userId}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
