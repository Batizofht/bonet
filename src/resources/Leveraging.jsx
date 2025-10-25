import React from "react";

const LevelAging = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto p-6 md:p-12 gap-8">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src="../assets/images/ai.jpeg" 
          alt="Leveraging AI Chatbots" 
          className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
        />
      </div>
      
      {/* Right Side - Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
      <h2 style={{fontSize:'25px'}}className="font-bold bg-[#188bff] bg-clip-text text-transparent">
      Leveraging AI Chatbots for Seamless Customer Support
        </h2>
        <p style={{fontsize:'17px'}}className="text-gray-700 mt-4 leading-relaxed">
          Explore how AI-powered chatbots transform customer interactions, improving efficiency and satisfaction. 
          By automating responses and streamlining support, businesses can enhance user experience while reducing 
          workload. These intelligent systems adapt to customer needs, providing instant assistance and solutions. 
          AI chatbots ensure 24/7 availability, enabling companies to handle inquiries effectively at any time. 
          Leveraging machine learning, they continuously improve responses, making interactions more human-like. 
          Businesses across industries are integrating AI-driven support for optimized customer service strategies. 
          The future of customer engagement lies in AI-powered solutions that drive satisfaction and efficiency.
        </p>
      </div>
    </div>
  );
};

export default LevelAging;