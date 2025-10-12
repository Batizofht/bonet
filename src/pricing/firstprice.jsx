import React from "react";
import { motion } from "framer-motion";

const FirstPrice = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-image.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h1 
          className="text-4xl sm:text-4xl lg:text-4xl font-bold bg-[#188bff] bg-clip-text text-transparent inline-block"
          initial={{ opacity: 0, y: -50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          AI-Powered Scheduling & Booking
        </motion.h1>
        {/* Subtitle */}
        <motion.p 
          className="text-lg text-gray-200 mt-4 max-w-2xl"
          initial={{ opacity: 0, y: -50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover flexible pricing plans tailored for your business growth with smart automation and analytics.
        </motion.p>
      </div>
    </div>
  );
};

export default FirstPrice;
