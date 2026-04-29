import React, { useState } from 'react';
import SmallFormTransport from './userdetails';
import { FaArrowLeft } from "react-icons/fa";
import { CarOutlined } from "@ant-design/icons";

const TransportMore = ({ bookedTransport, goBack }) => {
  const [showNextComponent, setShowNextComponent] = useState(false);

  const handleContinueClick = () => {
    setShowNextComponent(true);
  };

  if (!bookedTransport) {
    return (
      <div className="text-center p-4 bg-white border border-gray-700 rounded-lg shadow-lg">
        <p className="text-gray-600">No transport booked yet.</p>
      </div>
    );
  }

  if (showNextComponent) {
    return (
      <div className="flex justify-center items-center h-full mt-5 md:mt-20 flex-col">
        <SmallFormTransport />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white border border-gray-700 rounded-lg shadow-lg p-6 relative">
      {/* Back button on mobile only */}
      {goBack && (
        <button
          className="absolute top-2 left-2 sm:hidden bg-gray-100 rounded-full p-2 shadow-md"
          onClick={goBack}
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
      )}

      <h2 className="text-[#C9A84C] font-bold text-2xl mb-4">
        Booked Transport Details
      </h2>

      {/* Transport Info */}
      <div className="flex flex-col sm:flex-row items-center mb-4 w-full">
        {/* Transport Icon */}
        <div className="text-[#C9A84C] text-[80px] mb-4 sm:mb-0 sm:mr-6">
          <CarOutlined />
        </div>

        {/* Transport Details */}
        <div className="w-full">
          <ul className="text-sm text-gray-700 text-left space-y-1">
            <p><strong className="text-[#C9A84C]">Transport Service:</strong> {bookedTransport.transportService}</p>
            <p><strong className="text-[#C9A84C]">Transport Type:</strong> {bookedTransport.transportType}</p>
            <p><strong className="text-[#C9A84C]">Vehicle:</strong> {bookedTransport.carType}</p>
            <p><strong className="text-[#C9A84C]">Seats:</strong> {bookedTransport.seats} seats</p>
            <p><strong className="text-[#C9A84C]">Pickup Location:</strong> {bookedTransport.pickupLocation}</p>
            <p><strong className="text-[#C9A84C]">Drop-off Location:</strong> {bookedTransport.dropoffLocation}</p>
            <p><strong className="text-[#C9A84C]">Pickup Date:</strong> {bookedTransport.pickupDate?.format("YYYY-MM-DD")}</p>
            <p><strong className="text-[#C9A84C]">Pickup Time:</strong> {bookedTransport.pickupTime?.format("HH:mm")}</p>
            <p><strong className="text-[#C9A84C]">Rent Time:</strong> {bookedTransport.rentTime}</p>
          </ul>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-4 w-full flex justify-center">
        <button
          onClick={handleContinueClick}
          className="bg-[#C9A84C] text-white font-bold px-6 py-2 rounded text-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TransportMore;
