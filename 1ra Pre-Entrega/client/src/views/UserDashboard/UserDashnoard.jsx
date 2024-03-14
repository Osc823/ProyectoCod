// import React from 'react'
import style from "./userdashboards.module.css";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [componenteActual, setComponenteActual] = useState("A");

  //Manejo de color del perfil usuario
  const [color, setColor] = useState("#59415b");
  const [selectedLink, setSelectedLink] = useState(null);

  //Manejar la opcion seleccionada mediante color
  const handleSelect = (linkName) => {
    setComponenteActual(linkName);
    setColor("#59415b");
    setSelectedLink(linkName);
  };
  useEffect(() => {
    setSelectedLink("A");
    setColor("#59415b");
  }, []);
  return (
    <div>
      <div>
        <div className={`${style.panel} row`} style={{ marginRight: "0" }}>
          <div className={`${style.profilePanel} col-3`}>
            <div className={`${style.menu}`}>
              <div>
                <div className={style.profile}>
                  <img src="" alt="Foto de perfil" />
                </div>
                <div>
                  <h4>Nombre</h4>
                </div>
              </div>

              <ul className={style.menuList}>
              <li>
                <a
                  onClick={() => {
                    handleSelect('A')
                  }}
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '70px',
                    width: '100%',
                    paddingInline: '5px',
                    backgroundColor: selectedLink === 'A' ? color : 'white',
                    color: selectedLink === 'A' ? 'white' : 'black',
                  }}
                >
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill={selectedLink === 'A' ? 'white' : 'black'}
                    className="bi bi-person-fill-gear"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                  </svg>{' '}
                  &nbsp; Editar Perfil
                </a>
              </li>
            
              <li>
                <a
                  onClick={() => {
                    handleSelect('D')
                  }}
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '70px',
                    width: '100%',
                    paddingInline: '5px',
                    backgroundColor: selectedLink === 'D' ? color : 'white',
                    color: selectedLink === 'D' ? 'white' : 'black',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill={selectedLink === 'D' ? 'white' : 'black'}
                    className="bi bi-bag-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                  </svg>{' '}
                  &nbsp; Mis compras
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    handleSelect('E')
                    // setShowModal(true)
                  }}
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '70px',
                    width: '100%',
                    paddingInline: '5px',
                    backgroundColor: selectedLink === 'E' ? color : 'white',
                    color: selectedLink === 'E' ? 'white' : 'black',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill={selectedLink === 'E' ? 'white' : 'black'}
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>{' '}
                  &nbsp; Salir
                </a>
              </li>
            </ul>
            </div>
          </div>
          <div className="col-9">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link
                        to="/"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Inicio
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/productos" className="nav-link">
                        Productos
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contacto" className="nav-link">
                        Contacto
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {componenteActual === "A" ? (
              <div className={`col-8 ${style.content}`}>Buenas</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
