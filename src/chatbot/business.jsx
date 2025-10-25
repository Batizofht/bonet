const Busines = () => {
    return (
      <div className="flex items-center bg-pink-100 p-6 rounded-2xl shadow-lg">
        {/* Left Side: Image */}
        <div className="w-1/2 pr-6">
          <img
            src="../assets/images/chat2.webp"
            alt="AI Business Insights"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
        
        {/* Right Side: Content */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent">
            AI-Powered Business Insights & Document Assistance
          </h2>
          <p className="text-lg text-gray-700 mt-2">
            Elevate your business with our AI-driven solution! It automates
            document assistance for business setup while providing deep insights
            into customer behavior and financial trends. By leveraging advanced
            analytics, it generates predictive reports, helping businesses make
            data-driven decisions and stay ahead in a competitive market.
          </p>
          
          <h3 className="text-xl font-semibold mt-4 text-[#57007B]">Investment & Business Setup</h3>
          <p className="text-lg text-gray-700 mt-2">
            We assist with business registration, licensing, and advisory services,
            ensuring a smooth and compliant setup process. Our team provides 
            expert guidance on investment strategies, legal requirements, and market trends
            to help you establish and grow your enterprise efficiently.
          </p>
          
          <button className="mt-4 px-6 py-2 bg-[#57007B] text-white rounded-lg shadow-md hover:bg-[#F76680] transition">
            Open Now
          </button>
        </div>
      </div>
    );
};
  
export default Busines;