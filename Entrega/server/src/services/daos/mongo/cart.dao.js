
import { cartModel } from "../../models/cart.model.js";
import { productModel } from "../../models/product.model.js";
import { userModel } from "../../models/user.model.js";

class CartDao {
  // Obtener todos los carritos

  constructor() {
   console.log("Working students with Database persistence in mongodb");
}

  async getAllProducts(cartId) {
    const response = this.getCartById(cartId);
    return response.products;
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
 //Quitar cantidad al producto del carrito
 async decreaseProductInCart(cartId, productId) {
  try {
    // Buscar el carrito por su ID
    const cart = await cartModel.findById(cartId);
    console.log('Mi otro', cart);

    if (!cart) {
      console.error(`Error: Carrito con ID ${cartId} no encontrado.`);
      return null; // Retornar null si el carrito no se encuentra
    }

    // Encontrar el índice del producto en el carrito
    const productIndex = cart.products.findIndex(product => String(product.product) === String(productId));
    console.log('producto index', productIndex);
    if (productIndex === -1) {
      console.error(`Error: Producto con ID ${productId} no encontrado en el carrito.`);
      return null; // Retornar null si el producto no se encuentra en el carrito
    }

    // Decrementar la cantidad del producto en 1 si la cantidad actual es mayor que 1
    if (cart.products[productIndex].quantity > 1) {
      cart.products[productIndex].quantity -= 1;
    } else {
      // Eliminar el producto del carrito si la cantidad es 1
      cart.products.splice(productIndex, 1);
      console.log(`Producto con ID ${productId} eliminado del carrito.`);
    }

    // Guardar los cambios en la base de datos
    console.log(`Cantidad del producto con ID ${productId} disminuida en el carrito con ID ${cartId}.`);
    return await cart.save();
  } catch (error) {
    console.error("Error al disminuir la cantidad del producto en el carrito:", error.message);
    throw error; // Propagar el error para que se maneje en el controlador
  }
}



  // Agregar un producto al carrito por su ID
  async addToCart(cartId, productId, userId) {
    try {
      // Buscar el carrito por su ID y el ID del usuario
      const cart = await cartModel.findOne({ _id: cartId });
      const user = await userModel.findById(userId);
      const miProduct = await productModel.findById(productId);
  
      // Verificar si el usuario es el creador del producto
      if (miProduct.userId) {
        if (user._id.toString() === miProduct.userId.toString()) {
          console.log('holaaa',user._id,miProduct.userId );
          throw new Error('No se pueden agregar productos del mismo usuario al carrito');
        }
      }
      console.log('seguiii');
      if (!cart) {
        console.error(`Error: Carrito con ID ${cartId} no encontrado para el usuario ${userId}.`);
        return null; // Retornar null si el carrito no se encuentra
      }
  
      // Buscar el producto en el carrito
      const productIndex = cart.products.findIndex((p) => p.product.equals(productId));
  
      // Si el producto no está, agregarlo; si está, incrementar la cantidad
      if (productIndex !== -1) {
        // Producto ya existe en el carrito, incrementar cantidad
        cart.products[productIndex].quantity++;
      } else {
        // Agregar nuevo producto al carrito
        cart.products.push({ product: productId, quantity: 1 });
      }
  
      // Guardar los cambios en la base de datos
      console.log(`Producto ${productId} agregado al carrito con ID ${cartId}.`);
      return await cart.save();
  
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
      throw error; // Propagar el error para que se maneje en el controlador
    }
  }
  

  

  async deleteProducInCart (cartId, productId ) {
    return await cartModel.findOneAndUpdate(
      { _id: cartId},
      { $pull: { products: { product: productId } } }, // Utiliza $pull para eliminar el producto del array de productos del carrito
      { new: true }
  );
  }
}

export default CartDao;
