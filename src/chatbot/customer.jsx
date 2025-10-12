const Customer = () => {
    return (
      <div className="flex items-center bg-blue-100 p-6 rounded-2xl shadow-lg">
        {/* Left Side: Image */}
        <div className="w-1/2 pr-6">
          <img
            src="../assets/images/chat5.png"
            alt="AI Chatbot"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
        
        {/* Right Side: Content */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent">
            AI-Powered Chatbot for Customer Support
          </h2>
          <p className="text-lg text-gray-700 mt-2">
            Transform your business with our cutting-edge AI chatbot! Designed to
            streamline customer interactions, this chatbot efficiently handles
            inquiries, guides users through booking processes, and assists with
            business registrations. With its intelligent response system, it
            reduces customer wait times by an impressive 60%, ensuring a seamless
            and satisfying user experience.
          </p>
          <button className="mt-4 px-6 py-2 bg-[#57007B] text-white rounded-lg shadow-md hover:bg-[#F76680] transition">
            Open Chatbot
          </button>
        </div>
      </div>
    );
  };
  
  export default Customer;