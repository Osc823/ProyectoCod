import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fondo from "../../assets/fondo.jpg"
import axios from "axios";

const RegisterView = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const enviarCorreo = async (datosUsuario) => {
    try {
      const respuestaCorreo = await axios.post("/api/email/", datosUsuario);
      console.log("Estado de Correo", respuestaCorreo);
    } catch (error) {
      console.error("Error al enviar correo:", error);
      setError("Error al enviar correo");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerResponse = await axios.post("/api/sessions/register", {
        ...form
      });
      if (registerResponse.data.status === "success") {
        enviarCorreo(form);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError("Error al registrar usuario");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: "cover", backgroundPosition: "center", height: "100%" }}>
      <Link to="/" style={{ textDecorationLine: "none" }}>
        ⬅️ VOLVER
      </Link>
      <div className="container d-flex align-items-center justify-content-center">
        <div
          className="col-md-4"
          style={{
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            margin: "25px",
            backgroundColor: "white",
          }}
        >
          <h2 className="mb-4">Registrarse</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                name="first_name"
                type="text"
                className="form-control"
                id="first_name"
                placeholder="Nombre"
                value={form.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                name="last_name"
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Apellido"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edad" className="form-label">
                Edad
              </label>
              <input
                name="age"
                type="number"
                className="form-control"
                id="age"
                placeholder="Edad"
                value={form.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </div>
          </form>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
