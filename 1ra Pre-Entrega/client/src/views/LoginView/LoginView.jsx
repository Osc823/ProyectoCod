import { useState } from "react";
import { Link } from "react-router-dom"; 

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones adicionales, como enviar datos al servidor
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div  style={{ backgroundColor: "#f4f4f4", height:"100vh"}}>
      <Link to="/" style={{textDecorationLine:"none"}}>⬅️ HOME</Link>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="col-md-4" style={{ borderRadius: "15px", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", marginTop: "100px",backgroundColor: "white" }}>
          <h2 className="mb-4">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
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
                Iniciar Sesión
              </button>
            </div>
            <div style={{justifyContent:"center", alignItems:"center",  textAlign:"center", marginBottom:"10px", marginTop:"10px"}}>
              <Link to="/register" style={{textDecorationLine:"none"}}>¿Registrate?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
