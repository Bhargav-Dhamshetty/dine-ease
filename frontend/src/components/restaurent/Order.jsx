import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const foodImages = [
  "https://images.pexels.com/photos/28674660/pexels-photo-28674660.jpeg",
  "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg",
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
  "https://images.pexels.com/photos/209540/pexels-photo-209540.jpeg",
  "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
  "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg",
  "https://images.pexels.com/photos/6006455/pexels-photo-6006455.jpeg",
  "https://images.pexels.com/photos/2878742/pexels-photo-2878742.jpeg",
  "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
  "https://images.pexels.com/photos/2773940/pexels-photo-2773940.jpeg",
];

const foodItems = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  name: `Food Item ${index + 1}`,
  price: Math.floor(Math.random() * 20) + 5,
  image: foodImages[index % foodImages.length],
}));

function Order() {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Loading animation for 3 seconds
  }, []);

  const handleAddToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: { ...item, quantity: (prev[item.id]?.quantity || 0) + 1 },
    }));
  };

  const handleQuantityChange = (id, type) => {
    setCart((prev) => {
      if (type === "increase") {
        return { ...prev, [id]: { ...prev[id], quantity: prev[id].quantity + 1 } };
      } else if (type === "decrease" && prev[id].quantity > 1) {
        return { ...prev, [id]: { ...prev[id], quantity: prev[id].quantity - 1 } };
      } else {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 text-9xl "
        >
          🍽️ {/* Spinning plate animation */}
        </motion.div>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-400 via-blue-500 to-green-400 p-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        Order Your Favorite Food
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foodItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
              style={{ borderRadius: "10px" }}
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
              <button
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {Object.keys(cart).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 p-6 bg-white shadow-lg rounded-lg"
        >
          <h3 className="text-2xl font-bold text-center">Your Cart</h3>
          <div className="mt-4">
            {Object.values(cart).map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-3"
              >
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                  >
                    -
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                    onClick={() => handleQuantityChange(item.id, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
            Proceed to Payment
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default Order;
