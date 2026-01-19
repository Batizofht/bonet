import React from "react";

const LevelAging = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto p-6 md:p-12 gap-8">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src="../assets/images/ai.jpeg" 
          alt="Customer Support Excellence" 
          className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
        />
      </div>
      
      {/* Right Side - Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
      <h2 style={{fontSize:'25px'}}className="font-bold bg-[#188bff] bg-clip-text text-transparent">
      Dedicated Support for Seamless Customer Experience
        </h2>
        <p style={{fontsize:'17px'}}className="text-gray-700 mt-4 leading-relaxed">
          Discover how our dedicated support team transforms customer interactions, improving efficiency and satisfaction. 
          By streamlining support processes, businesses can enhance user experience while reducing 
          workload. Our team adapts to customer needs, providing instant assistance and solutions. 
          We ensure 24/7 availability, enabling companies to handle inquiries effectively at any time. 
          Through continuous training, our agents improve responses, making interactions more personalized. 
          Businesses across industries trust our support for optimized customer service strategies. 
          The future of customer engagement lies in dedicated solutions that drive satisfaction and efficiency.
        </p>
      </div>
    </div>
  );
};

export default LevelAging;