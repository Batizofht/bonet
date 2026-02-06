
'use client'
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FirstDocument = () => {
  // For window.innerHeight - handle SSR
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <div className="text-center">
        <motion.h1
          className="text-4xl sm:text-4xl lg:text-4xl font-bold bg-[#188bff] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Business Insights & Reports
        </motion.h1>
        <motion.p
          className="text-gray-200 mt-4 text-lg max-w-2xl"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Gain valuable insights and data-driven reports to enhance your business decisions. Our document assistance ensures efficiency and accuracy in managing essential information.
        </motion.p>
      </div>
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

export default FirstDocument;
