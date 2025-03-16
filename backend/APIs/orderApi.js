const express = require("express");
const router = express.Router();
const Order = require("../Models/odiModel");
const { requireAuth } = require("@clerk/clerk-sdk-node");

// ✅ **Place an Order**
router.post("/place-order", requireAuth, async (req, res) => {
  try {
    const { user, items, totalAmount, paymentMethod, orderStatus, deliveryDate } = req.body;

    if (!user || !items || !totalAmount || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newOrder = new Order({
      user,
      items,
      totalAmount,
      paymentMethod,
      orderStatus,
      deliveryDate,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order", details: error.message });
  }
});

// ✅ **Fetch Orders by User**
router.get("/orders/user", requireAuth, async (req, res) => {
  try {
    const { email } = req.auth.user;
    if (!email) {
      return res.status(400).json({ error: "User email is required." });
    }

    console.log("Fetching orders for user:", email);
    const orders = await Order.find({ "user.email": email });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.status(200).json({ payload: orders });
  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch orders", details: error.message });
  }
});

// ✅ **Fetch All Orders**
router.get("/orders/all", requireAuth, async (req, res) => {
  try {
    console.log("Fetching all orders...");
    const orders = await Order.find({});

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders", details: error.message });
  }
});

// ✅ **Cancel an Order**
router.delete("/cancel/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel order", details: error.message });
  }
});

module.exports = router;