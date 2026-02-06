"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FirstTravelTips = () => {
  // For window.innerHeight - handle SSR
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <div className="relative w-full h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/travel-bg.jpg')" }}>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8"
      >
        {/* Title */}
        <h1 className="text-4xl lg:text-4xl xl:text-4xl font-bold bg-[#188bff] bg-clip-text text-transparent inline-block">
          Travel Tips for First-Time Visitors
        </h1>
        {/* Subtitle */}
        <p className="text-lg text-gray-200 mt-4 max-w-2xl">
          Discover essential travel tips to make your first visit smooth and enjoyable. From cultural etiquette to must-know safety tips, be prepared for an amazing experience.
        </p>
      </motion.div>
      
      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, y: 100, rotate: 0, opacity: 0 }}
            animate={{ scale: 1.3, y: -windowHeight, rotate: 360, opacity: 1 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
            className="absolute w-8 h-8 border-2 border-transparent rounded-full"
            style={{
              borderImage: "linear-gradient(to right, #57007B, #F76680) 1",
              top: "100%",
              left: `${(index % 10) * 10 + 5}%`,
              background: "transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FirstTravelTips;
