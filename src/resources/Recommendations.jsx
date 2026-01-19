import React from "react";

const Recommendation = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto p-6 md:p-12 gap-8">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src="../assets/images/bot.jpeg" 
          alt="Personalized Recommendations" 
          className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
        />
      </div>
      
      {/* Right Side - Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h2 style={{fontSize:'25px'}}className="font-bold bg-[#188bff] bg-clip-text text-transparent">
          Personalized Recommendations: Enhancing User Experience
        </h2>
        <p style={{fontSize:'17px'}}className=" md:text-xl text-gray-700 mt-4 leading-relaxed">
          Learn how smart recommendations provide a tailored user experience across platforms. 
          By leveraging data insights, we personalize content, product suggestions, and services for each user. 
          Advanced systems analyze user behavior to deliver highly relevant recommendations in real-time. 
          Businesses use personalization to enhance customer engagement, improving satisfaction and conversion rates. 
          Our systems adapt dynamically, refining suggestions based on evolving preferences. 
          From e-commerce to entertainment, personalized recommendations revolutionize digital experiences. 
          The future of personalization lies in smart solutions that anticipate user needs and enhance interactions.
        </p>
      </div>
    </div>
  );
};

export default Recommendation;
