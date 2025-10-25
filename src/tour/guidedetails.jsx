import React, { useState } from 'react';
import LastGuide from './lastguide';

const GuideDetails = ({
  selectedHotel,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  setOpen,
  checked1,
  setChecked1,
  checked2,
  setChecked2,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [showNextComponent, setShowNextComponent] = useState(false);

  const handleIncrement = (setter, currentValue) => setter(currentValue + 1);
  const handleDecrement = (setter, currentValue) => {
    if (currentValue > 0) setter(currentValue - 1);
  };

  const handleContinueClick = () => {
    setShowNextComponent(true);
  };

  if (showNextComponent) {
    return (
      <div className="flex justify-center items-center h-full flex-col">
        <LastGuide />
      </div>
    );
  }

  return (
    <div className=" md:grid-cols-2 gap-6 items-start justify-center px-4">
      <div className="space-y-6" />

      <div className="space-y-6">
        {/* Info Card */}
        <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-[#188bff] mb-2">
            No payment details required
          </h2>
          <p className="text-gray-700 text-sm">
            Your payment will be handled by {selectedHotel || 'No hotel selected'} so you don’t need to enter any
            payment details for this booking.
          </p>
        </div>

        {/* Consent Card */}
        <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
          <label className="flex items-start space-x-3 mb-3">
            <input type="checkbox" className="w-5 h-5 text-blue-600" onChange={() => setChecked1(!checked1)} />
            <span className="text-gray-700 text-sm">
              I consent to receiving marketing emails from Bonnet Elite Service, including promotions, personalized
              recommendations, rewards, travel experiences, and updates about Bonnet Elite Service’s products and
              services.
            </span>
          </label>

          <label className="flex items-start space-x-3 mb-4">
            <input type="checkbox" className="w-5 h-5 text-blue-600" onChange={() => setChecked2(!checked2)} />
            <span className="text-gray-700 text-sm">
              I consent to receiving marketing emails from Bonnet Elite Service, including promotions, personalized
              recommendations, rewards, travel experiences, and updates about Bonnet Elite Service Transport Limited’s
              products and services.
            </span>
          </label>

          <p className="text-gray-700 text-sm mb-4">
            Your booking is directly with the hotel: {selectedHotel || 'No hotel selected'}, and by completing this
            booking, you agree to the booking conditions, general terms, and privacy policy.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <button
              style={{ fontSize: '13px', height: '3pc' }}
              className="w-full sm:w-[20pc] hover:bg-[#188bff] hover:text-white text-gray-700 px-4 py-2 font-bold border border-gray-300 rounded bg-gray-200"
            >
              Check booking
            </button>

            <button
              onClick={handleContinueClick}
              style={{ fontSize: '13px', height: '3pc' }}
              className="w-full sm:w-[20pc] hover:bg-[#188bff] hover:text-white text-gray-700 px-4 py-2 font-bold border border-gray-300 rounded bg-gray-200"
            >
              Complete booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
