
"use client"
import React from "react";
import { motion } from "framer-motion";

const FirstBot = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-image.jpg')" }}>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8"
      >
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-[#188bff] bg-clip-text text-transparent inline-block">
          24/7 Customer Support
        </h1>
        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-white mt-4 max-w-2xl">
          Experience our dedicated support team that enhances customer service by handling queries, assisting with bookings, and guiding users through business registration. Improve response time and customer satisfaction effortlessly.
        </p>
      </motion.div>
    </div>
  );
};

export default FirstBot;
