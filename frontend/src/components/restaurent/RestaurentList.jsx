import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const imageLinks = [
  "https://images.pexels.com/photos/29593682/pexels-photo-29593682/free-photo-of-street-view-of-historic-building-in-gothenburg.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/30482204/pexels-photo-30482204/free-photo-of-scenic-nyhavn-harbor-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/27977185/pexels-photo-27977185/free-photo-of-a-restaurant-with-plants-and-hanging-plants.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/15477351/pexels-photo-15477351/free-photo-of-a-wedding-reception-set-up-with-wooden-tables-and-chairs.jpeg?auto=compress&cs=tinysrgb&w=600"
];

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [review, setReview] = useState("");
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${import.meta.env.BACKEND_URL}/restaurent-api/all`);
        if (response.data && response.data.payload) {
          const updatedRestaurants = response.data.payload.map((restaurant, index) => ({
            ...restaurant,
            imageLink: imageLinks[index % imageLinks.length]
          }));
          setRestaurants(updatedRestaurants);
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleReviewSubmit = async (restaurantName) => {
    if (review.trim()) {
      setSubmittingReview(true);
      try {
        await axios.post(`${import.meta.env.BACKEND_URL}/restaurent-api/review/${restaurantName}`, { review });

        setSelectedRestaurant((prev) => ({
          ...prev,
          review: [...(prev.review || []), review],
        }));

        setReview("");
      } catch (error) {
        console.error("Error submitting review:", error);
      } finally {
        setSubmittingReview(false);
      }
    }
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setLoadingReviews(true);
    setTimeout(() => setLoadingReviews(false), 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 text-9xl"
        >🍽</motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-green-400 to-blue-500 relative">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Restaurant List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <motion.div
            key={restaurant._id}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleRestaurantSelect(restaurant)}
            className="bg-white rounded-lg shadow-md cursor-pointer overflow-hidden transition"
          >
            <img
              src={restaurant.imageLink}
              alt={restaurant.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-center">{restaurant.name}</h3>
              <p className="text-sm text-center text-gray-600">{restaurant.location}</p>
              <p className="text-center text-gray-800 mt-2">Tables Available: {restaurant.tablesAvailable}</p>
              <p className="text-center text-gray-800 mt-2">
                Rating: {restaurant.review?.length > 0 ? `${restaurant.review.length} ⭐` : "No reviews yet"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedRestaurant && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 p-6 bg-white shadow-lg rounded-lg"
        >
          <h3 className="text-2xl font-bold mb-4">{selectedRestaurant.name}</h3>
          <p className="text-gray-700 mb-4">{selectedRestaurant.description}</p>
          <div className="mb-4">
            <h4 className="font-semibold">Reviews</h4>
            {loadingReviews ? <p>Loading reviews...</p> : (
              <ul className="space-y-2">
                {selectedRestaurant.review?.length > 0 ? (
                  selectedRestaurant.review.map((rev, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded-md">{rev}</li>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Add a Review</h4>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded-md"
              placeholder="Write your review..."
            ></textarea>
            <button
              onClick={() => handleReviewSubmit(selectedRestaurant.name)}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              disabled={submittingReview}
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantList;