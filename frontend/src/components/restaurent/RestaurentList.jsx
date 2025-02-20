import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState(null);  // Start with null to indicate loading state
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [review, setReview] = useState('');
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurent/all');
        if (response.data && response.data.payload) {
          setRestaurants(response.data.payload);
          setLoading(false);  // Data has successfully loaded
        } else {
          setRestaurants([]);  // No restaurants found, still stop loading
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setLoading(false);  // Stop loading even on error
      }
    };
    
    fetchRestaurants();
  }, []);

  const handleReviewSubmit = (restaurantName) => {
    if (review.trim()) {
      axios.post(`/api/restaurent/review/${restaurantName}`, { review })
        .then((response) => {
          alert('Review added successfully!');
          setReview('');
        })
        .catch((error) => {
          console.error('Error submitting review:', error);
        });
    }
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setLoadingReviews(true);

    // Simulate a delay in loading reviews
    setTimeout(() => {
      setLoadingReviews(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 text-9xl"
        >
          🍽️
        </motion.div>
      </div>
    );
  }

  if (restaurants === null || restaurants.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-600">
  <motion.div
    animate={{
      rotate: [0, 360], // Rotating from 0 to 360 degrees
      scale: [1, 1.2, 1], // Scaling effect
    }}
    transition={{
      duration: 3, // Duration for the rotation and scaling animation
      ease: 'easeInOut',
      repeat: Infinity,
    }}
    className="w-20 h-20 bg-gradient-to-r from-blue-400 to-green-500 bg-[length:400%_400%] animate-[gradientAnimation_3s_linear_infinite] rounded-full"
  />
</div>

    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-green-400 to-blue-500">
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
              src={restaurant.imagesLink[0]}
              alt={restaurant.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-center">{restaurant.name}</h3>
              <p className="text-sm text-center text-gray-600">{restaurant.location}</p>
              <p className="text-center text-gray-800 mt-2">Rating: {restaurant.review.length ? `${(restaurant.review.length)} ⭐` : 'No reviews yet'}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedRestaurant && (
        <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold mb-4">{selectedRestaurant.name}</h3>
          <p className="text-gray-700 mb-4">{selectedRestaurant.description}</p>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => window.open(`https://www.google.com/maps?q=${selectedRestaurant.latitude},${selectedRestaurant.longitude}`, '_blank')}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              View on Maps
            </button>
          </div>

          {/* Loading Animation for Reviews */}
          <div className="mb-4">
            <h4 className="font-semibold">Reviews</h4>
            {loadingReviews ? (
              <div className="flex justify-center items-center mt-4">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-blue-400 to-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              </div>
            ) : (
              <ul className="space-y-2">
                {(selectedRestaurant.review || []).map((rev, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded-md">
                    {rev}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Add a Review</h4>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="4"
              className="w-full p-2 border rounded-md"
              placeholder="Write your review..."
            ></textarea>
            <button
              onClick={() => handleReviewSubmit(selectedRestaurant.name)}
              className="mt-3 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantList;
