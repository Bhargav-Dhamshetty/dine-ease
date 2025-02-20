import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { motion } from 'framer-motion';

function MyOrders() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/orders/myorders/${user.primaryEmailAddress}`);
      setOrders(response.data.payload || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-600 to-gray-800 p-6"
    >
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">My Orders</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div 
                key={index} 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border rounded-lg p-4 shadow-md bg-gray-50 hover:shadow-lg transition"
              >
                <p className="font-semibold">Order Date: <span className="text-gray-700">{order.date}</span></p>
                <p className="font-semibold">Time: <span className="text-gray-700">{order.time}</span></p>
                <p className="font-semibold">Address: <span className="text-gray-700">{order.address}</span></p>
                <p className="font-semibold">Mobile: <span className="text-gray-700">{order.mobile}</span></p>
                <div className="mt-2">
                  <p className="font-semibold">Items:</p>
                  <ul className="list-disc list-inside">
                    {order.items.map((item, i) => (
                      <li key={i} className="text-gray-700">{item.itemName}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default MyOrders;
