/* eslint-disable react/prop-types */
import  { useState } from "react";
import CardCategory from "../../../components/CardCategory/Card";

// eslint-disable-next-line react/prop-types
const CardCategoria = ({ product }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Calcula el índice del primer y último producto de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // eslint-disable-next-line react/prop-types
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambia a la siguiente página
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Cambia a la página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  console.log('producs', currentProducts);
  return (
    <div>
      <div className="row" style={{ margin: "0" }}>
        {currentProducts.map((card, index) => (
          <div key={index} className="col-md-3 mb-4">
            <CardCategory
              _id={card.code}
              title={card.title}
              description={card.description}
              thumbnail={card.thumbnail}
              price={card.price}
              code={card.code}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <button onClick={prevPage} className="btn btn-info" disabled={currentPage === 1}>
          Prev
        </button>
        <h4 className="text-center p-1">
          {currentPage}
        </h4>
        <button onClick={nextPage} className="btn btn-info" disabled={indexOfLastProduct >= product.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CardCategoria;
