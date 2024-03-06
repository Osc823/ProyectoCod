import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };

  const handleEdadChange = (e) => {
    setEdad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nombre:", nombre, "Apellido:", apellido, "Email:", email, "Edad:", edad, "Password:", password);
    // Aquí puedes realizar acciones adicionales, como enviar datos al servidor
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
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={handleNombreChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Apellido"
                value={apellido}
                onChange={handleApellidoChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edad" className="form-label">
                Edad
              </label>
              <input
                type="number"
                className="form-control"
                id="edad"
                placeholder="Edad"
                value={edad}
                onChange={handleEdadChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
