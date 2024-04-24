import { Router } from "express";
import { cartById, postCart, addProductCart, purchaseCart, getAllProductsByUser, deleteProducInCart } from "../controllers/carts.Controller.js";
// import { userModel } from "../services/models/user.model.js";
import { cartModel } from "../services/models/cart.model.js";
import { authorization, passportCall } from "../dirname.js";

const routerCarts = Router();

// Crear un nuevo carrito para usuario registrado en la bd
routerCarts.post("/",passportCall("JWT"), postCart);


routerCarts.get("/",passportCall("JWT"), getAllProductsByUser)

// Obtener información de un carrito por su ID
routerCarts.get("/:cid",passportCall("JWT"), cartById);

// Agregar un producto a un carrito por su ID
routerCarts.post("/product/:pid/", passportCall("JWT"), addProductCart);


// Nueva ruta para finalizar la compra de un carrito
routerCarts.post('/purchase',passportCall("JWT"), purchaseCart);

// Eliminar un producto del carrito por su ID
routerCarts.delete("/product/:pid/",passportCall("JWT"), deleteProducInCart);


export default routerCarts;
