//Factory
// import cartsService from "../services/factory.js";

//Repository
import { cartModel } from "../services/models/cart.model.js";
import { productModel } from "../services/models/product.model.js";
import PaymentService from "../services/payment.js";
import { cartsService, ticketService } from "../services/service.js";
import { sendEmailTicket } from "./email.controller.js";

// import cartDao from "../services/daos/mongo/cart.dao.js";

const purchaseCart = async (req, res, next) => {
  const { cartId, email } = req.user;

  try {
    // Obtener el carrito y sus productos
    const cart = await cartsService.getCartById(cartId._id);
    const productsToPurchase = cart.products;
    

    // Inicializar arrays para productos comprados y no comprados
    const purchasedProducts = [];
    const failedProducts = [];
    console.log('Que hay aca', purchasedProducts);
    // Recorrer los productos del carrito
    for (const productData of productsToPurchase) {
      const productId = productData.product;

      // Buscar el producto en la base de datos usando el ID
      const product = await productModel.findById(productId);

      if (!product) {
        failedProducts.push(productId);
        continue;
      }

      // Reducir el stock del producto
      product.stock -= productData.quantity;
      await product.save();
      // Añadir el objeto completo del producto a la lista de productos comprados
      purchasedProducts.push(product);
    }

    // Generar el ticket con la cantidad total y el correo del comprador
    const totalAmount = purchasedProducts.reduce((total, product) => {
      return total + product.price;
    }, 0);

    const totalPriceCents = Math.round(totalAmount * 100);

    const ticketPost = {
      amount: totalAmount,
      purchaser: email,
      products: purchasedProducts.map((product) => product._id),
    };

    
    // Generar el ticket
    const ticket = await ticketService.createTicket(ticketPost);
    await sendEmailTicket(email, ticket);

    // Crear el objeto de información del pago
    const paymentIntentInfo = {
      amount: totalPriceCents,
      currency: "usd",
      metadata: {
        cartId: cart._id, // Puedes enviar el ID del carrito para referenciar la compra en el backend
      },
    };

    // Instanciar el servicio de pago
    const service = new PaymentService();
    // Crear el intento de pago
    const result = await service.createPaymentIntent(paymentIntentInfo);

    // Actualizar el carrito con los productos no comprados
    cart.products = cart.products.filter(
      (productData) => !failedProducts.includes(productData.product)
    );
    await cart.save();
    // Responder con el resultado

    res.json({ ticket, failedProducts, result });
  } catch (error) {
    next(error);
  }
};

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
};
const cartById = async (req, res) => {
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
};

const decreaseProduct = async (req, res) => {
  const { pid } = req.params;

  const { cartId } = req.user;
  console.log('Mi carrito', cartId);
  console.log('Mi pid', pid);

  try {
    if (cartId && pid) {
      const response = await cartsService.decreaseProductInCart(cartId._id, pid);
      res.json(response);
    } else {
      res.status(400).json({ error: "Falta el ID del carrito o del producto" });
    }
  } catch (error) {
    req.logger.error(`Error al agregar producto al carrito ${cartId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addProductCart = async (req, res) => {
  const { pid } = req.params;

  const { cartId, id} = req.user;


  try {
    if (cartId && pid) {
      const response = await cartsService.addToCart(cartId._id, pid, id);
      res.json(response);
    } else {
      res.status(400).json({ error: "Falta el ID del carrito o del producto" });
    }
  } catch (error) {
    req.logger.error(`Error al agregar producto al carrito ${cartId}:`, error);
    res.status(500).json({ error: error.message });
    console.log('sisisi',error);
  }
};

const getAllProductsByUser = async (req, res) => {
  try {
    const { cartId } = req.user;
    const allProducts = await cartsService.getAllProducts(cartId);
    res.status(200).send({ products: allProducts });
  } catch (error) {
    req.logger.error(`Error al obtener productos del carrito:`, error);
  }
};

const deleteProducInCart = async (req, res) => {
  const { pid } = req.params; // Obtener los IDs del carrito y del producto desde los parámetros de la URL
  const { cartId, id } = req.user; // Obtener el ID del usuario desde los parámetros de la URL

  try {
    // Verificar si el carrito existe y pertenece al usuario
    const userCart = await cartsService.getCartById(cartId._id);

    if (!userCart) {
      // Si el carrito no existe o no pertenece al usuario, devolver un error
      return res.status(404).json({ error: "Cart not found for this user" });
    }

    // Eliminar el producto del carrito
    const response = await cartsService.deleteProducInCart(cartId._id, pid);

    // Devolver una respuesta exitosa
    res.status(200).json({
      message: "Product removed from cart successfully",
      payload: response,
    });
  } catch (error) {
    // Si ocurre un error en el proceso, devolver un mensaje de error genérico
    console.error("Error while deleting product from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  postCart,
  cartById,
  addProductCart,
  purchaseCart,
  decreaseProduct,
  getAllProductsByUser,
  deleteProducInCart,
};
