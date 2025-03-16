import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const foodImages = [
  { url: "https://images.pexels.com/photos/28674660/pexels-photo-28674660.jpeg", name: "Chicken Biryani" },
  { url: "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg", name: "Chicken Burger" },
  { url: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg", name: "Tandoori Chicken" },
  { url: "https://images.pexels.com/photos/209540/pexels-photo-209540.jpeg", name: "Dal" },
  { url: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg", name: "Fresh Salad" },
  { url: "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg", name: "Vanilla Cake" },
  { url: "https://images.pexels.com/photos/5410403/pexels-photo-5410403.jpeg", name: "Fish" },  // ✅ Fixed Dosa image link
  { url: "https://images.pexels.com/photos/2878742/pexels-photo-2878742.jpeg", name: "Paneer Tikka" },
  { url: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg", name: "Pizza" },
  { url: "https://images.pexels.com/photos/2773940/pexels-photo-2773940.jpeg", name: "Spicy Hakka Noodles" },
  { url: "https://images.pexels.com/photos/1586942/pexels-photo-1586942.jpeg", name: "Potato Fries" },
  { url: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg", name: "Bhel Puri" },
];


const foodItems = Array.from({ length: 12 }, (_, index) => {
  const { url, name } = foodImages[index % foodImages.length];
  return {
    id: index + 1,
    name,
    price: Math.floor(Math.random() * 200) + 50, // ₹50 - ₹250
    image: url,
  };
});

function Order() {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: { ...item, quantity: (prev[item.id]?.quantity || 0) + 1 },
    }));
  };

  const handleQuantityChange = (id, type) => {
    setCart((prev) => {
      const updatedCart = { ...prev };

      if (type === "increase") {
        updatedCart[id].quantity += 1;
      } else if (type === "decrease") {
        updatedCart[id].quantity -= 1;
        if (updatedCart[id].quantity <= 0) delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  const handleProceedToPayment = () => {
    const orderDetails = {
      date: new Date().toISOString(),
      items: Object.values(cart),
      totalAmount: Object.values(cart).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    };

    // Save to localStorage for MyOrders page
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, orderDetails]));

    navigate("/myorders");
  };

  const totalPrice = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 text-9xl"
        >
          🍽
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
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
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
          <h3 className="text-xl font-bold text-right mt-4">
            Total: ₹{totalPrice.toFixed(2)}
          </h3>
          <button
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default Order;
