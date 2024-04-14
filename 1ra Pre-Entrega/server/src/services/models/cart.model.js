import mongoose from "mongoose";  

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" } // Nuevo campo para almacenar el ID del usuario asociado al carrito
});

const cartModel = mongoose.model("cart", cartSchema); // Cambiar el nombre del modelo a "Cart"

export { cartModel };
