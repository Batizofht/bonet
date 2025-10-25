import React, { useState } from 'react';
import SmallForm from './userdetails';
import { FaArrowLeft } from "react-icons/fa";

const HotelMore = ({ bookedHotel, goBack }) => {
  const [showNextComponent, setShowNextComponent] = useState(false);

  const handleContinueClick = () => {
    setShowNextComponent(true);
  };

  if (!bookedHotel) {
    return (
      <div className="text-center p-4 bg-white border border-gray-700 rounded-lg shadow-lg">
        <p className="text-gray-600">No hotel booked yet.</p>
      </div>
    );
  }

  if (showNextComponent) {
    return (
      <div className="flex justify-center items-center h-full mt-5 sm:mt-20 flex-col">
        <SmallForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white border border-gray-500 rounded-lg shadow-lg p-6 sm:p-8 relative">
      {/* Back button on mobile only */}
      {goBack && (
        <button
          className="absolute top-2 left-2 sm:hidden bg-gray-100 rounded-full p-2 shadow-md"
          onClick={goBack}
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
      )}

      <h2 className="text-transparent bg-clip-text bg-[#188bff] font-bold text-2xl sm:text-3xl mb-4">
        Booked Hotel Details
      </h2>

      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 mb-4">
        <img
          src={bookedHotel.image}
          alt={bookedHotel.name}
          className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] object-cover rounded-lg mb-4 sm:mb-0"
        />
        <div className="sm:ml-6 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-gray-800">
            {bookedHotel.name}
          </h3>
          <p className="text-sm text-gray-600">{bookedHotel.description}</p>
          <p className="text-sm text-gray-700 font-bold mt-2">
            {bookedHotel.priceRange}
          </p>
          <p className="text-sm text-gray-700">{bookedHotel.address}</p>
        </div>
      </div>

      <div className="mt-4 w-full flex justify-center">
        <button
          onClick={handleContinueClick}
          className="bg-[#188bff] text-white font-bold px-6 py-2 rounded text-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default HotelMore;
