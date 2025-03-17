import React, { useEffect, useState } from "react";
import axios from "axios";

function TableBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // ✅ Fetch all bookings without any query parameters
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/table-api/booking/all`);

        if (response.status === 200) {
          setBookings(response.data || []);
        } else {
          throw new Error("Unexpected response from server.");
        }
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
        setError(err.response?.data?.message || "❌ Failed to fetch bookings. Please check the API.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-400 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6">📅 All Table Bookings</h1>

      {loading && (
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">⏳ Loading bookings...</button>
      )}
      {error && (
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">{error}</button>
      )}

      {!loading && !error && bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-gray-800">{booking.restaurantName}</h2>
              <p className="text-gray-600">📍 Address: {booking.address}</p>
              <p className="text-gray-600">🍽️ Table No: {booking.tableNumber}</p>
              <p className="text-gray-600">📅 Date: {booking.date}</p>
              <p className="text-gray-600">⏰ Time: {booking.time}</p>
              <p className="text-gray-600">👥 Guests: {booking.numberOfGuests || "N/A"}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">🚫 No bookings found.</button>
        )
      )}
    </div>
  );
}

export default TableBookings;