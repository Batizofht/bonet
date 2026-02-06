'use client'
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FirstResource = () => {
  // For window.innerHeight - handle SSR
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center text-center p-6 overflow-hidden"
    >
      <h1 className="text-4xl md:text-6xl font-bold bg-[#188bff] bg-clip-text text-transparent">
        Smart Resources
      </h1>
      <p className="text-lg md:text-xl text-white mt-4 max-w-3xl">
        Unlock smart solutions that enhance customer experience, 
        streamline operations, and support data-driven decision-making.
      </p>
      
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
    </motion.div>
  );
};

export default FirstResource;