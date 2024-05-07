// import React from 'react'
import { useEffect, useState } from "react";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../../utils/Toast.jsx";

import Swal from "sweetalert2";
import axios from "axios";

const UsuariosList = () => {
  //Estado para traer todos los usuarios

  const [refresh, setRefresh] = useState();
  const [allUsers, setAllUsers] = useState([]);
  console.log("Todos los usuarios", allUsers);

  const axiosConfig = axios.create({ withCredentials: true });

  //Funcion para suspender usuario
  const handlePauseUser = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro que quieres suspender este usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, suspender",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosConfig.patch(`/users/sleep/${id}`);
          if (response.status ==200) {
            showSuccessNotification("Usuario suspendido con éxito!");
            setRefresh(!refresh);
          }
          
        } catch (error) {
          console.error("Error al suspender usuario:", error);
          showErrorNotification(
            "Error al suspender usuario. Por favor, intenta de nuevo."
          );
        }
      }
    });
  };

  //Funcion para reactivaar usuario
  const handlerRestoreUser = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Deseas reactivar este usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, reactivar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosConfig.patch(`/users/restore/${id}`);
        if (response.status ==200) {
          showSuccessNotification("Usuario activado con exito!");
          setRefresh(!refresh);
        }
      }
    });
  };
  //Funcion para eliminar usuario
  const handleDelete = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar este usuario?",
      text: "Esta acción es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosConfig.delete(`/users/delete/${id}`);
        if (response.status ==200) {
          showSuccessNotification("Usuario eliminado con exito!");
          setRefresh(!refresh);
        }
      }
    });
  };

  //Funcion para dar permisos de admin al usuario
  const handlerUserToAdmin = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro que quieres cambiar el rol a admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar rol a admin",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosConfig.patch(`/users/admin/${id}`);
          if (response.status ==200) {
            showSuccessNotification("Rol cambiado con éxito a admin.");
            setRefresh(!refresh);
          }
        } catch (error) {
          showErrorNotification(
            "Error al cambiar el rol a admin. Inténtalo de nuevo."
          );
        }
      }
    });
  };

  //Funcion para pasar de usuario a admin
  const handlerAdminToUser = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro que quieres cambiar el rol a usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar rol a usuario",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Realiza la acción para cambiar el rol a usuario aquí
          const response = await axiosConfig.patch(`/users/noadmin/${id}`);
          if (response.status ==200) {
            showSuccessNotification("Rol cambiado con éxito a usuario.");
            setRefresh(!refresh);
          }
        } catch (error) {
          showErrorNotification(
            "Error al cambiar el rol a usuario. Inténtalo de nuevo."
          );
        }
      }
    });
  };

  //Funcion para pasar de usuario a premiun
  const handlerUserToPremium = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro que quieres cambiar el rol a premium?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar rol a premium",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Realiza la acción para cambiar el rol a usuario aquí
          const response = await axiosConfig.patch(`/users/userPremiun/${id}`);
          if (response.status ==200) {
            showSuccessNotification("Rol cambiado con éxito a premium.");
            setRefresh(!refresh);
          }
        } catch (error) {
          showErrorNotification(
            "Error al cambiar el rol a premium. Inténtalo de nuevo."
          );
        }
      }
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosConfig.get("/users/allUsers/");
        setAllUsers(response.data.payload);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Llamada a la función fetchUsers al montar el componente
  }, [refresh]);
  return (
    <div>
      <table
        className="table table-bordered"
        style={{ borderRadius: "10px", width: "100%" }}
      >
        <thead style={{ borderRadius: "10px" }}>
          <tr style={{ borderRadius: "10px" }}>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Tipo usuario</th>
            <th scope="col" style={{ width: "150px" }}>
              Cambiar rol a
            </th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.length > 0 ? (
            allUsers?.map((ele, index) => (
              <tr key={index}>
                <th
                  style={{ backgroundColor: ele.hide ?  "#9bdb92" : "#edd55e" }}
                  scope="row"
                >
                  {index + 1}
                </th>

                {/* Nombre Completo */}
                <td
                  style={{ backgroundColor: ele.hide ?  "#9bdb92" : "#edd55e" }}
                >
                  {ele.first_name}
                </td>
                {/* Email */}
                <td
                  style={{ backgroundColor: ele.hide ?  "#9bdb92" : "#edd55e" }}
                >
                  {ele.email}
                </td>
                {/* Tipo Usuario */}
                <td
                  style={{ backgroundColor: ele.hide ?  "#9bdb92" : "#edd55e" }}
                >
                  {ele.role == "user" ? (
                    <button type="button" className="btn btn-success" disabled>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="black"
                        className="bi bi-person-fill-up"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"></path>
                      </svg>
                      User
                    </button>
                  ) : ele.role == "premium" ? (
                    <button type="button" className="btn btn-warning" disabled>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="black"
                        className="bi bi-person-fill-star"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.983 2.915l1.948-.295a.733.733 0 0 1 .406 1.32l-1.405 1.17.515 1.894a.733.733 0 0 1-1.076.823L8 6.523l-1.612 1.225a.733.733 0 0 1-1.076-.823l.515-1.894-1.405-1.17a.733.733 0 0 1 .406-1.32l1.948.295.766-1.85a.733.733 0 0 1 1.366 0l.766 1.85Zm1.147 7.238a.733.733 0 0 0-.706-.503H6.575l-1.675-1.367a.733.733 0 0 1-.254-.838l.585-1.838-1.546-.132a.733.733 0 0 0-.43 1.344l1.332.782-.41 1.815a.733.733 0 0 1-.889.52l-1.705-.505h-.001a.733.733 0 0 0-.539 1.06l1.275 1.685-.521 1.803a.733.733 0 0 0 1.073.816l1.641-.9 1.641.9a.733.733 0 0 0 1.073-.816l-.521-1.803 1.275-1.685a.733.733 0 0 0-.539-1.06h-.001l-1.705.505a.733.733 0 0 1-.889-.52l-.41-1.815 1.332-.782a.733.733 0 0 0-.43-1.344l-1.546.132.585 1.838a.733.733 0 0 1-.254.838l-1.675 1.367H5.57a.733.733 0 0 0-.706.503l-.51 1.553 1.484-.85a.733.733 0 0 1 .798 0l1.484.85-.51-1.553Z"></path>
                      </svg>
                      Premium
                    </button>
                  ) : (
                    <button type="button" className="btn btn-danger" disabled>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="black"
                        className="bi bi-person-fill-gear"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"></path>
                      </svg>
                      Admin
                    </button>
                  )}
                </td>
                {/* Rol */}
                <td
                  style={{ backgroundColor: ele.hide ?  "#9bdb92" : "#edd55e" }}
                >
                  {ele.role !== "admin" && (
                    <button
                      onClick={(e) => handlerUserToAdmin(e, ele._id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="black"
                        className="bi bi-person-fill-gear"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"></path>
                      </svg>
                      Admin
                    </button>
                  )}
                  {ele.role !== "premium" && (
                    <button
                      onClick={(e) => handlerUserToPremium(e, ele._id)}
                      type="button"
                      className="btn btn-warning"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="black"
                        className="bi bi-person-fill-star"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.983 2.915l1.948-.295a.733.733 0 0 1 .406 1.32l-1.405 1.17.515 1.894a.733.733 0 0 1-1.076.823L8 6.523l-1.612 1.225a.733.733 0 0 1-1.076-.823l.515-1.894-1.405-1.17a.733.733 0 0 1 .406-1.32l1.948.295.766-1.85a.733.733 0 0 1 1.366 0l.766 1.85Zm1.147 7.238a.733.733 0 0 0-.706-.503H6.575l-1.675-1.367a.733.733 0 0 1-.254-.838l.585-1.838-1.546-.132a.733.733 0 0 0-.43 1.344l1.332.782-.41 1.815a.733.733 0 0 1-.889.52l-1.705-.505h-.001a.733.733 0 0 0-.539 1.06l1.275 1.685-.521 1.803a.733.733 0 0 0 1.073.816l1.641-.9 1.641.9a.733.733 0 0 0 1.073-.816l-.521-1.803 1.275-1.685a.733.733 0 0 0-.539-1.06h-.001l-1.705.505a.733.733 0 0 1-.889-.52l-.41-1.815 1.332-.782a.733.733 0 0 0-.43-1.344l-1.546.132.585 1.838a.733.733 0 0 1-.254.838l-1.675 1.367H5.57a.733.733 0 0 0-.706.503l-.51 1.553 1.484-.85a.733.733 0 0 1 .798 0l1.484.85-.51-1.553Z"></path>
                      </svg>
                      Premium
                    </button>
                  )}
                  {ele.role !== "user" && (
                    <button
                      onClick={(e) => handlerAdminToUser(e, ele._id)}
                      type="button"
                      className="btn btn-success"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="black"
                        className="bi bi-person-fill-up"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"></path>
                      </svg>
                      User
                    </button>
                  )}
                </td>

                {/* Acciones */}
                <td
                  style={{
                    backgroundColor: ele.hide ?  "#9bdb92" : "#edd55e",
                    width: "150px",
                  }}
                >
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(e, ele._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 1 1 .708-.708z"></path>
                    </svg>
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={(e) => handlePauseUser(e, ele._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pause-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"></path>
                    </svg>
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={(e) => handlerRestoreUser(e, ele._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No se encontraron usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosList;
