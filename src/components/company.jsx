import React from "react";
import { motion } from "framer-motion";

const TrustedCompanies = () => {
  return (
    <motion.section
      className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-15"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Text Section */}
      <div className="text-center md:text-left">
        <div className="w-20 h-1 bg-[#188bff] mx-auto md:mx-0 mt-2 mb-5"></div>

        <h2 className="text-gray-700 text-3xl font-bold mb-6">
          Businesses trust us <br />
          <span className="font-bold bg-[#188bff] bg-clip-text text-transparent">
            to streamline operations with AI
          </span>
        </h2>
        <p className="text-gray-600 mb-4">
          Our advanced AI-powered solutions revolutionize{" "}
          <span className="bg-[#188bff] bg-clip-text text-transparent">
            booking, scheduling, and customer interactions
          </span>
          . Bonet Elite Services enhances productivity by automating operations and providing smart assistance for businesses of all sizes.
        </p>
        <a
          href="#"
          className="bg-[#188bff] bg-clip-text text-transparent font-medium flex items-center justify-center md:justify-start hover:underline"
        >
          Learn more about our AI solutions <span className="ml-2">→</span>
        </a>
      </div>

      {/* Video Section */}
      <motion.div
        className="w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-lg flex justify-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
      >
        <video autoPlay muted loop className="w-full h-auto">
          <source src="../assets/images/vd.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </motion.section>
  );
};

export default TrustedCompanies;
