import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditarPerfil = () => {
  // Estado para los datos del usuario
  const [infoUser, setInfoUser] = useState({
    nombre: '',
    apellido: '',
    email: ''
  });
  const userInfoFromLocalStorage = localStorage.getItem("userEmail");

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `/users/byEmail/${userInfoFromLocalStorage}`
      );
      setInfoUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: ''
  });

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del usuario a tu backend para su actualización
    console.log('Datos del usuario actualizados:', userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Editar Perfil</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingrese su nombre" 
            name="nombre" 
            value={userData.first_name || infoUser.first_name} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Form.Group controlId="apellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingrese su apellido" 
            name="apellido" 
            value={userData.last_name || infoUser.last_name} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Ingrese su email" 
            name="email" 
            value={userData.email || infoUser.email} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        <hr />
        <Button variant="primary" type="submit">
          Actualizar Datos
        </Button>
      </Form>
    </div>
  );
};

export default EditarPerfil;
