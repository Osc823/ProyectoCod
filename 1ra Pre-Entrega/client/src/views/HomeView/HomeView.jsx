import Cards from "../../components/Cards/Cards.jsx"
import Carrusel from "../../components/Carrusel/Carrusel.jsx"

const HomeView = () => {
  return (
    <div>
      <Carrusel/>
      <h2 style={{textAlign:"center"}}>Productos</h2>
      <Cards/>
    </div>
  )
}

export default HomeView