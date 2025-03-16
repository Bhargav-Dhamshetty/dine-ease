import { useContext } from 'react';
import { SignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import image from '../../assets/image.png';
import { UserOwnerContextObj } from '../context/UserOwnerContext'; // Ensure proper import

function Login() {
  const { currentUser } = useContext(UserOwnerContextObj);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 via-blue-600 to-indigo-900 p-6 overflow-hidden">
      
      {/* Background Animated Zig-Zag Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div 
          className="absolute w-full h-full"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="zigzagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopOpacity="0.8" stopColor="#ffffff" />
                <stop offset="100%" stopOpacity="0.2" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            {[10, 30, 50, 70, 90].map((y, index) => (
              <path 
                key={index}
                fill="none"
                stroke="url(#zigzagGradient)"
                strokeWidth="3"
                d={`M0 ${y} Q25 ${y + 20} 50 ${y} T100 ${y}`} 
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Content Wrapper */}
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex items-center space-x-12 z-10">
        
        {/* 3D Image (Left Side) */}
        <motion.img
          src={image}
          alt="Login Illustration"
          className="w-72 h-72 object-contain drop-shadow-2xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Clerk SignIn Component - Branding Removed */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-sm"
        >
          <SignIn 
            signUpUrl="/signup" // Redirect to signup page
            appearance={{
              elements: {
                footer: "hidden", // Hides "Secured by Clerk"
                headerSubtitle: "hidden", // Hides unnecessary Clerk text
                card: "shadow-xl rounded-lg border border-gray-300 bg-white", // Softer background
              },
              layout: {
                logoPlacement: "none", // Removes Clerk logo
              },
            }} 
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Login;