import  { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditarPerfil = () => {
  // Estado para los datos del usuario
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
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
            value={userData.nombre} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Form.Group controlId="apellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingrese su apellido" 
            name="apellido" 
            value={userData.apellido} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Ingrese su email" 
            name="email" 
            value={userData.email} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Form.Group controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control 
            type="tel" 
            placeholder="Ingrese su teléfono" 
            name="telefono" 
            value={userData.telefono} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Actualizar Datos
        </Button>
      </Form>
    </div>
  );
};

export default EditarPerfil;
