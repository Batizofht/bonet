const Booking = () => {
    return (
      <div className="flex items-center bg-green-100 p-6 rounded-2xl shadow-lg">
        {/* Left Side: Image */}
        <div className="w-1/2 pr-6">
          <img
            src="../assets/images/chat3.jpeg"
            alt="AI Booking System"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
        
        {/* Right Side: Content */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent">
            AI-Driven Booking System for Hotels & Transport
          </h2>
          <p className="text-lg text-gray-700 mt-2">
            Experience seamless travel planning with our AI-powered booking system! Designed for
            hotels, transport, and tours, it automates reservations, provides dynamic pricing, and
            delivers personalized recommendations. By leveraging real-time data and machine learning,
            it optimizes availability, ensuring efficient and hassle-free bookings for users.
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li><strong>Hotel Booking:</strong> Instantly reserve accommodations at top-rated hotels.</li>
            <li><strong>Airport Transfers:</strong> Schedule smooth and timely rides from and to the airport.</li>
            <li><strong>Car Rentals:</strong> Choose from a range of vehicles for your travel convenience.</li>
            <li><strong>Guided Tours:</strong> Book personalized sightseeing experiences with expert guides.</li>
          </ul>
          <button className="mt-4 px-6 py-2 bg-[#57007B] text-white rounded-lg shadow-md hover:bg-[#F76680] transition">
             {t("menu.bookNow")}
          </button>
        </div>
      </div>
    );
  };
  
  export default Booking;
