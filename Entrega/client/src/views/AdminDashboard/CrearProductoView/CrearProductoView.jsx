import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CrearProductoView = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
    code: '',
    stock: '',
    marca:'',
    userId:'',
  });
  console.log('Forn data', formData);
  const axiosConfig = axios.create({
    withCredentials: true
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axiosConfig.post('/api/products', formData)
    console.log('res', response);
    console.log('Datos del nuevo producto:', formData);
  };
  useEffect(()=>{
    const userId = localStorage.getItem('userId')
    formData.userId = userId;
  },[])

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Título:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Precio:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="thumbnail">
          <Form.Label>URL de la imagen:</Form.Label>
          <Form.Control
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="code">
          <Form.Label>Código:</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="stock">
          <Form.Label>Cantidad en stock:</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="marca">
          <Form.Label>Marca:</Form.Label>
          <Form.Control
            as="select"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
          >
            <option value="">Selecciona una marca</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
          </Form.Control>
        </Form.Group>

        <br />

        <Button variant="primary" type="submit">
          Crear Producto
        </Button>
      </Form>
    </div>
  );
};

export default CrearProductoView;
