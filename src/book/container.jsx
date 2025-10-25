"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaHotel, FaHome, FaCar, FaUmbrellaBeach } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

// Your existing imports...
import HotelCard from "./hotelcard";
import HotelMore from "./hotelmore";
import ApartmentCard from "./apartments/apartmentcard";
import ApartmentMore from "./apartments/apartmentmore";
import TransportCard from "./transport/transportcard";
import TransportMore from "./transport/transportmore";
import TourTypeSelector from "../tour/tourcard";
import TourMore from "../tour/TourMore";
import { Search } from "lucide-react";

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
  const hash = window.location.hash;
  const validHashes = ["#tourism", "#apartments", "#transport", "#hotel"];
  
  if (validHashes.includes(hash)) {
    const componentId = hash.replace("#", "");
    setActiveComponent(componentId);
    setTimeout(() => {
      const elem = document.getElementById(componentId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }
  
}, [location]);

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

  // Enhanced menu config with icons and colors
  const menuItems = [
    { 
      key: "hotel", 
      label: t("travelHospitality.page.services.hotelReservations.title"),
      icon: FaHotel,
      color: "#FF6B6B",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      borderColor: "border-pink-200"
    },
    { 
      key: "apartments", 
      label: t("travelHospitality.selectService.options.apartment"),
      icon: FaHome,
      color: "#4ECDC4",
      gradient: "from-teal-400 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
      borderColor: "border-teal-200"
    },
    { 
      key: "transport", 
      label: t("travelHospitality.selectService.options.transport"),
      icon: FaCar,
      color: "#45B7D1",
      gradient: "from-blue-400 to-sky-500",
      bgGradient: "from-blue-50 to-sky-50",
      borderColor: "border-blue-200"
    },
    { 
      key: "tourism", 
      label: t("travelHospitality.page.services.tourismGuides.title"),
      icon: FaUmbrellaBeach,
      color: "#96CEB4",
      gradient: "from-emerald-400 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      borderColor: "border-emerald-200"
    },
  ];

  const activeItem = menuItems.find(item => item.key === activeComponent);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Left section */}
      {!showDetailsMobile && (
        <motion.div 
          className="flex-1 p-4 sm:p-8 overflow-y-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >

              {/* Header */}
                <div className="text-center mb-16">
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
                    <Search className="w-6 h-6 text-[#188bff] animate-pulse" />
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
                    <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    {t("Book Now", "Book  Now").split(" ").map((word, i) => 
                      i === 0 ? (
                        <span key={i} className="bg-[#188bff] bg-clip-text text-transparent relative inline-block">
                          {word}
                          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#188bff] to-cyan-400 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
                          {" "}
                        </span>
                      ) : (
                        <span key={i} className="text-gray-600">{word + " "}</span>
                      )
                    )}
                  </h2>
                  <p className="text-gray-500 text-lg"> Discover amazing places to stay, transportation options, and unforgettable experiences</p>
                </div>
          
          

          {/* Cute Tabs */}
          <motion.div 
            className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeComponent === item.key;
                
                return (
                  <motion.button
                    key={item.key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleClick(item.key)}
                    className={`
                      relative flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-300
                      ${isActive 
                        ? `text-white bg-gradient-to-r ${item.gradient} shadow-lg shadow-${item.color.replace('#', '')}/25` 
                        : `text-gray-600 bg-white hover:bg-gray-50 border-2 ${item.borderColor} hover:border-${item.color.replace('#', '')}/30`
                      }
                    `}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                    {item.label}
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Active Tab Content with Cute Header */}
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-2xl px-0 py-6 border-2 ${activeItem?.borderColor} bg-gradient-to-br ${activeItem?.bgGradient} shadow-sm`}
          >
            {/* Tab-specific cute header */}
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className={`p-3 rounded-xl bg-white shadow-sm border ${activeItem?.borderColor}`}>
               
                {activeItem?.icon && (
    <activeItem.icon className="w-6 h-6" style={{ color: activeItem.color }} />
  )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{activeItem?.label}</h2>
                <p className="text-gray-600 text-sm">
                  {activeComponent === "hotel" && "Find the perfect stay for your journey"}
                  {activeComponent === "apartments" && "Discover cozy apartments and homes"}
                  {activeComponent === "transport" && "Comfortable transportation options"}
                  {activeComponent === "tourism" && "Unforgettable tours and experiences"}
                </p>
              </div>
            </motion.div>

            {/* Cards Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComponent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 "
              >
                {activeComponent === "hotel" && <HotelCard bookHotel={bookHotel} />}
                {activeComponent === "apartments" && <ApartmentCard bookApartment={bookApartment} />}
                {activeComponent === "transport" && <TransportCard bookTransport={bookTransport} />}
                {activeComponent === "tourism" && <TourTypeSelector onTourSubmit={handleTourSubmit} />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}

      {/* Right section - Details Panel */}
      <AnimatePresence>
        {(bookedHotel || bookedApartment || bookedTransport || tourData) && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 p-4 sm:p-8 bg-white/90 backdrop-blur-sm border-l border-gray-200"
          >
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Back Button */}
      {showDetailsMobile && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={goBackFromMobileDetail}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200 font-semibold text-gray-700 z-50 md:hidden"
        >
          ← Back to List
        </motion.button>
      )}
    </div>
  );
};

export default ContainerWithButtons;