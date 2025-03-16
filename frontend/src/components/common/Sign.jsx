import React from "react";
import { motion } from "framer-motion";
import { SignUp } from "@clerk/clerk-react"; // ✅ Import Clerk Signup Component
import signup from "../../assets/signup.png";

function Sign() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      
      {/* Animated Background Lines */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ opacity: [0.3, 0.8, 0.3], x: ["-10%", "10%", "-10%"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      >
        <svg className="absolute w-full h-full opacity-20">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff8c00" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff0080" stopOpacity="1" />
            </linearGradient>
          </defs>
          {[...Array(25)].map((_, i) => {
            const x = Math.random() * 100 + "%";
            return (
              <motion.line
                key={i}
                x1={x}
                y1="0%"
                x2={x}
                y2="100%"
                stroke="url(#grad)"
                strokeWidth="1.5"
                opacity="0.4"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 6 + 4,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Signup Container */}
      <motion.div
        className="relative z-10 bg-gray-900/90 p-10 rounded-2xl shadow-2xl flex flex-col md:flex-row w-[90%] max-w-5xl items-center space-y-6 md:space-y-0 md:space-x-12"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Left: Signup 3D Image */}
        <motion.div 
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img src={signup} alt="Signup 3D" className="w-[80%] object-contain rounded-lg drop-shadow-2xl"/>
        </motion.div>

        {/* ✅ Clerk Signup Component */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <SignUp />
        </motion.div>

      </motion.div>
    </div>
  );
}

export default Sign;
