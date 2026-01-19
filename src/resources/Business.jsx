import React from "react";

const Business = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto p-6 md:p-12 gap-8">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src="../assets/images/chat.jpeg" 
          alt="Business Insights" 
          className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
        />
      </div>
      
      {/* Right Side - Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h2 style={{fontSize:'25px'}}className="font-bold bg-[#188bff] bg-clip-text text-transparent">
          Business Insights: Making Data-Backed Decisions
        </h2>
        <p style={{fontSize:'17px'}}className="md:text-xl text-gray-700 mt-4 leading-relaxed">
          Uncover how analytics empower businesses to make data-driven decisions for success. 
          We transform raw data into actionable insights, helping organizations optimize strategies. 
          With predictive analytics, companies can forecast trends and improve decision-making. 
          Smart automation enhances efficiency, reducing operational costs and increasing productivity. 
          Businesses leverage our tools to gain a competitive edge by identifying market opportunities. 
          Real-time data processing allows companies to respond quickly to changing business environments. 
          The integration of analytics paves the way for smarter, more informed business growth.
        </p>
      </div>
    </div>
  );
};

export default Business;
