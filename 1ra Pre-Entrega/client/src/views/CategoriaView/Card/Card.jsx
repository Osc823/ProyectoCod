import  { useState } from "react";
import Card from "../../../components/Card/Card";

// eslint-disable-next-line react/prop-types
const CardCategoria = ({ product }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Calcula el índice del primer y último producto de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambia a la siguiente página
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Cambia a la página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <div className="row" style={{ margin: "0" }}>
        {currentProducts.map((card, index) => (
          <div key={index} className="col-md-3 mb-4">
            <Card
              _id={card.code}
              title={card.title}
              description={card.description}
              imagen={card.thumbnail}
              price={card.price}
            />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {currentPage}
        <button onClick={nextPage} disabled={indexOfLastProduct >= product.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CardCategoria;
