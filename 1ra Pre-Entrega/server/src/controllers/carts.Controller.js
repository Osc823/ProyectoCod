//Factory
// import cartsService from "../services/factory.js";

//Repository
import { cartModel } from "../services/models/cart.model.js";
import {cartsService, ticketService} from "../services/service.js"
import { sendEmailTicket } from "./email.controller.js";

// import cartDao from "../services/daos/mongo/cart.dao.js";

const purchaseCart = async(req, res, next) => {
  const {cartId, userId, email} = req.user;


  try {
      // Obtener el carrito y sus productos
      const cart =  await cartsService.getCartById(cartId._id)
      console.log('Mi carrito', cart);
      const productsToPurchase = cart.products;

      // Inicializar arrays para productos comprados y no comprados
      const purchasedProducts = [];
      const failedProducts = [];

      // Recorrer los productos del carrito
      for (const productData of productsToPurchase) {
          const product = productData.product;
          const quantity = productData.quantity;

          // Verificar si hay suficiente stock
          if (product.stock >= quantity) {
              // Restar el stock y añadir a la lista de productos comprados
              product.stock -= quantity;
              await product.save();
              purchasedProducts.push(product);
          } else {
              // Añadir a la lista de productos no comprados
              failedProducts.push(product._id);
          }
      }

      const ticketPost = {
        amount: 0,
        purchaser: email,
        products:cart.products
      }

      // Generar el ticket
      const ticket = await ticketService.createTicket(ticketPost);
      await sendEmailTicket(email, ticket);
      
      // Actualizar el carrito con los productos no comprados
      cart.products = cart.products.filter(productData => !failedProducts.includes(productData.product));
      await cart.save();

      // Responder con el resultado
      res.json({ ticket, failedProducts });
  } catch (error) {
      next(error);
  }
}


const postCart = async (req, res) => {
    try {
      const newCart = await cartsService.createCart();
      res.json({
        message: "Nuevo carrito creado con éxito",
        cart: newCart,
      });
    } catch (error) {
      req.logger.error("Error al crear un carrito:", error);
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
      req.logger.error(`Error al obtener el carrito con ID ${cid}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
const addProductCart = async (req, res) => {
    const { pid} = req.params;
    console.log('MI INFO', req.user);

    const {cartId, id} = req.user;

    try {
      if (cartId && pid) {
        const response = await cartsService.addToCart(cartId._id, pid, id);
        res.json(response);
      } else {
        res.status(400).json({ error: "Falta el ID del carrito o del producto" });
      }
    } catch (error) {
      req.logger.error(`Error al agregar producto al carrito ${cartId}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

const getAllProductsByUser = async(req, res)=> {
  try {
    const {cartId} = req.user;
    const allProducts = await cartsService.getAllProducts(cartId)
    res.status(200).send({products: allProducts})
  } catch (error) {
    req.logger.error(`Error al obtener productos del carrito:`, error);
  }

}

const deleteProducInCart = async(req, res) => {
  const { pid } = req.params; // Obtener los IDs del carrito y del producto desde los parámetros de la URL
  const { cartId, id } = req.user; // Obtener el ID del usuario desde los parámetros de la URL

  try {
      // Verificar si el carrito existe y pertenece al usuario
      console.log('carr', cartId);
      const userCart = await cartsService.getCartById(cartId._id);

      if (!userCart) {
          // Si el carrito no existe o no pertenece al usuario, devolver un error
          return res.status(404).json({ error: "Cart not found for this user" });
      }

      // Eliminar el producto del carrito
      const response = await cartsService.deleteProducInCart(cartId._id, pid)
      console.log('Rta', response);

      // Devolver una respuesta exitosa
      res.status(200).json({ message: "Product removed from cart successfully", payload: response });
  } catch (error) {
      // Si ocurre un error en el proceso, devolver un mensaje de error genérico
      console.error("Error while deleting product from cart:", error);
      res.status(500).json({ error: "Internal server error" });
  }
}

export {
    postCart,
    cartById,
    addProductCart,
    purchaseCart,
    getAllProductsByUser,
    deleteProducInCart
}