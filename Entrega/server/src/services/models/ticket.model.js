import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    purchase_datetime: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    products: {type: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, required: true, default: 1 },
    }]}
});

const ticketModel = mongoose.model("Ticket", ticketSchema);

export { ticketModel };
