import { useContext, useEffect, useState } from 'react';
import { UserOwnerContextObj } from '../context/UserOwnerContext';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const images = [
  "https://images.pexels.com/photos/28674546/pexels-photo-28674546/free-photo-of-crispy-fried-chicken-wings-on-rustic-wooden-plate.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://media.istockphoto.com/id/1292563627/photo/assorted-south-indian-breakfast-foods-on-wooden-background-ghee-dosa-uttappam-medhu-vada.jpg?b=1&s=612x612&w=0&k=20&c=ImfVnx-E7XlSJLcJ1oOJ5QSEjwdsOj3fCatoqhoWaWQ=",
  "https://media.istockphoto.com/id/1250567402/photo/table-top-view-of-indian-food.jpg?b=1&s=612x612&w=0&k=20&c=n2bAkONqFXuAYC6yW3xcxyZbl22OQLlqUiUYWwL2pRE=",
  "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1200"
];

function Home() {
  const { currentUser, setCurrentUser } = useContext(UserOwnerContextObj);
  const { isSignedIn, user } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  // Ensure user details are stored properly
  useEffect(() => {
    if (isSignedIn && user) {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        email: user.primaryEmailAddress?.emailAddress || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        profileImageUrl: user.profileImageUrl || "",
      }));
    }
  }, [isSignedIn, user, setCurrentUser]);

  async function onSelectRole(selectedRole) {
    setError('');

    if (!currentUser || !currentUser.email) {
      setError("User details are missing. Please sign in again.");
      return;
    }

    try {
      const userData = {
        email: currentUser.email,
        role: selectedRole,
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        profileImageUrl: currentUser.profileImageUrl || '',
      };

      console.log("Sending data:", userData); // Debugging

      let res = await axios.post(`${import.meta.env.BACKEND_URL}/user-api/register`, userData, {
        headers: { 'Content-Type': 'application/json' }
      });

      let { message, payload } = res.data;

      if (message === "User registered successfully" || message === "User exists") {
        setCurrentUser({ ...currentUser, ...payload });
        localStorage.setItem("currentUser", JSON.stringify(payload));

        // Navigate based on the selected role
        if (selectedRole === 'owner') navigate('/addrestaurent');
        else if (selectedRole === 'user') navigate('/order');
      } else {
        setError(message);
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed.");
    }
  }

  useEffect(() => {
    if (!currentUser || !currentUser.role) return;

    if (currentUser.role === 'owner' && !error) navigate('/addrestaurent');
    else if (currentUser.role === 'user' && !error) navigate('/restaurentlist');
    else if (isSignedIn && !currentUser.role) navigate('/myfavourites');
  }, [currentUser?.role, error, navigate, isSignedIn]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-yellow-500 to-orange-500 flex flex-col items-center justify-center text-white overflow-hidden">
      {isSignedIn ? (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <p className="text-2xl mb-4">Select Role</p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-md" onClick={() => onSelectRole('user')}>
              User
            </button>
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 transition-all rounded-md" onClick={() => onSelectRole('owner')}>
              Owner
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <img src={images[currentIndex]} alt="Tourist spot" className="w-full h-full object-cover transition-opacity duration-700" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-400">Welcome to DineEase</h1>
            <p className="text-lg">
              <Typewriter
                options={{
                  strings: [
                    "Explore the best Indian food near you!",
                    "Order from your favorite restaurants!",
                    "Delicious meals delivered at your doorstep!",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </p>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => navigate("/signup")} className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg transition">
              Get Started
            </motion.button>
          </div>
          <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-2 rounded-full hover:bg-gray-600">
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-2 rounded-full hover:bg-gray-600">
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;