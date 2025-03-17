import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function AddRestaurant({ onRestaurantAdded = () => {} }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    totalTables: '',
    tablesAvailable: '',
    imagesLink: [],
    menuImage: [],
  });

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    }
  }, []);

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, [field]: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file) => data.append(key, file));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const token = await auth.getToken();
      const response = await axios.post(`${import.meta.env.BACKEND_URL}/restaurent-api/details`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Restaurant added successfully!');
      onRestaurantAdded(response.data);
      navigate('/restaurentlist');
    } catch (error) {
      console.error('Error adding restaurant:', error.response ? error.response.data : error);
      alert('Failed to add restaurant. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 p-6 relative">
      <div className="bg-green-100 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Restaurant</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Restaurant Name" className="w-full p-2 border rounded" required 
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <textarea placeholder="Description" className="w-full p-2 border rounded" required 
            value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
          <input type="text" placeholder="Address" className="w-full p-2 border rounded" required 
            value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          <div className="flex gap-2">
            <input type="text" placeholder="Latitude" className="p-2 border rounded" value={formData.latitude} readOnly />
            <input type="text" placeholder="Longitude" className="p-2 border rounded" value={formData.longitude} readOnly />
          </div>
          <input type="number" placeholder="Total Tables" className="w-full p-2 border rounded" required 
            value={formData.totalTables} onChange={(e) => setFormData({ ...formData, totalTables: Number(e.target.value) })} />
          <input type="number" placeholder="Available Tables" className="w-full p-2 border rounded" required 
            value={formData.tablesAvailable} onChange={(e) => setFormData({ ...formData, tablesAvailable: Number(e.target.value) })} />
          <div>
            <label className="block font-semibold">Upload Restaurant Images</label>
            <input type="file" multiple accept="image/*" className="w-full p-2 border rounded" 
              onChange={(e) => handleFileChange(e, 'imagesLink')} />
          </div>
          <div>
            <label className="block font-semibold">Upload Menu Images</label>
            <input type="file" multiple accept="image/*" className="w-full p-2 border rounded" 
              onChange={(e) => handleFileChange(e, 'menuImage')} />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">
            Add Restaurant
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRestaurant;