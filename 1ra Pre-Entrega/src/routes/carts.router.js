import { Router } from "express";
import { cartById, postCart, addProductCart} from "../controllers/carts.Controller.js";

const routerCarts = Router();

// Crear un nuevo carrito
routerCarts.post("/", postCart);

// Obtener información de un carrito por su ID
routerCarts.get("/:cid", cartById);

// Agregar un producto a un carrito por su ID
routerCarts.post("/:cid/product/:pid", addProductCart);

export default routerCarts;
