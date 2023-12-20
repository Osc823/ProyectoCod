import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username: { type: String, required: true },
    messages: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Agregando campo de fecha
});

const messageModel = mongoose.model("Message", messageSchema); // Cambiando el nombre del modelo

export { messageModel };
