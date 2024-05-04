/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const CardCategory = ({ _id, price, thumbnail, title, description, code, stock, marca }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para almacenar el producto seleccionado
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (counter >= 1) {
          console.log('contador', counter);
        }
        const response = await axios.get("/mockingproducts");
        setProducts(response.data.payload);
        console.log('contador', counter);
        setCounter(prevCounter => prevCounter + 1); // Incrementa el contador después de la primera ejecución
      } catch (error) {
        console.error("Error al obtener o crear el carrito:", error);
      }
    };

    // Verifica si el contador es igual a 0 antes de llamar a fetchProducts
    if (counter === 0) {
      fetchProducts();
    }
  }, [counter]);



  // Función para manejar el clic en el botón "Ver Detalle"
  const handleVerDetalle = (e,code) => {
    // Busca el producto en el array de productos
    e.preventDefault();
    const selected = products.find(product => product.code === code);
    // Actualiza el estado con el producto seleccionado
    setSelectedProduct(selected);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ width: "80%" }}>
        <img
          src={thumbnail}
          alt="Descripción de la imagen"
          className="card-img-top"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{price}.</p>
          <div>
            <button type="button" onClick={(e) => handleVerDetalle(e,code)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Ver Detalle      
            </button>
          </div>
        </div>
      </div>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Detalles del Producto</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>El problema radica en que cada vez que intentas ver un producto, el código de la API se recarga. Esto significa que no puedes filtrar correctamente los productos por su código, ya que el código que intentas filtrar no coincide con los códigos de los productos de la API debido a este reinicio.</p>
              {selectedProduct && (
                <>
                  <img src={selectedProduct.thumbnail} alt="Imagen del Producto" className="img-fluid" />
                  <p>ID: {selectedProduct._id}</p>
                  <p>Título: {selectedProduct.title}</p>
                  <p>Descripción: {selectedProduct.description}</p>
                  <p>Precio: {selectedProduct.price}</p>
                  <p>Código: {selectedProduct.code}</p>
                  <p>Stock: {selectedProduct.stock}</p>
                  <p>Marca: {selectedProduct.marca}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCategory;
