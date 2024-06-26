import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {showSuccessNotification, showErrorNotification} from "../utils/Toast"

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cartInfo, setCartInfo] = useState({});
  const [refresh, setRefresh] = useState();
  const axiosConfig = axios.create({
    withCredentials: true
  });

  const addToCart = async (_id) => {
    try {
      await axiosConfig.post(`/api/carts/product/${_id}`);
      showSuccessNotification('¡Se añadió al carrito con éxito!')

      setRefresh(!refresh);
      // Actualizar información del carrito después de agregar un producto
      fetchCartInfo();
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      showErrorNotification("Error al agregar el producto al carrito:")
    }
  };

  const removeProduct = async (idProduct) => {
    try {
      await axiosConfig.delete(
        `/api/carts/product/${idProduct}/delete`
      );
      setRefresh(!refresh);
      showSuccessNotification('¡Se elimino del carrito con éxito!')
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const fetchCartInfo = async () => {
    try {
      const cartId = localStorage.getItem("cartId");
      if (cartId) {
        const cartResponse = await axiosConfig.get(`/api/carts/${cartId}`);
        setCartInfo(cartResponse.data);
      } else {
        console.error("No se encontró ningún carrito en el localStorage.");
        setCartInfo({});
      }
    } catch (error) {
      console.error("Error al obtener los datos del carrito:", error);
      setCartInfo({});
    }
  };

  useEffect(() => {
    fetchCartInfo();
  }, [refresh]); // Se ejecuta solo una vez al montar el componente

  return (
    <CartContext.Provider value={{ cartInfo, addToCart, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};
