import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const hotelName = localStorage.getItem("hotelName"); // Get hotel name from localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      if (!hotelName) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/order-api/hotelorders/${hotelName}`);
        const fetchedOrders = response.data.payload
          ? response.data.payload.map((order, index) => ({
              id: order._id,
              name: order.items?.map((item) => item.name).join(", ") || "No items",
              image: "https://source.unsplash.com/200x200/?food",
              timeLeft: 300 - index * 60,
            }))
          : [];

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [hotelName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.timeLeft > 0 ? { ...order, timeLeft: order.timeLeft - 1 } : order
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">🏨 Orders for {hotelName || "Your Hotel"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: order.id * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={order.image}
                alt={order.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{order.name}</h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-gray-600">⏳ Time Left:</span>
                  <motion.span
                    className={`text-lg font-bold ${
                      order.timeLeft < 60 ? "text-red-500 animate-pulse" : "text-green-600"
                    }`}
                    animate={{ scale: order.timeLeft < 60 ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    {order.timeLeft > 0
                      ? `${Math.floor(order.timeLeft / 60)}m ${order.timeLeft % 60}s`
                      : "Expired"}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600">No orders found for this hotel.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersList;