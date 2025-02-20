import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import signup from "../../assets/signup.png";

function Signup() {
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
              <stop offset="0%" style={{ stopColor: "#ff8c00", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#ff0080", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          {[...Array(25)].map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 100 + "%"}
              y1="0%"
              x2={Math.random() * 100 + "%"}
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
          ))}
        </svg>
      </motion.div>

      {/* Signup Container with Proper 50-50 Alignment */}
      <motion.div
        className="relative z-10 bg-gray-900/90 p-10 rounded-2xl shadow-2xl flex w-[85%] max-w-5xl items-center space-x-12"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Left: Signup 3D Image (50%) */}
        <motion.div 
          className="w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={signup}
            alt="Signup 3D"
            className="w-[80%] object-contain rounded-lg drop-shadow-2xl"
          />
        </motion.div>

        {/* Right: Clerk Signup Component (50%) */}
        <motion.div
          className="w-1/2 bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <SignUp 
            appearance={{
              elements: {
                footer: "hidden",
                headerSubtitle: "hidden",
                card: "shadow-2xl rounded-xl border border-gray-300 bg-gray-100",
              },
              layout: {
                logoPlacement: "none",
              },
            }} 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Signup;
