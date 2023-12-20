import { Router } from "express";
import cartDao from "../daos/dbManagerCart/cart.dao.js";

const routerCarts = Router();

// Crear un nuevo carrito
routerCarts.post("/", async (req, res) => {
  try {
    const newCart = await cartDao.createCart();
    res.json({
      message: "Nuevo carrito creado con éxito",
      cart: newCart,
    });
  } catch (error) {
    console.error("Error al crear un carrito:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Obtener información de un carrito por su ID
routerCarts.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    if (cid) {
      const cart = await cartDao.getCartById(cid);
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
});

// Agregar un producto a un carrito por su ID
routerCarts.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    if (cid && pid) {
      const response = await cartDao.addToCart(cid, pid);
      res.json(response);
    } else {
      res.status(400).json({ error: "Falta el ID del carrito o del producto" });
    }
  } catch (error) {
    console.error(`Error al agregar producto al carrito ${cid}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default routerCarts;
