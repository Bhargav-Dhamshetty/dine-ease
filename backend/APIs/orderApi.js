const exp=require('express')
const expressAsyncHandler=require('express-async-handler')
const Order=require('../models/ordersModel')
const orderApp=exp.Router()


orderApp.get('/myorders/:email', expressAsyncHandler(async (req, res) => {
    const { email } = req.params;
    const orderList = await Order.find({ email }).select('-__v'); // Excluding __v field
    if (orderList.length) {
        res.status(200).json({ message: "Orders found", payload: orderList });
    } else {
        res.status(404).json({ message: "No orders found for this user" });
    }
}));

// Place a new order
orderApp.post('/order', expressAsyncHandler(async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", payload: savedOrder });
    } catch (error) {
        res.status(400).json({ message: "Failed to place order", error: error.message });
    }
}));

// Get all orders (for restaurant owners/admins)
orderApp.get('/orders', expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().select('-__v');
    if (orders.length) {
        res.status(200).json({ message: "Order list", payload: orders });
    } else {
        res.status(404).json({ message: "No orders found" });
    }
}));
module.exports=orderApp;