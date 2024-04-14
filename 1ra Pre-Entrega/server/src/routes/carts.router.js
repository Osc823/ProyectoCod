import { Router } from "express";
import { cartById, postCart, addProductCart, purchaseCart } from "../controllers/carts.Controller.js";
import { userModel } from "../services/models/user.model.js";
import { cartModel } from "../services/models/cart.model.js";

const routerCarts = Router();

// Crear un nuevo carrito para usuario registrado en la bd
routerCarts.post("/", postCart);

// Crear una ruta para obtener el carrito del usuario por su ID
routerCarts.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Buscar si el usuario existe en la base de datos
        const existUser = await userModel.findById(userId);

        if (!existUser) {
            // Si el usuario no existe, enviar un mensaje de error
            return res.status(404).json({ error: "User not found" });
        }

        // Buscar el carrito del usuario por su ID de usuario
        const userCart = await cartModel.findOne({ userId: userId });

        if (!userCart) {
            // Si el usuario no tiene un carrito, enviar un mensaje de error
            return res.status(404).json({ error: "Cart not found for this user" });
        }

        // Si se encuentra el carrito del usuario, enviarlo en la respuesta
        res.status(200).json(userCart);
    } catch (error) {
        // Si ocurre un error en el proceso, enviar un mensaje de error genérico
        console.error("Error while fetching user cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Obtener información de un carrito por su ID
routerCarts.get("/:cid", cartById);

// Agregar un producto a un carrito por su ID
routerCarts.post("/:cid/product/:pid/user/:uid", addProductCart);


// Nueva ruta para finalizar la compra de un carrito
routerCarts.post('/:cid/purchase', purchaseCart);

export default routerCarts;
