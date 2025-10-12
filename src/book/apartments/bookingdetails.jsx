import React, { useState } from 'react';
import BookingOverlay from "./lastapartment";

const BookingDetailsApartment = ({ selectedHotel, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate, setOpen, checked1, setChecked1, checked2, setChecked2 }) => {
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
    return (
      <div className="flex justify-center items-center h-full mt-5 sm:-mt-2 flex-col">
      <BookingOverlay/>
      </div>

    );
  }

  return (
      <div className="justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-1xl font-semibold mb-4 bg-clip-text text-transparent bg-[#188bff]">Select Booking Dates</h2>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full text-gray-500 mb-4"
            />
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full text-gray-500"
            />
          </div>
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-1xl font-semibold mb-4 bg-clip-text text-transparent bg-[#188bff]">Booking Summary</h2>
            <p className=" text-gray-600" style={{ fontSize: '14px' }}>apartment: {selectedHotel || "No apartment selected"}</p>
            <p className=" text-gray-600" style={{ fontSize: '14px' }}>Check-in: {checkInDate || "Not selected"}</p>
            <p className=" text-gray-600" style={{ fontSize: '14px' }}>Check-out: {checkOutDate || "Not selected"}</p>
          </div>
          
          {/* FinalBook content here */}
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white mt-6">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer  items-center space-x-4 bg-[#188bff] text-white p-3 rounded-lg"
            >
              <div className="flex items-center">
                <span>Guests</span>
              </div>
              <div className="flex space-x-3">
                <div className="flex items-center space-x-1">
                  <span>Adults: {adults}</span>
                  <span>Children: {children}</span>
                  <span>Rooms: {rooms}</span>
                </div>
              </div>
            </div>

            {isOpen && (
              <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Adults</h3>
                      <div className="flex items-center space-x-4 ml-4">
                        <button onClick={() => handleDecrement(setAdults, adults)} className="text-gray-500">-</button>
                        <span>{adults}</span>
                        <button onClick={() => handleIncrement(setAdults, adults)} className="text-gray-500">+</button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Children</h3>
                      <div className="flex items-center space-x-4 ml-4">
                        <button onClick={() => handleDecrement(setChildren, children)} className="text-gray-500">-</button>
                        <span>{children}</span>
                        <button onClick={() => handleIncrement(setChildren, children)} className="text-gray-500">+</button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Rooms</h3>
                      <div className="flex items-center space-x-4 ml-4">
                        <button onClick={() => handleDecrement(setRooms, rooms)} className="text-gray-500">-</button>
                        <span>{rooms}</span>
                        <button onClick={() => handleIncrement(setRooms, rooms)} className="text-gray-500">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6 md:space-y-6 md:mt-[23pc] md:mb-10">
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-1xl font-semibold bg-clip-text text-transparent bg-[#188bff] mb-3">No payment details required</h2>
            <p className="text-gray-700" style={{ fontSize: '14px' }}>
              Your payment will be handled by {selectedHotel || "No apartment selected"} so you don’t need to enter any payment details for this booking.
            </p>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <label className="flex items-start space-x-3 mb-2">
              <input type="checkbox" className="w-5 h-5 text-blue-600" onChange={() => setChecked1(!checked1)} />
              <span className="text-gray-700" style={{ fontSize: '14px' }}>
                I consent to receiving marketing emails from bonet.rw, including promotions, personalized recommendations, rewards, travel experiences, and updates about boneteliteservice services.
              </span>
            </label>
            <label className="flex items-start space-x-3 mb-8">
              <input type="checkbox" className="w-5 h-5 text-blue-600" onChange={() => setChecked2(!checked2)} />
              <span className="text-gray-700" style={{ fontSize: '14px' }}>
                I consent to receiving marketing emails from boneteliteservice, including promotions, personalized recommendations, rewards, travel experiences, and updates about boneteliteservice Transport Limited’s  and services.
              </span>
            </label>

            {/* Notice */}
            <p className="text-gray-700 text-sm mb-4">
              Your booking is directly with the apartment: {selectedHotel || "No apartment selected"}, and by completing this booking, you agree to the booking conditions, general terms, and privacy policy.
            </p>

            {/* Buttons */}
            <div className="flex space-x-4">
  <button
    style={{ fontSize: '13px', width: '20pc', height: '3pc' }}
    className="hover:bg-[#188bff] hover:text-white text-gray-700 px-4 py-2 font-bold border border-gray-300 rounded text-gray-500 bg-gray-200">
    <span>Check booking</span>
  </button>

  <button
    onClick={handleContinueClick}
    style={{ fontSize: '13px', width: '20pc', height: '3pc' }}
    className="hover:bg-[#188bff] hover:text-white text-gray-700 px-4 py-2 font-bold border border-gray-300 rounded text-gray-500 bg-gray-200">
    <span>Complete booking</span>
  </button>
</div>

            {/* </div> */}
          </div>
        </div>
      </div>
  );
};

export default BookingDetailsApartment;
