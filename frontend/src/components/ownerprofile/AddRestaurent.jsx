import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRestaurent() {
  const [formData, setFormData] = useState({
    name: '',
    imagesLink: [],
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    totalTables: '',
    menuImage: [],
  });
  
  const navigate = useNavigate();

  // Function to handle file uploads
  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, [field]: files }));
  };

  // Function to get user location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:9000/restaurant-api/details', formData);
      alert('Restaurant added successfully!');
      navigate('/restaurentlist');
    } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('Failed to add restaurant. Try again!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 p-6">
      <div className="bg-green-100 p-8 rounded-lg shadow-lg w-full max-w-2xl animate-fade-in ">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Restaurant</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <input type="text" placeholder="Restaurant Name" className="w-full p-2 border rounded" required
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          
          <textarea placeholder="Description" className="w-full p-2 border rounded" required
            value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
          
          <input type="text" placeholder="Address" className="w-full p-2 border rounded" required
            value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          
          <div className="flex gap-2">
            <button type="button" className="p-2 bg-blue-600 text-white rounded" onClick={getLocation}>Get My Location</button>
            <input type="text" placeholder="Latitude" className="p-2 border rounded" value={formData.latitude} readOnly />
            <input type="text" placeholder="Longitude" className="p-2 border rounded" value={formData.longitude} readOnly />
          </div>
          
          <input type="number" placeholder="Total Tables" className="w-full p-2 border rounded" required
            value={formData.totalTables} onChange={(e) => setFormData({ ...formData, totalTables: e.target.value })} />
          
          <div>
            <label className="block font-semibold">Upload Restaurant Images</label>
            <input type="file" multiple accept="image/*" className="w-full p-2 border rounded" onChange={(e) => handleFileChange(e, 'imagesLink')} />
          </div>
          
          <div>
            <label className="block font-semibold">Upload Menu Images</label>
            <input type="file" multiple accept="image/*" className="w-full p-2 border rounded" onChange={(e) => handleFileChange(e, 'menuImage')} />
          </div>
          
          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">Add Restaurant</button>
        </form>
      </div>
    </div>
  );
}

export default AddRestaurent;
