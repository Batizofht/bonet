import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const BookingOverlay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Controls if the overlay is visible

  const navigate = useRouter(); // Initialize the navigate hook

  const titles = [
    "Saving your info",
    "Sending verification"
  ];

  const subtitles = [
    "We are saving all info you provided in previous steps for your booking process.",
    "We sent you a verification message on the email provided. Once checked, your booking details will be submitted to the hotel immediately."
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
    setIsOpen(false); // Close the overlay when the close button is clicked
    navigate('/'); // Navigate to the "book-now" route
  };

  const handleContinue = () => {
    setIsOpen(false); // Close the overlay when the continue button is clicked
    navigate('/'); // Navigate to the "book-now" route
  };

  if (!isOpen) return null; // Don't render the overlay if it's closed

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-blue-400 hover:text-blue-600"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center bg-clip-text text-transparent bg-[#188bff] mb-4">
          {isSuccess ? 'Success' : titles[currentIndex]}
        </h2>
        <p className="text-gray-700 text-sm text-center mb-4">
          {isSuccess
            ? 'Your information has been submitted successfully. Please check your email for the SMS confirmation to complete the booking.'
            : subtitles[currentIndex]}
        </p>

        {!isSuccess && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 w-8 h-8"></div>
          </div>
        )}

        {isSuccess && (
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaCheckCircle size={24} />
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="bg-[#188bff] text-white font-bold px-6 py-2 rounded mt-4"
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
