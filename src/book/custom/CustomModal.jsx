import React from "react";
import AccommodationHotel from "./hotelCustom";
import { X } from "lucide-react";

const CustomModal = ({ open, onClose, title }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal content */}
<div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-modalIn">
       {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh] p-4">
          <AccommodationHotel />
          <div className="mb-[100px]">

          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
