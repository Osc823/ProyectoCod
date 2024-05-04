// En el componente Cards
import Card from "../Card/Card.jsx";
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


  return (
    <div className="row " style={{ margin: "0" }}>
      {product.map((card, index) => (
          <div key={index} className="justify-content-center col-md-3 mb-4" style={{ padding: "0" }}>
          <Card
            _id={card._id}
            title={card.title}
            description={card.description}
            thumbnail={card.thumbnail}
            price={card.price}
            userId={userId}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
