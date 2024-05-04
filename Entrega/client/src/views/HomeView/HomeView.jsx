import Cards from "../../components/Cards/Cards.jsx"
import Carrusel from "../../components/Carrusel/Carrusel.jsx"

// eslint-disable-next-line react/prop-types
const HomeView = ({userId}) => {
  console.log('Esto', userId);
  return (
    <div>
      <Carrusel/>
      <h2 style={{textAlign:"center"}}>Productos</h2>
      <Cards userId={userId}/>
    </div>
  )
}

export default HomeView