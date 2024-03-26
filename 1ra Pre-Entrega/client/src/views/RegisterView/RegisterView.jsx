import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterView = () => {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    email:"",
    password: "",
    nombre:"",
    apellido:"",
    edad:"",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value,
    })
  }

  const enviarCorreo = async (datosUsuario) => {
    try {
      const respuestaCorreo = await axios.post("/api/email/", datosUsuario);
      console.log('Estado de Correo', respuestaCorreo);
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/sessions/register", form)
      console.log("Informacion", response.data);
      if (response.data.status === "success") {
        console.log('formulasras',form);
        enviarCorreo(form)
        setTimeout(() => {
          navigate('/')
        }, 1500)
        
      }
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#f4f4f4", height: "100%" }}>
      <Link to="/login" style={{ textDecorationLine: "none" }}>⬅️ VOLVER</Link>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="col-md-4" style={{ borderRadius: "15px", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",margin:"25px" , backgroundColor: "white" }}>
          <h2 className="mb-4">Registrarse</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                name="nombre"
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                name="apellido"
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Apellido"
                value={form.apellido}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edad" className="form-label">
                Edad
              </label>
              <input
                name="edad"
                type="number"
                className="form-control"
                id="edad"
                placeholder="Edad"
                value={form.edad}
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
