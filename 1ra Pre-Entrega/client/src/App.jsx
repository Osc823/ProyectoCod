import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeView from './views/HomeView/HomeView'
import LoginView from './views/LoginView/LoginView'
import RegisterView from './views/RegisterView/RegisterView'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AdminDashboard from './views/AdminDashboard/AdminDashboard'
import UserDashboard from './views/UserDashboard/UserDashnoard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><Navbar/><HomeView /><Footer/></>}/>
        <Route path="/login" element={<LoginView />}/>
        <Route path="/register" element={<RegisterView />}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/userDashboard' element={<UserDashboard/>}/>
      </Routes>
    </>
  )
}

export default App
