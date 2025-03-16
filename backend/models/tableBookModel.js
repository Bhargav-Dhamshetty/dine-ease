const mongoose = require("mongoose");

const tableBookingSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true }, // Ensuring lowercase storage for consistency
  restaurantName: String,
  tableNumber: Number,
  address: String,
  date: String,
  time: String,
});

// Check if the model already exists before defining it
const TableBooking = mongoose.models.TableBooking || mongoose.model("TableBooking", tableBookingSchema);

module.exports = TableBooking;