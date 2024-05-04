import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import style from './categoria.module.css';

const CategoriaView = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products/");
        setProducts(response.data);
        setOriginalProducts(response.data); // Guarda una copia de los productos originales
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const sortProductsByPriceMaME = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  };

  const sortProductsByPriceMeMA = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };

  const handlerInputChange = (e) => {
    const { value } = e.target;
    const filteredProducts = originalProducts.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(filteredProducts);
  };
  

  const filterProductsByCategory = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value === 'Todos') {
        setProducts(originalProducts); // Restaura los productos originales
    } else {
        const filteredProducts = originalProducts.filter((product) => product.marca === value);
        setProducts(filteredProducts);
    }
  };

  return (
    <div>
      <div className={style.container}>
        <button className={style.button} onClick={sortProductsByPriceMaME}>Precio (mayor a menor)</button>
        <button  className={style.button} onClick={sortProductsByPriceMeMA}>Precio (menor a mayor)</button>
        <select
         className={style.select}
          name="order"
          onChange={filterProductsByCategory}
        >
          <option value={'Todos'}>Selecciona Marca</option>
          <option value={'Nike'}>Nike</option>
          <option value={'Puma'}>Puma</option>
          <option value={'Adidas'}>Adidas</option>
        </select>

        <input
          type="text"
          id="myInput"
          className={style.search}
          name="search"
          onChange={(e) => handlerInputChange(e)}
          placeholder="🔍   Search for names.."
        />
      </div>
      <div className="row" style={{ margin: "0" }}>
        {products.map((product, index) => (
            <div key={index} className="justify-content-center col-md-3 mb-4" style={{ padding: "0" }}>

            <Card
              _id={product._id}
              title={product.title}
              description={product.description}
              thumbnail={product.thumbnail}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriaView;
