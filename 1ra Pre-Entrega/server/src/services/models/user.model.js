import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  loggedBy: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role:{type: String, Enum:["user","premium"], default:"user"},
  hide:{
    type: Boolean,
    default: true,
  },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
  created_at: { type: Date, required: true, default: Date.now },
});

userSchema.pre("findOne", function () {
  this.populate("cartId");
});

const userModel = mongoose.model("users", userSchema);

export { userModel };
