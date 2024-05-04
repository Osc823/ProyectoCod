import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fondo from "../../assets/fondo.jpg"
import axios from "axios";

const LoginView = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const axiosConfig = axios.create({
    withCredentials: true
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosConfig.post("/api/sessions/login",form);
      console.log("Aquí está la respuesta:", response);

      if (response.data.status === "success") {
        localStorage.setItem("userId", response.data.payload._id); // Actualiza infoUser con los datos del usuario
        localStorage.setItem("userEmail", response.data.payload.email)
        localStorage.setItem("carrito", response.data.payload.cartId.products.length)
        localStorage.setItem("cartId", response.data.payload.cartId._id)
        navigate("/home");
     
      }
    } catch (error) {
      console.log('ERROR ', error);
      setError(error.message);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: "cover", backgroundPosition: "center", height: "100vh" }}>
      <div className="container d-flex align-items-center justify-content-center">
        <div
          className="col-md-4"
          style={{
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            marginTop: "100px",
            backgroundColor: "white",
          }}
        >
          <h2 className="mb-4">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={form.email.length === 0 || form.password.length === 0}
              >
                Iniciar Sesión
              </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <Link to="/register" style={{ textDecorationLine: "none" }}>
                ¿Registrate?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
