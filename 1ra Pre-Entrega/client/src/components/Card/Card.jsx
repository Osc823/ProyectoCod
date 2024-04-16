import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Card = ({ _id, price, imagen, title, userId }) => {
  const [cartId, setCartId] = useState();


  const fetchCart = async () => {
    try {
      const response = await axios.get(`/api/carts/user/${userId}`);
      setCartId(response.data._id); // Ajusta según la propiedad correcta de la respuesta
    } catch (error) {
      console.error('Error fetching user cart:', error);
      throw error; // Reenvía el error para manejarlo en el contexto donde se llame a la función
    }
  };

  const addToCart = async () => {
    try {
      console.log('Nombre', cartId);
      await axios.post(`/api/carts/${cartId}/product/${_id}/user/${userId}`);
      console.log("Producto agregado al carrito exitosamente");
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };

  useEffect(() => {
    const idUserFromLocalStorage = localStorage.getItem("userId");
    fetchCart(idUserFromLocalStorage);
    
  }, [userId]);

  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ width: "80%" }}>
        <img src={imagen} alt="Descripción de la imagen" className="card-img-top" />
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{price}.</p>
          <div onClick={addToCart}>
            <button className="btn btn-primary">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
