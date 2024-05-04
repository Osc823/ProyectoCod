// import React from 'react'
import style from "./admindashboard.module.css";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import perfil from "../../assets/usuario.png";
import Estadisticas from "./EstadisticasView/Estadisticas";
import UsuariosList from "./UsuariosView/UsuariosList";
import ProductsView from "./Productos/ProductsView";
import CrearProductoView from "./CrearProductoView/CrearProductoView";
import axios from "axios";

const AdminDashboard = () => {
  const [componenteActual, setComponenteActual] = useState("A");

  //Manejo de color del perfil usuario
  const [color, setColor] = useState("#59415b");
  const [selectedLink, setSelectedLink] = useState(null);

  const [infoUser, setInfoUser] = useState();
  console.log('Mi usuarui', infoUser);

  //Manejar la opcion seleccionada mediante color
  const handleSelect = (linkName) => {
    setComponenteActual(linkName);
    setColor("#59415b");
    setSelectedLink(linkName);
  };
  const axiosConfig = axios.create({ withCredentials: true });
  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem('userEmail')
      const response = await axiosConfig.get(
        `/users/byEmail/${email}`
      );
      setInfoUser(response.data.data.role);
    };
    fetchUser();
  }, []);
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
                  <img src={perfil} alt="Foto de perfil" />
                </div>
                <div>
                  <h4>Nombre</h4>
                </div>
              </div>

              <ul className={style.menuList}>
                <li>
                  <Link
                    onClick={() => {
                      handleSelect("A");
                    }}
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "70px",
                      width: "100%",
                      paddingInline: "5px",
                      backgroundColor: selectedLink === "A" ? color : "white",
                      color: selectedLink === "A" ? "white" : "black",
                    }}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill={selectedLink === "A" ? "white" : "black"}
                      className="bi bi-graph-up-arrow"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"
                      />
                    </svg>
                    &nbsp; Mis estadisticas
                  </Link>
                </li>
                {
                  infoUser == "admin" ?(
                    <li>
                      <Link
                        onClick={() => {
                          handleSelect("B");
                        }}
                        href="#"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "70px",
                          width: "100%",
                          paddingInline: "5px",
                          backgroundColor: selectedLink === "B" ? color : "white",
                          color: selectedLink === "B" ? "white" : "black",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="35"
                          fill={selectedLink === "B" ? "white" : "black"}
                          className="bi bi-people-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        </svg>{" "}
                        &nbsp; Usuarios
                      </Link>
                    </li>
                  ) : null
                }
                <li>
                  <Link
                    onClick={() => {
                      handleSelect("C");
                    }}
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "70px",
                      width: "100%",
                      paddingInline: "5px",
                      backgroundColor: selectedLink === "C" ? color : "white",
                      color: selectedLink === "C" ? "white" : "black",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill={selectedLink === "C" ? "white" : "black"}
                      className="bi bi-journals"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
                      <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z" />
                    </svg>{" "}
                    &nbsp; Productos
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={() => {
                      handleSelect("D");
                    }}
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "70px",
                      width: "100%",
                      paddingInline: "5px",
                      backgroundColor: selectedLink === "D" ? color : "white",
                      color: selectedLink === "D" ? "white" : "black",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill={selectedLink === "D" ? "white" : "black"}
                      className="bi bi-journal-plus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
                      />
                      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                    </svg>{" "}
                    &nbsp; Agregar Producto
                  </Link>
                </li>
                <li>
                  <a
                    onClick={() => {
                      handleSelect("E");
                      localStorage.removeItem("userId");
                      // setShowModal(true)
                    }}
                    href="/"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "70px",
                      width: "100%",
                      paddingInline: "5px",
                      backgroundColor: selectedLink === "E" ? color : "white",
                      color: selectedLink === "E" ? "white" : "black",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill={selectedLink === "E" ? "white" : "black"}
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
                    </svg>{" "}
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
                        to="/home"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Inicio
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {componenteActual === "A" ? (
              <div className={`col-8 ${style.content}`}>
                <Estadisticas />
              </div>
            ) : componenteActual === "B" ? (
              <div className={`col-9 ${style.content}`}>
                <UsuariosList />
              </div>
            ) : componenteActual === "C" ? (
              <div className={`col-9 ${style.content}`}>
                <ProductsView />
              </div>
            ) : componenteActual === "D" ? (
              <div className={`col-9 ${style.content}`}>
                <CrearProductoView />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
