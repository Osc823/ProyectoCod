import { Router } from "express";
import { cartById , addProductCart, purchaseCart, getAllProductsByUser, deleteProducInCart, decreaseProduct } from "../controllers/carts.Controller.js";
import { passportCall } from "../dirname.js";

const routerCarts = Router();

// Obtener todos los productos del usuario
routerCarts.get("/",passportCall("JWT"), getAllProductsByUser)

// Obtener información de un carrito por su ID
routerCarts.get("/:cid",passportCall("JWT"), cartById);

// Agregar un producto a un carrito por su ID
routerCarts.post("/product/:pid/", passportCall("JWT"), addProductCart);

//Quitar cantidad al producto del carrito
routerCarts.patch("/product/:pid/decrease",passportCall("JWT"),decreaseProduct)

// Nueva ruta para finalizar la compra de un carrito
routerCarts.post('/purchase',passportCall("JWT"), purchaseCart);

// Eliminar un producto del carrito por su ID
routerCarts.delete("/product/:pid/delete",passportCall("JWT"), deleteProducInCart);


export default routerCarts;
