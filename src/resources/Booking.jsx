import React from "react";

const System = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto p-6 md:p-12 gap-8">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src="../assets/images/data.jpeg" 
          alt="AI-Powered Booking System" 
          className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
        />
      </div>
      
      {/* Right Side - Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h2 style={{fontSize:'25px'}} className="font-bold bg-[#188bff] bg-clip-text text-transparent">
          Building an AI-Powered Booking System for Hotels and Tours
        </h2>
        <p style={{fontSize:'17px'}}className="md:text-xl text-gray-700 mt-4 leading-relaxed">
          Discover how AI optimizes hotel and tour bookings with predictive analytics and automation. 
          By analyzing customer preferences and booking patterns, AI enhances the efficiency of reservation systems. 
          Automated systems reduce human errors, ensuring seamless user experiences. 
          AI-driven recommendations personalize travel options, making trip planning more convenient. 
          Real-time availability updates improve resource management for hotels and tour operators. 
          Intelligent automation minimizes booking conflicts and maximizes occupancy rates. 
          The future of travel lies in AI-powered systems that streamline booking processes for businesses and travelers alike.
        </p>
      </div>
    </div>
  );
};

export default System;
