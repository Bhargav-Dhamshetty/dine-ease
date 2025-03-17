import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Restaurent() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.BACKEND_URL}/restaurant-api/all`)
      .then(response => {
        setRestaurant(response.data.payload);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching restaurant details:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          <p className="mt-4 text-gray-600 text-lg font-semibold animate-pulse">Fetching Restaurant Details...</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <h2 className="text-3xl font-bold mb-4">{restaurant.name}</h2>
          <img src={restaurant.imagesLink[0]} alt={restaurant.name} className="w-full rounded-lg mb-4" />
          <p className="text-gray-700 mb-2">{restaurant.description}</p>
          <p className="text-gray-500">Location: {restaurant.location}</p>
          <button onClick={() => window.open(`https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}`)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
            Open in Google Maps
          </button>
        </div>
      )}
      
      <style>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Restaurent;