import axios from "axios";
import { useEffect, useState } from "react";
import style from "./cart.module.css";

// eslint-disable-next-line react/prop-types
const CartView = ({ listCartProducts }) => {
  const [lisCart, setLisCart] = useState([]);

  const miCarrito = async () => {
    try {
      const response = await axios.get(`/api/products/`);
      const allProducts = response.data;
      const cartProductIds = listCartProducts.map((product) => product.product);
      const filteredProducts = allProducts.filter((product) =>
        cartProductIds.includes(product._id)
      );
      const productsWithQuantity = filteredProducts.map((product) => {
        const cartProduct = listCartProducts.find((item) => item.product === product._id);
        return {
          ...product,
          quantity: cartProduct.quantity
        };
      });
      setLisCart(productsWithQuantity);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const removeProduct = (id) => {
    setLisCart(lisCart.filter((product) => product._id !== id));
  };

  const increaseQuantity = (id) => {
    const updatedProducts = lisCart.map((product) => {
      if (product._id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setLisCart(updatedProducts);
  };

  const decreaseQuantity = (id) => {
    const updatedProducts = lisCart.map((product) => {
      if (product._id === id && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setLisCart(updatedProducts);
  };

  const totalPrice = () => {
    return lisCart?.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  useEffect(() => {
    miCarrito(); // Obtener todos los productos y actualizar el carrito
  }, [listCartProducts]); // Escucha cambios en listCartProducts para volver a obtener productos si cambian

  return (
    <div>
      <h6 className={style.textTitle}>Lista de productos </h6>
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
            <tr key={ele.id}>
              <td className={style.tdStyle}>{index + 1}</td>
              <td className={style.tdStyle}>
                <img
                  src={ele.image}
                  style={{ width: "285px", height: "177px" }}
                  alt="Producto"
                />
                <p>{ele.title}</p>
              </td>
              <td className={style.tdStyle}>{ele.description}</td>
              <td className={style.tdStyle}>
                {/* Botón para disminuir cantidad */}
                <button onClick={() => decreaseQuantity(ele._id)}>-</button>
                <span>{ele.quantity}</span>
                {/* Botón para aumentar cantidad */}
                <button onClick={() => increaseQuantity(ele._id)}>+</button>
              </td>
              <td className={style.tdStyle}>${ele.price}</td>
              <td className={style.tdStyle}>
                ${ele.price * ele.quantity}
              </td>{" "}
              {/* Precio Total */}
              <td className={style.tdStyle}>
                <button
                  onClick={() => removeProduct(ele._id)}
                  className={style.btnDelete}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.total}>
        <h2 style={{ marginBottom: "2rem" }}>Total: ${totalPrice()}</h2>
      </div>
    </div>
  );
};

export default CartView;
