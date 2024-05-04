import axios from "axios";
import { useEffect, useState } from "react";
import style from "./cart.module.css";
import { loadStripe } from '@stripe/stripe-js';
import pago from '../../utils/mediodepago.jpg'
import { useCart } from "../../context/CartContext";

// eslint-disable-next-line react/prop-types
const stripePromise = loadStripe('pk_test_51PC0rYAFLsX4yRRtfNhMynZFDyciRdXkl2opdt0bg8O7dS7vNbYeJ4I37Pyi2jghENUOyHeBhJ8DQBaYA6htjqxJ00arJCJo9b');


const CartView = () => {
  const { removeProduct } = useCart();
  const [lisCart, setLisCart] = useState([]);
  const [infoCart, setInfoCart] = useState();
  const [refresh, setRefresh] = useState();
  console.log('info cart', infoCart);
  
  const axiosConfig = axios.create({ withCredentials: true });
  
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const body = {
        products: infoCart.products
      };

      const response = await axiosConfig.post('/api/payments/create-checkout-session', body);
  
      console.log(response.data.id);

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        const [cartResponse, productsResponse] = await Promise.all([
          axiosConfig.get(`/api/carts/${cartId}`),
          axiosConfig.get(`/api/products/`)
        ]);

        setInfoCart(cartResponse.data);

        const cartProducts = cartResponse.data.products;
        const allProducts = productsResponse.data;

        const cartProductIds = cartProducts.map((product) => product.product);
        const filteredProducts = allProducts.filter((product) =>
          cartProductIds.includes(product._id)
        );

        const productsWithQuantity = filteredProducts.map((product) => {
          const cartProduct = cartProducts.find((item) => item.product === product._id);
          return {
            ...product,
            quantity: cartProduct.quantity
          };
        });

        setLisCart(productsWithQuantity);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const deleteProduct = async (idProduct) => {
    try {
      await removeProduct(idProduct);
      setRefresh(!refresh);
      setLisCart(lisCart.filter((product) => product._id !== idProduct));
      localStorage.setItem("carrito", JSON.stringify(infoCart.products.length));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const increaseQuantity = async(idProduct) => {
    try {
      await axiosConfig.post(
        `/api/carts/product/${idProduct}`
      );
      setRefresh(!refresh);
      const updatedProducts = lisCart.map((product) => {
        if (product._id === idProduct) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setLisCart(updatedProducts);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const decreaseQuantity = async(idProduct) => {
    try {
      await axiosConfig.patch(
        `/api/carts/product/${idProduct}/decrease`
      );
      setRefresh(!refresh);
      const updatedProducts = lisCart.map((product) => {
        if (product._id === idProduct && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setLisCart(updatedProducts);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const totalPrice = () => {
    return lisCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };


  return (
    <div>
      <div style={{ display: "flex"}}>
        <div>
          <h6 className={style.textTitle}>Lista de productos</h6>
          <table className={style.tableStyle}>
            <thead>
              <tr>
                <th className={style.thStyle}>N°</th>
                <th className={style.thStyle}>Producto</th>
                <th className={style.thStyle}>Descripción</th>
                <th className={style.thStyle}>Cantidad</th>
                <th className={style.thStyle}>Precio Unitario</th>
                <th className={style.thStyle}>Precio Total</th>
                <th className={style.thStyle}>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {lisCart.map((ele, index) => (
                <tr key={ele._id}>
                  <td className={style.tdStyle}>{index + 1}</td>
                  <td className={style.tdStyle}>
                    <img
                      src={ele.thumbnail}
                      style={{ width: "220px", height: "177px" }}
                      alt="Producto"
                    />
                    <p>{ele.title}</p>
                  </td>
                  <td className={style.tdStyle}>{ele.description}</td>
                  <td className={style.tdStyle}>
                    {/* Botón para disminuir cantidad */}
                    <button className={style.button2} onClick={() => decreaseQuantity(ele._id)}>-</button>
                    <span>{ele.quantity}</span>
                    {/* Botón para aumentar cantidad */}
                    <button className={style.button2} onClick={() => increaseQuantity(ele._id)}>+</button>
                  </td>
                  <td className={style.tdStyle}>${ele.price}</td>
                  <td className={style.tdStyle}>
                  ${(ele.price * ele.quantity).toFixed(2)}
                  </td>{" "}
                  {/* Precio Total */}
                  <td className={style.tdStyle}>
                    <button
                      onClick={() => deleteProduct(ele._id)}
                      className={style.btnDelete}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={style.totalBox}>
          <div className={style.imagen}>
            <img className={style.imagenPago} src={pago} alt="" />
          </div>
          <div className={style.total}>
            <h2>Total:  ${totalPrice().toFixed(2)}</h2>
          </div>
          <button className={style.button} onClick={handlePayment}>Pagar</button>
        </div>
      </div>
    </div>
  );
  
};

export default CartView;
