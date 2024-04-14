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
import CategoriaView from './views/CategoriaView/CategoriaView'
import CartView from './views/CartView/CartView'
import { useEffect, useState } from 'react'

function App() {
  const [listCartProducts, setListCartProducts] = useState()
  const userIdFromLocalStorage = localStorage.getItem("userId");


  const fetchCart = async () => {
    const response = await axios.get(`/api/carts/user/${userIdFromLocalStorage}`);
    setListCartProducts(response.data.products); 
    console.log('Que pasa aqui', response);
  };
  useEffect(()=> {
    fetchCart()
  },[])

  return (
    <>
      <Routes>
        <Route path="/home" element={<><Navbar/><HomeView /><Footer/></>}/>
        <Route path="/" element={<LoginView />}/>
        <Route path="/register" element={<RegisterView />}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/cart' element={<><Navbar/><CartView listCartProducts={listCartProducts}/> <Footer/></>}/>
        <Route path='/userDashboard' element={<UserDashboard/>}/>
        <Route path='/categoria' element={<><Navbar/><CategoriaView/><Footer/></>}/>
      </Routes>
    </>
  )
}

export default App
