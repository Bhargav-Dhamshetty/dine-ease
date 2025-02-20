import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OrdersList = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Cheese Burst Pizza",
      image: "https://source.unsplash.com/200x200/?pizza",
      timeLeft: 180, // Time left in seconds
    },
    {
      id: 2,
      name: "Grilled Chicken Burger",
      image: "https://source.unsplash.com/200x200/?burger",
      timeLeft: 45, // Less than 1 min (triggers warning animation)
    },
    {
      id: 3,
      name: "Chocolate Shake",
      image: "https://source.unsplash.com/200x200/?shake",
      timeLeft: 300, // 5 mins
    },
  ]);

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
      <h2 className="text-3xl font-bold text-center mb-6">📦 Order List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
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
                  animate={{
                    scale: order.timeLeft < 60 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  {order.timeLeft > 0
                    ? `${Math.floor(order.timeLeft / 60)}m ${order.timeLeft % 60}s`
                    : "Expired"}
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
