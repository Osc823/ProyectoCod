import { cartModel } from "../../models/cart.model.js";

class CartDao {
  // Obtener todos los carritos

  constructor() {
   console.log("Working students with Database persistence in mongodb");
}

  async getCarts() {
    return cartModel.find();
  }

  // Obtener un carrito por su ID
  async getCartById(id) {
    return cartModel.findById(id);
  }

  // Crear un nuevo carrito
  async createCart() {
    return cartModel.create({ products: [] });
  }

  // Actualizar un producto en el carrito por su ID
  async updateProduct(id, product) {
    return cartModel.findByIdAndUpdate(id, product);
  }

  // Eliminar un producto del carrito por su ID
  async deleteProduct(id) {
    return cartModel.findByIdAndDelete(id);
  }

  // Agregar un producto al carrito por su ID
  async addToCart(cartId, productId, userId) {
    try {
      console.log('Qie estas', cartId, productId, userId);
      // Buscar el carrito por su ID y el ID del usuario
      const cart = await cartModel.findOne({ _id: cartId, userId: userId });
      console.log('Micarrito', cart);
      if (!cart) {
        console.error(`Error: Carrito con ID ${cartId} no encontrado para el usuario ${userId}.`);
        return null; // Retornar null si el carrito no se encuentra
      }
  
      // Buscar el producto en el carrito
      const productIndex = cart.products.findIndex(
        (p) => p.product == productId
      );

      console.log('Que responde', productIndex);
  
      // Si el producto no está, agregarlo; si está, incrementar la cantidad
      if (productIndex !== -1) {
        // Producto ya existe en el carrito, incrementar cantidad
        cart.products[productIndex].quantity++;
      } else {
        // Agregar nuevo producto al carrito
        cart.products.push({idProduct:productId, quantity: 1, product: productId });
        console.log('Aqui esta el problema', cart.products);
        console.log('Ids  produscts',productId);
      }
  
      // Guardar los cambios en la base de datos
      console.log(`Producto ${productId} agregado al carrito con ID ${cartId}.`);
      return await cart.save();
  
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
      throw error; // Propagar el error para que se maneje en el controlador
    }
  }
}

export default CartDao;
