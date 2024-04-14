import axios from "axios";
import { useEffect, useState } from "react";
import style from "./cart.module.css";

const CartView = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [lisCart, setLisCart] = useState([]);
  console.log('Holaaa', lisCart);


  const miCarrito = async()=> {
    const response = await axios.get(`/api/products/`);
    setAllProducts(response.data);
  }

  const listCart = async()=> {
    const cartProductIds = products.map(product => product.product);
    const filteredProducts = allProducts.filter(product => cartProductIds.includes(product._id));
  
    // Actualiza cada producto con la cantidad del carrito
    const productsWithQuantity = filteredProducts.map(product => {
      const cartProduct = products.find(item => item.product === product._id);
      if (cartProduct) {
        return {
          ...product,
          quantity: cartProduct.quantity
        };
      } else {
        return product;
      }
    });
  
    setLisCart(productsWithQuantity);
  };
  
  const removeProduct = (id) => {
    setProducts(products.filter((product) => product._id !== id));
  };

  const increaseQuantity = (id) => {

    const updatedProducts = lisCart.map(product => {
      if (product._id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setLisCart(updatedProducts);
  };

  const decreaseQuantity = (id) => {
    const updatedProducts = lisCart.map(product => {
      if (product._id === id && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setLisCart(updatedProducts);
  };

  const totalPrice = () => {
    return lisCart?.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  useEffect(() => {
    miCarrito();
    listCart();
    
    const fetchCart = async () => {
      try {
        const userIdFromLocalStorage = localStorage.getItem("userId");
        if (userIdFromLocalStorage) {
          const response = await axios.get(`/api/carts/user/${userIdFromLocalStorage}`);
          setProducts(response.data.products); 
          
        }
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    };
   
    fetchCart();
  }, []);

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
              <td className={style.tdStyle}>{index+1}</td>
              <td className={style.tdStyle}>
                <img src={ele.image} style={{ width: "285px", height: "177px" }} alt="Producto" />
                <p>{ele.title}</p>
              </td>
              <td className={style.tdStyle}>{ele.description}</td>
              <td  className={style.tdStyle}>
                {/* Botón para disminuir cantidad */}
                <button onClick={() => decreaseQuantity(ele._id)}>-</button>
                <span>{ele.quantity}</span>
                {/* Botón para aumentar cantidad */}
                <button onClick={() => increaseQuantity(ele._id)}>+</button>
              </td>
              <td className={style.tdStyle}>${ele.price}</td>
              <td className={style.tdStyle}>${ele.price * ele.quantity}</td> {/* Precio Total */}
              <td className={style.tdStyle}>
                <button onClick={() => removeProduct(ele._id)} className={style.btnDelete}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.total}>
        <h2 style={{marginBottom:"2rem"}}>Total: ${totalPrice()}</h2>
      </div>
    </div>
  );
};

export default CartView;
