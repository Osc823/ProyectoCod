// import logo from './tu-logo.png'; // Importa la ruta de tu logo
import logo from "../../assets/logo2.png";
import inicio from "../../assets/usuario.png";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <img
          src={logo}
          style={{ width: "70px", height: "50px", borderRadius: "100%" }}
          alt="Logo"
        />
        <div className={style.navbar}>
          <a className="nav-link active" aria-current="page" href="/">
            Inicio
          </a>
          <a className="nav-link active" aria-current="page" href="/categoria">
            Catalogo
          </a>
          <a className="nav-link active" aria-current="page" href="#">
            Nosotros
          </a>
        </div>
        <div className="d-flex"> {/* Contenedor para elementos finales */}
          <div>
            <Link to="/cart">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-cart4"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                <div
                  style={{
                    backgroundColor: "red",
                    width: "20px",
                    borderRadius: "100%",
                    height: "25px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  0
                </div>
              </div>
            </Link>
          </div>
          <div style={{ marginLeft: "10px" }}> {/* Separación del Login */}
            <Link to={"/login"}>
              <img
                src={inicio}
                style={{ width: "30px", height: "30px", borderRadius: "100%" }}
                alt="Logo"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
