import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Card = ({ id, contenido, imagen, titulo }) => {
  const [idCart, setIdCart] = useState(null);
  const [cantidad, setCantidad] = useState(0); // Inicializar cantidad como un número

  const checkCart = async () => {
    try {
      const response = await axios.get(`/api/carts/${id}`);
      if (response.data.cart) {
        setIdCart(response.data.cart._id);
      } else {
        await createCart();
      }
    } catch (error) {
      console.error("Error al verificar el carrito:", error);
    }
  };

  const createCart = async () => {
    try {
      const response = await axios.post("/api/carts/");
      setIdCart(response.data.cart._id);
      setCantidad((prevCantidad) => prevCantidad + 1);
      console.log("Nuevo carrito creado:", response.data.cart._id);
    } catch (error) {
      console.error("Error al crear el carrito:", error);
    }
  };

  const addToCart = async () => {
    try {
      const response = await axios.post(`/api/carts/${idCart}/product/${id}`);
      console.log("Producto agregado al carrito:", response.data);
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };

  const handleCart = async () => {
    if (cantidad == 1) {
      await addToCart();
    } else {
      await createCart();
    }
  };

  useEffect(() => {
    checkCart();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ width: "80%" }}>
        <img
          src={imagen}
          alt="Descripción de la imagen"
          className="card-img-top"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{contenido}.</p>
          <div onClick={handleCart}>
            <button className="btn btn-primary">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
