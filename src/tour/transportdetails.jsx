import React, { useState } from 'react';
import LastTransport from './lasttransport';

const TransportDetails = ({ selectedHotel, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate, setOpen, checked1, setChecked1, checked2, setChecked2 }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls the dropdown visibility
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
    // You can replace the following with the actual next component you want to display
    return (
      <div className="flex justify-center items-center h-full mt-5 flex-col">
      {/* <p className="mb-4 text-gray-700 font-bold">Please fill out this form to continue your booking process</p> */}
      <LastTransport/>
      </div>

    );
  }

  return (
      <div className="justify-center items-center md:grid-cols-2 gap-6 ">  
        <div className="space-y-6 md:space-y-6 md:mb-10">
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-1xl font-semibold bg-clip-text text-transparent bg-[#188bff] mb-3">No payment details required</h2>
            <p className="text-gray-700" style={{ fontSize: '14px' }}>
              Your payment will be handled by {selectedHotel || "No hotel selected"} so you don’t need to enter any payment details for this booking.
            </p>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <label className="flex items-start space-x-3 mb-2">
              <input type="checkbox" className="w-5 h-5 text-blue-600" onChange={() => setChecked1(!checked1)} />
              <span className="text-gray-700" style={{ fontSize: '14px' }}>
                I consent to receiving marketing emails from Bonnet Elite Service, including promotions, personalized recommendations, rewards, travel experiences, and updates about Bonnet Elite Service’s products and services.
              </span>
            </label>
            <label className="flex items-start space-x-3 mb-8">
              <input type="checkbox" className="w-5 h-5 text-blue-600" onChange={() => setChecked2(!checked2)} />
              <span className="text-gray-700" style={{ fontSize: '14px' }}>
                I consent to receiving marketing emails from Bonnet Elite Service, including promotions, personalized recommendations, rewards, travel experiences, and updates about Bonnet Elite Service Transport Limited’s products and services.
              </span>
            </label>

            {/* Notice */}
            <p className="text-gray-700 text-sm mb-4">
              Your booking is directly with the hotel: {selectedHotel || "No hotel selected"}, and by completing this booking, you agree to the booking conditions, general terms, and privacy policy.
            </p>

            {/* Buttons */}
            <div className="flex space-x-4">
  <button
    style={{ fontSize: '13px', width: '20pc', height: '3pc' }}
    className="hover:bg-[#188bff] hover:text-white  px-4 py-2 font-bold border border-gray-300 rounded text-gray-500 bg-gray-200">
    <span>Check booking</span>
  </button>

  <button
    onClick={handleContinueClick}
    style={{ fontSize: '13px', width: '20pc', height: '3pc' }}
    className="hover:bg-[#188bff] hover:text-white  px-4 py-2 font-bold border border-gray-300 rounded text-gray-500 bg-gray-200">
    <span>Complete booking</span>
  </button>
</div>

            {/* </div> */}
          </div>
        </div>
      </div>

  );
};

export default TransportDetails;
