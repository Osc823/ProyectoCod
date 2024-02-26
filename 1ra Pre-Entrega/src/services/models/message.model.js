import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username: { type: String, required: true },
    messages: { type: String, required: true }
});

const messageModel = mongoose.model("Message", messageSchema); // Cambiando el nombre del modelo

export { messageModel };
