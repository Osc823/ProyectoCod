import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

// eslint-disable-next-line react/prop-types
const Card = ({ _id, price, thumbnail, title, show }) => {
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({}); // Initialize selectedProduct as null

  const viewModal = (id) => {
    const selected = products.find((product) => product._id === id);
    setSelectedProduct(selected);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ width: "80%" }}>
        <img src={thumbnail} alt="Descripción de la imagen" className="card-img-top" />
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{price}.</p>
          <div className="d-inline-flex">
            {
              show !== false ? 
            <button className="btn btn-success btn-sm me-2" onClick={() => addToCart(_id)}>
              Agregar al carrito
            </button> : null
            }
            <button type="button" onClick={() => viewModal(_id)} className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#exampleModal-${_id}`}>
              Ver Detalle
            </button>
          </div>
        </div>
      </div>

      <div className="modal fade" id={`exampleModal-${_id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"  aria-labelledby={`exampleModalXlLabel-${_id}`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Detalles del Producto</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedProduct && (
                <div className="d-flex">
                  <img src={selectedProduct.thumbnail} alt="Imagen del Producto" style={{ width: "250px", height: "200px", marginRight: "20px", alignContent: "center" }} />
                  <div>
                    <p><span style={{ fontWeight: "bold" }}>Título:</span> {selectedProduct.title}</p>
                    <p><span style={{ fontWeight: "bold" }}>Descripción:</span> {selectedProduct.description}</p>
                    <p><span style={{ fontWeight: "bold" }}>Precio:</span> {selectedProduct.price}</p>
                    <p><span style={{ fontWeight: "bold" }}>Código:</span> {selectedProduct.code}</p>
                    <p><span style={{ fontWeight: "bold" }}>Stock:</span> {selectedProduct.stock}</p>
                    <p><span style={{ fontWeight: "bold" }}>Marca:</span> {selectedProduct.marca}</p>
                  </div>
                </div>
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

export default Card;
