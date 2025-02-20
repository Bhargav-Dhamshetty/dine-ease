import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

function MyBookings() {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://localhost:9000/order-api/myorders/${user.primaryEmailAddress}`)
        .then((res) => {
          setBookings(res.data.payload || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-400 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6 animate-fade-in">My Bookings</h1>
      {loading ? (
        <p className="text-white text-lg">Loading your bookings...</p>
      ) : bookings.length > 0 ? (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 animate-slide-in">
          {bookings.map((booking, index) => (
            <div key={index} className="border-b p-4 last:border-b-0">
              <h2 className="text-xl font-semibold">Restaurant: {booking.restaurantName}</h2>
              <p className="text-gray-600">Date: {booking.date}</p>
              <p className="text-gray-600">Time: {booking.time}</p>
              <p className="text-gray-600">Address: {booking.address}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-lg">No bookings yet.</p>
      )}
    </div>
  );
}

export default MyBookings;
