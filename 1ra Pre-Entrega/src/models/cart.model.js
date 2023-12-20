import mongoose from "mongoose";  

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

const cartModel = mongoose.model("cart", cartSchema);

export { cartModel };
