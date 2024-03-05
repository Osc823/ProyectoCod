// eslint-disable-next-line react/prop-types
const Card = ({ contenido, imagen, titulo }) => {
    return (
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: "80%" }}>
          <img
            src={imagen}
            alt="Descripción de la imagen"
            className="card-img-top"
          />
          <div className="card-body text-center">
            <h5 className="card-title">{titulo}</h5>
            <p className="card-text">{contenido}.</p>
            <a href="#" className="btn btn-primary">
              Botón
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
  