import { cartModel } from "../services/models/cart.model.js";

const registerPassportLocal =  async (req, res) => {
    req.logger.info("Registrando usuario:");
    res.status(201).send({ status: "success", message: "Usuario creado con extito." });
}

const loginPassportLocal = async (req, res) => {
    req.logger.info("User found to login:");

    const user = req.user;

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        id: user._id
    }

    // Verificar si el usuario tiene un carrito existente
    try {
        const existingCart = await cartModel.findOne({ userId: user._id,  products: []});

        if (!existingCart) {
            // Si el usuario no tiene un carrito, crear uno nuevo y asociarlo
            const newCart = await cartModel.create({ userId: user._id,  products: []});
            req.session.cartId = newCart._id; // Guarda el ID del carrito en la sesión
        } else {
            // Si el usuario ya tiene un carrito, simplemente guarda su ID en la sesión
            req.session.cartId = existingCart._id;
        }

        res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
    } catch (error) {
        console.error("Error al verificar o crear el carrito:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}


export {
    registerPassportLocal,
    loginPassportLocal
}