import React, { useState } from 'react';
import SmallFormApartments from './userdetails';
import { FaArrowLeft } from "react-icons/fa";

const ApartmentMore = ({ bookedApartment, goBack }) => {
  const [showNextComponent, setShowNextComponent] = useState(false);

  const handleContinueClick = () => {
    setShowNextComponent(true);
  };

  if (!bookedApartment) {
    return (
      <div className="text-center p-4 bg-white border border-gray-700 rounded-lg shadow-lg">
        <p className="text-gray-600">No apartment booked yet.</p>
      </div>
    );
  }

  if (showNextComponent) {
    return (
      <div className="flex justify-center items-center h-full mt-5 md:mt-20 flex-col">
        {/* <p className="mb-4 text-gray-700 font-bold">Please fill out this form to continue your booking process</p> */}
        <SmallFormApartments />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white border border-gray-700 rounded-lg shadow-lg p-6 relative max-w-md mx-auto">
      {/* Back button on mobile only */}
      {goBack && (
        <button
          className="absolute top-2 left-2  sm:hidden bg-gray-100 rounded-full p-2 shadow-md"
          onClick={goBack}
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
      )}

      <h2 className="text-transparent mt-3 bg-clip-text bg-[#188bff] font-bold text-2xl mb-4 text-center">
        Booked Apartment Details
      </h2>

      <div className="flex flex-col sm:flex-row items-center mb-4 w-full">
        {/* Apartment Image */}
        <img
          src={bookedApartment.image}
          alt={bookedApartment.name}
          className="w-[150px] h-[150px] object-cover rounded-lg mx-auto sm:mx-0 sm:w-[180px] sm:h-[180px] mb-4 sm:mb-0"
        />

        {/* Apartment Info */}
        <div className="sm:ml-6 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-gray-800">{bookedApartment.name}</h3>
          <p className="text-sm text-gray-600">{bookedApartment.description}</p>
          <p className="text-sm text-gray-700 font-bold mt-2">{bookedApartment.priceRange}</p>
          <p className="text-sm text-gray-700">{bookedApartment.address}</p>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-4 w-full flex justify-center">
        <button
          onClick={handleContinueClick}
          className="bg-[#188bff] text-white font-bold px-6 py-2 rounded-lg text-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ApartmentMore;
