"use client"
import React from "react";

const SecondService = () => {
  return (
    <div className="relative w-full h-[20vh] sm:h-[30vh] bg-gray-900 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/image/7.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/90" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
        <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-[0.15em]">About Us</p>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">About Bonet</h1>
      </div>
    </div>
  );
};
export default SecondService;
