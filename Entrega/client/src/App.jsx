import './App.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
import { Route, Routes } from 'react-router-dom'
import HomeView from './views/HomeView/HomeView'
import LoginView from './views/LoginView/LoginView'
import RegisterView from './views/RegisterView/RegisterView'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AdminDashboard from './views/AdminDashboard/AdminDashboard'
import UserDashboard from './views/UserDashboard/UserDashnoard'
import CartView from './views/CartView/CartView'
import { useEffect, useState } from 'react'
import { CartProvider } from './context/CartContext'
import ProductosView from './views/ProductView/ProductView'
import CategoriaView from './views/CategoriaView/CategoriaView'



function App() {
  const [infoCart, setInfoCart] = useState();
  const userIdFromLocalStorage = localStorage.getItem("userId");

  useEffect(() => {
    const axiosConfig = axios.create({
      withCredentials: true
    })
    const fetchData = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        const cartResponse = await axiosConfig.get(`/api/carts/${cartId}`)
        setInfoCart(cartResponse.data.products.length);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  },[])
 

  return (
    <>
    <CartProvider>
      <Routes>
        <Route path="/home" element={<><Navbar infoCart={infoCart}/><HomeView userId={userIdFromLocalStorage}/><Footer/></>}/>
        <Route path="/" element={<LoginView />}/>
        <Route path="/register" element={<RegisterView />}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/cart' element={<><Navbar infoCart={infoCart}/><CartView/> <Footer/></>}/>
        <Route path='/userDashboard' element={<UserDashboard/>}/>
        <Route path='/productos' element={<><Navbar infoCart={infoCart}/><ProductosView/><Footer/></>}/>
        <Route path='/categoria' element={<><Navbar infoCart={infoCart}/><CategoriaView/><Footer/></>}/>
      </Routes>
      </CartProvider>
    </>
  )
}

export default App
