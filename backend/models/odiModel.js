const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
  orderStatus: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
});

// Check if the model already exists before defining it
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;