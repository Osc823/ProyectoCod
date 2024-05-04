import { useEffect, useState } from 'react';
import axios from 'axios';
import CardProducts from './Card/Card.jsx';


const ProductsView = () => {

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response =  await axios.get("/api/products");
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener o crear el carrito:", error);
      }
    }

      fetchCart()

    }, []);

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <CardProducts product={product}/>
      </div>
    </div>
  );
};

export default ProductsView;
