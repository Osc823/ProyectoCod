import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeView from './views/HomeView/HomeView'
import LoginView from './views/LoginView/LoginView'
import RegisterView from './views/RegisterView/RegisterView'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeView />}/>
        <Route path="/" element={<LoginView />}/>
        <Route path="/register" element={<RegisterView />}/>
      </Routes>
    </>
  )
}

export default App
