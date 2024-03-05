// import React from 'react'
import style from "./carrusel.module.css"
import camisa from "../../assets/camisa.png"
import zapato from "../../assets/zapatos.png"
import pantalon from "../../assets/pantalon.png"

const Carrusel = () => {
  return (
    <div id="carouselExample" className="carousel slide" style={{marginTop:"10px"}}>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={camisa} className={`carrusel ${style.carrusel}`} alt="..." />
        </div>
        <div className="carousel-item">
          <img src={zapato} className={`carrusel ${style.carrusel}`} alt="..." />
        </div>
        <div className="carousel-item">
          <img src={pantalon} className={`carrusel ${style.carrusel}`} alt="..." />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carrusel;
