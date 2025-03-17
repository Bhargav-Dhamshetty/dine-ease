import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function Tables() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [tableStatus, setTableStatus] = useState(Array(20).fill(0));

  useEffect(() => {
    axios
      .get(`${import.meta.env.BACKEND_URL}/restaurent-api/all`)
      .then((res) => setRestaurants(res.data.payload || []))
      .catch((err) => console.error("❌ Error fetching restaurants:", err));
  }, []);

  useEffect(() => {
    if (selectedRestaurant) {
      axios
        .get(`${import.meta.env.BACKEND_URL}/table-api/bookings`, {
          params: { restaurantName: selectedRestaurant }, // Ensure backend supports this
        })
        .then((res) => {
          if (res.data && Array.isArray(res.data)) {
            const bookedTables = res.data.map((booking) => booking.tableNumber);
            const updatedStatus = Array(20).fill(0);
            bookedTables.forEach((tableNum) => {
              if (tableNum >= 1 && tableNum <= 20) updatedStatus[tableNum - 1] = 1;
            });
            setTableStatus(updatedStatus);
          } else {
            console.error("❌ Unexpected API response format:", res.data);
          }
        })
        .catch((err) => console.error("❌ Error fetching table status:", err));
    }
  }, [selectedRestaurant]);

  const handleRestaurantChange = (event) => {
    setSelectedRestaurant(event.target.value);
  };

  const handleTableClick = async (index) => {
    if (!user) return alert("⚠️ Please log in to book a table.");
    if (!selectedRestaurant) return alert("⚠️ Please select a restaurant first.");
    if (tableStatus[index] === 1) {
      return alert("⚠️ This table is already booked!");
    }

    const selectedRestDetails = restaurants.find((res) => res.name === selectedRestaurant);
    if (!selectedRestDetails) {
      return alert("⚠️ Invalid restaurant selection.");
    }

    if (!user.primaryEmailAddress) {
      return alert("⚠️ No email associated with this account. Please update your profile.");
    }

    const numberOfGuests = prompt("Enter the number of guests:");
    if (!numberOfGuests || isNaN(numberOfGuests) || numberOfGuests <= 0) {
      return alert("⚠️ Invalid number of guests. Must be a positive number.");
    }

    const bookingData = {
      customerName: user.fullName || "Guest",
      email: user.primaryEmailAddress?.emailAddress || "",
      mobile: user.phoneNumbers?.[0]?.phoneNumber || "N/A",
      restaurantName: selectedRestaurant,
      tableNumber: index + 1,
      address: selectedRestDetails.location || "Unknown",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString(),
      numberOfGuests: Number(numberOfGuests),
      foodItems: [],
    };

    console.log("📤 Sending booking data:", bookingData);

    try {
      const response = await axios.post(`${import.meta.env.BACKEND_URL}/table-api/book-table`, bookingData);

      if (response.status === 201) {
        setTableStatus((prevStatus) => {
          const updatedStatus = [...prevStatus];
          updatedStatus[index] = 1;
          return updatedStatus;
        });

        alert("✅ Table booked successfully! You will receive an email confirmation.");
        navigate("/mybookings");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      console.error("❌ Error booking table:", err?.response?.data || err);
      alert(`❌ Booking failed: ${err.response?.data?.message || "Please try again."}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h2 className="text-3xl font-bold my-6">Table Booking</h2>

      <select
        value={selectedRestaurant}
        onChange={handleRestaurantChange}
        className="mb-4 p-2 border rounded"
      >
        <option value="">Select a Restaurant</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant._id} value={restaurant.name}>
            {restaurant.name}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-5 gap-4">
        {tableStatus.map((status, index) => (
          <div
            key={index}
            className={`w-20 h-20 rounded-md transition-all duration-300 
              ${status === 0 ? "bg-green-500" : "bg-red-500"} 
              hover:scale-105 cursor-pointer`}
            onClick={() => handleTableClick(index)}
          >
            <span className="text-white text-center flex items-center justify-center h-full font-bold">
              {status === 0 ? "Open" : "Booked"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tables;