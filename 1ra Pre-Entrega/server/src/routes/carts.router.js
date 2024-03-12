import { Router } from "express";
import { cartById, postCart, addProductCart, purchaseCart } from "../controllers/carts.Controller.js";

const routerCarts = Router();

// Crear un nuevo carrito
routerCarts.post("/", postCart);

// Obtener información de un carrito por su ID
routerCarts.get("/:cid", cartById);

// Agregar un producto a un carrito por su ID
routerCarts.post("/:cid/product/:pid", addProductCart);


// Nueva ruta para finalizar la compra de un carrito
routerCarts.post('/:cid/purchase', purchaseCart);

export default routerCarts;
