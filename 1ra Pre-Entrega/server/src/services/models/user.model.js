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
});

const userModel = mongoose.model("users", userSchema);

export { userModel };
