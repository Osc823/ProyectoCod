//Factory
import cartsService from "../services/factory.js";

// import cartDao from "../services/daos/mongo/cart.dao.js";



const postCart = async (req, res) => {
    try {
      const newCart = await cartsService.createCart();
      res.json({
        message: "Nuevo carrito creado con éxito",
        cart: newCart,
      });
    } catch (error) {
      console.error("Error al crear un carrito:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}
const cartById =  async (req, res) => {
    const { cid } = req.params;
    try {
      if (cid) {
        const cart = await cartsService.getCartById(cid);
        if (!cart) {
          return res.status(404).json({ error: "Carrito no encontrado" });
        }
        res.json(cart);
      } else {
        res.status(400).json({ error: "Falta el ID del carrito" });
      }
    } catch (error) {
      console.error(`Error al obtener el carrito con ID ${cid}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
const addProductCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
      if (cid && pid) {
        const response = await cartsService.addToCart(cid, pid);
        res.json(response);
      } else {
        res.status(400).json({ error: "Falta el ID del carrito o del producto" });
      }
    } catch (error) {
      console.error(`Error al agregar producto al carrito ${cid}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
export {
    postCart,
    cartById,
    addProductCart
}