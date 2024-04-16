import { useEffect, useState } from 'react';
import CardCategoria from './Card/Card';
import axios from 'axios';


const CategoriaView = () => {

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response =  await axios.get("/mockingproducts");
        setProduct(response.data.payload);
      } catch (error) {
        console.error("Error al obtener o crear el carrito:", error);
      }
    }

      fetchCart()

    }, []);

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <CardCategoria product={product}/>
      </div>
    </div>
  );
};

export default CategoriaView;
