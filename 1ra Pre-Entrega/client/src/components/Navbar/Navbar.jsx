// import logo from './tu-logo.png'; // Importa la ruta de tu logo
import logo from "../../assets/logo.png";
import inicio from "../../assets/usuario.png";
import style  from "./navbar.module.css"

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
          <a className="nav-link active" aria-current="page" href="#">
            Inicio
          </a>
          <a className="nav-link active" aria-current="page" href="#">
            Catalogo
          </a>
          <a className="nav-link active" aria-current="page" href="#">
            Nosotros
          </a>
        </div>
        <div style={{ paddingRight: "25px" }}>
          <img
            src={inicio}
            style={{ width: "30px", height: "30px", borderRadius: "100%" }}
            alt="Logo"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
