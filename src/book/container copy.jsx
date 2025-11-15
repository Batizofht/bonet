"use client"
import React, { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import HotelCard from "./hotelcard";
import HotelMore from "./hotelmore";
import ApartmentCard from "./apartments/apartmentcard";
import ApartmentMore from "./apartments/apartmentmore";
import TransportCard from "./transport/transportcard";
import TransportMore from "./transport/transportmore";
import TourTypeSelector from "../tour/tourcard";
import TourMore from "../tour/TourMore";
import { usePathname } from "next/navigation";

const ContainerWithButtons = () => {
  const { t } = useTranslation();
  const [activeComponent, setActiveComponent] = useState("hotel");
  const [bookedHotel, setBookedHotel] = useState(null);
  const [bookedApartment, setBookedApartment] = useState(null);
  const [bookedTransport, setBookedTransport] = useState(null);
  const [tourData, setTourData] = useState(null);
  const [showDetailsMobile, setShowDetailsMobile] = useState(false);
const location = usePathname();


useEffect(() => {
  // Use window.location.hash instead
  const hash = window.location.hash;
  if (hash === "#tourism") {
    setActiveComponent("tourism");
    setTimeout(() => {
      const elem = document.getElementById("tourism");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }
}, [location]); // You can still keep pathname as a dependency if needed

  const handleClick = (component) => {
    setActiveComponent(component);
    setBookedHotel(null);
    setBookedApartment(null);
    setBookedTransport(null);
    setTourData(null);
    setShowDetailsMobile(false);
  };

  const bookHotel = (hotel) => {
    setBookedHotel(hotel);
    if (window.innerWidth < 768) setShowDetailsMobile(true);
  };

  const bookApartment = (apartment) => {
    setBookedApartment(apartment);
    if (window.innerWidth < 768) setShowDetailsMobile(true);
  };

  const bookTransport = (transport) => {
    setBookedTransport(transport);
    if (window.innerWidth < 768) setShowDetailsMobile(true);
  };

  const handleTourSubmit = (data) => {
    setTourData(data);
  };

  const goBackFromMobileDetail = () => {
    setShowDetailsMobile(false);
  };

  // Menu config with translation keys
  const menuItems = [
    { key: "hotel", label: t("travelHospitality.page.services.hotelReservations.title") },
    { key: "apartments", label: t("travelHospitality.selectService.options.apartment") },
    { key: "transport", label: t("travelHospitality.selectService.options.transport") },
    { key: "tourism", label: t("travelHospitality.page.services.tourismGuides.title") },
  ];

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Left section */}
      {!showDetailsMobile && (
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
          {/* Buttons */}
          <div className="mb-4 flex flex-wrap gap-3">
            {menuItems.map((item) => (
              <button
                key={item.key}
                style={{ borderRadius: "10px" }}
                className={`px-4 py-2 text-sm font-bold transition-all ${
                  activeComponent === item.key
                    ? "bg-[#188bff] text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => handleClick(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>

       

          {/* Cards */}
          <div className="space-y-6">
            {activeComponent === "hotel" && <HotelCard bookHotel={bookHotel} />}
            {activeComponent === "apartments" && <ApartmentCard bookApartment={bookApartment} />}
            {activeComponent === "transport" && <TransportCard bookTransport={bookTransport} />}
            {activeComponent === "tourism" && <TourTypeSelector onTourSubmit={handleTourSubmit} />}
          </div>
        </div>
      )}

      {/* Right section */}
      {/* {(bookedHotel || bookedApartment || bookedTransport || tourData) && (
        <div className="flex-1 p-4 bg-white">
          {activeComponent === "hotel" && bookedHotel && (
            <HotelMore bookedHotel={bookedHotel} goBack={goBackFromMobileDetail} />
          )}
          {activeComponent === "apartments" && bookedApartment && (
            <ApartmentMore bookedApartment={bookedApartment} goBack={goBackFromMobileDetail} />
          )}
          {activeComponent === "transport" && bookedTransport && (
            <TransportMore bookedTransport={bookedTransport} goBack={goBackFromMobileDetail} />
          )}
          <div id="tourism">
           {activeComponent === "tourism" && tourData && (
           <TourMore tourData={tourData} goBack={() => setTourData(null)} />
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ContainerWithButtons;
