import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongoose from "mongoose";  

const productSchema = new Schema({
  title: { type: String, required: true },

  description: { type: String, required: true },

  price: { type: Number, required: true },

  thumbnail: { type: String, required: true },

  code: { type: String, required: true },

  stock: { type: Number, required: true },

  marca:{type: String, Enum:["Nike","Adidas","Puma"]},

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
});

productSchema.plugin(mongoosePaginate);

const productModel = model("products", productSchema);

export { productModel };

