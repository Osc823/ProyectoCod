//Factory
// import cartsService from "../services/factory.js";

//Repository
import {cartsService} from "../services/service.js"

// import cartDao from "../services/daos/mongo/cart.dao.js";

const purchaseCart = async(req, res, next) => {
  const cartId = req.params.cid;
  const userId = req.user.id; 

  try {
      // Obtener el carrito y sus productos
      const cart =  await cartsService.getCartById(cartId).populate('products.product');
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

      // Generar el ticket
      const ticket = await TicketService.generateTicket(userId, purchasedProducts);

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
    const { cid, pid } = req.params;
    try {
      if (cid && pid) {
        const response = await cartsService.addToCart(cid, pid);
        res.json(response);
      } else {
        res.status(400).json({ error: "Falta el ID del carrito o del producto" });
      }
    } catch (error) {
      req.logger.error(`Error al agregar producto al carrito ${cid}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
export {
    postCart,
    cartById,
    addProductCart,
    purchaseCart
}