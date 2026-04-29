import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const BookingOverlay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Controls if the overlay is visible

  const navigate = useRouter(); // Initialize the navigate hook

  // Titles and subtitles adjusted for transport booking process
  const titles = [
    "Saving your transport details",
    "Sending verification"
  ];

  const subtitles = [
    "We are saving all the transport details you provided to ensure your booking is processed.",
    "We sent a verification message to your email. Please check it to confirm and finalize your transport booking."
  ];

  useEffect(() => {
    if (currentIndex < titles.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 3000); // Change title every 3 seconds
      return () => clearTimeout(timer);
    } else {
      const successTimer = setTimeout(() => {
        setIsSuccess(true); // Show success message after all titles have been shown
      }, 3000);
      return () => clearTimeout(successTimer);
    }
  }, [currentIndex]);

  const handleClose = () => {
    setIsOpen(false);
    navigate('/'); 
  };

  const handleContinue = () => {
    setIsOpen(false); 
    navigate('/');
  };

  if (!isOpen) return null; // Don't render the overlay if it's closed

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#C9A84C] mb-4">
          {isSuccess ? 'Booking Successful' : titles[currentIndex]}
        </h2>
        <p className="text-gray-700 text-sm text-center mb-4">
          {isSuccess
            ? 'Your transport booking has been confirmed. Please check your email for the confirmation details.'
            : subtitles[currentIndex]}
        </p>

        {!isSuccess && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-[#C9A84C] w-8 h-8"></div>
          </div>
        )}

        {isSuccess && (
          <div className="flex justify-center mb-4">
            <div className="bg-[#C9A84C] text-white p-2 rounded-full">
              <FaCheckCircle size={24} />
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="bg-[#C9A84C] text-white font-bold px-6 py-2 rounded mt-4"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingOverlay;
