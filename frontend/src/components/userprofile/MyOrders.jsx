import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // Function to cancel an order
  const cancelOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 bg-gray-900 text-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">My Orders</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="border rounded-lg p-4 shadow-md mb-4 bg-white text-black"
          >
            <p><b>Order Date:</b> {new Date(order.date).toLocaleString()}</p>
            <p><b>Items:</b> {order.items.map(item => `${item.name} (x${item.quantity})`).join(", ")}</p>
            <p><b>Total Amount:</b> ${order.totalAmount}</p>
            <button 
              onClick={() => cancelOrder(index)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Cancel Order
            </button>
          </motion.div>
        ))
      ) : (
        <p className="text-center">No orders found.</p>
      )}
      <button onClick={() => navigate("/foodorders")} className="bg-green-500 text-white px-6 py-3 rounded mt-4 block mx-auto">
        Order Now
      </button>
    </motion.div>
  );
}

export default MyOrders;