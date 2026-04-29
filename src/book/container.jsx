"use client";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { FaHotel, FaHome, FaCar, FaUmbrellaBeach } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

// Lazy load components
const HotelCard = lazy(() => import("./hotelcard"));
const ApartmentCard = lazy(() => import("./apartments/apartmentcard"));
const TransportCard = lazy(() => import("./transport/transportcard"));
const TourTypeSelector = lazy(() => import("../tour/tourcard"));

const ContainerWithButtons = () => {
  const { t } = useTranslation();
  const [activeComponent, setActiveComponent] = useState("hotel");
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
  };

  const menuItems = [
    { key: "hotel", label: t("travelHospitality.page.services.hotelReservations.title"), icon: FaHotel },
    { key: "apartments", label: t("travelHospitality.selectService.options.apartment"), icon: FaHome },
    { key: "transport", label: t("travelHospitality.selectService.options.transport"), icon: FaCar },
    { key: "tourism", label: t("travelHospitality.page.services.tourismGuides.title"), icon: FaUmbrellaBeach },
  ];


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            Reservations
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Book <span className="text-[#C9A84C]">Now</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Hotels, apartments, transport, and tours — reserve your Rwanda experience
          </p>
        </div>
          
          

        {/* Tabs */}
        <div className="mb-8 bg-white rounded-2xl p-2 border border-gray-200/30">
          <div className="flex flex-wrap gap-2 justify-center">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeComponent === item.key;
              
              return (
                <button
                  key={item.key}
                  onClick={() => handleClick(item.key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200
                    ${isActive 
                      ? 'text-white bg-[#C9A84C]' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="rounded-2xl py-6">
          <div className="space-y-6">
            <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
              {activeComponent === "hotel" && <HotelCard bookHotel={() => {}} />}
              {activeComponent === "apartments" && <ApartmentCard bookApartment={() => {}} />}
              {activeComponent === "transport" && <TransportCard bookTransport={() => {}} />}
              {activeComponent === "tourism" && <TourTypeSelector onTourSubmit={() => {}} />}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerWithButtons;