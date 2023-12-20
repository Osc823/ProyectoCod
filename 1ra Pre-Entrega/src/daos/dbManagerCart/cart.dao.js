import { cartModel } from "../../models/cart.model.js";

class CartDao {
  // Obtener todos los carritos
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
  async addToCart(cartId, productId) {
    try {
      // Buscar el carrito por su ID
      const cart = await cartModel.findById(cartId);

      if (!cart) {
        console.error(`Error: Carrito con ID ${cartId} no encontrado.`);
        return;
      }

      // Buscar el producto en el carrito
      const productIndex = cart.products.findIndex(
        (p) => p.idProduct === productId
      );

      // Si el producto no está, agregarlo; si está, incrementar la cantidad
      if (productIndex !== -1) {
        // Producto ya existe en el carrito, incrementar cantidad
        cart.products[productIndex].quantity++;
      } else {
        // Agregar nuevo producto al carrito
        cart.products.push({ idProduct: productId, quantity: 1 });
      }

      // Guardar los cambios en la base de datos
      await cart.save();

      console.log(`Producto ${productId} agregado al carrito con ID ${cart.id}.`);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
    }
  }
}

export default new CartDao();
