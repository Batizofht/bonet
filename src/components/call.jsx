import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-gray-700 mt-10 text-3xl font-bold text-center sm:text-4xl">
        Call<span className="bg-[#188bff] bg-clip-text text-transparent"> To Action</span>
      </h1>
      <div className="bg-white border-b border-gray-200 mb-10 flex justify-center items-center p-6 sm:p-12">
        <div className="bg-white shadow-2xl rounded-2xl flex flex-col sm:flex-row w-full max-w-5xl p-6 sm:p-12 relative shadow-lg shadow-gray-400">
          
          {/* Left Side */}
          <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold bg-[#188bff] bg-clip-text text-transparent">
              Call to Action Example
            </h2>
            <p className="text-gray-600 mt-2 max-w-lg sm:max-w-130 mx-auto sm:mx-0">
              Luxury, convenience, and excellence—all in one place! Book with Bonet Elite service today and let us handle the details while you enjoy a stress-free experience. Your comfort is just a click away!
            </p>
            <button onClick={() => navigate("/map")} 
            className="mt-4 px-6 w-40 py-3 text-white font-semibold rounded-lg bg-[#188bff] hover:opacity-90">
              Get Started
            </button>
          </div>

          {/* Right Side - Special Offer */}
          <div className="relative flex justify-center items-center mt-6 sm:mt-0 sm:ml-6">
            <div className="relative bg-white shadow-lg rounded-lg p-6 w-64 border border-gray-200 before:absolute before:inset-0 before:m-[-2px] before:bg-gradient-to-r before:from-[#57007B] before:to-[#F76680] before:rounded-lg before:-z-10 animate-borderMove">
              <h3 className="text-lg font-semibold bg-[#188bff] bg-clip-text text-transparent">
                New Feature
              </h3>
              {/* New Feature: Map Guidance */}
              <div className="mt-4 p-3 bg-gray-100 rounded-lg shadow-inner">
                <h4 className="text-md font-semibold bg-[#188bff] bg-clip-text text-transparent">
                  Hotel Navigation
                </h4>
                <p className="text-sm text-gray-600">
                  Booked a hotel through us? Use our map feature to get guided directly from the airport to your hotel!
                </p>
                <button 
                  onClick={() => navigate("/map")} 
                  className="mt-2 px-4 py-2 text-white font-semibold rounded-lg bg-[#188bff] hover:opacity-90"
                >
                  Open Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
