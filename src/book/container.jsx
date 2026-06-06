"use client";
import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { FaHotel, FaHome, FaCar, FaUmbrellaBeach } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);
  const location = usePathname();

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    const hash = window.location.hash;
    const validTabs = ["tourism", "apartments", "transport", "hotel"];
    const validHashes = ["#tourism", "#apartments", "#transport", "#hotel"];
    
    // Check for tab parameter first
    if (tab && validTabs.includes(tab)) {
      setActiveComponent(tab);
      setTimeout(() => {
        const elem = document.getElementById(tab);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
    // Fallback to hash if no tab
    else if (validHashes.includes(hash)) {
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
    <div className="min-h-screen bg-white pb-16 md:pb-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-8 md:pt-12 pb-4">
        <div className="text-center">
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Reservations</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-wider">Book Now</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8 md:pb-12">
        {/* Tabs */}
        <div className="mb-8 bg-white rounded-xl border border-gray-200 p-2 relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-[#C9A84C] hover:bg-gray-50 transition-all md:hidden"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-[#C9A84C] hover:bg-gray-50 transition-all md:hidden"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-2 md:justify-center overflow-x-auto scrollbar-hide px-8 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeComponent === item.key;
              
              return (
                <button
                  key={item.key}
                  onClick={() => handleClick(item.key)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 whitespace-nowrap flex-shrink-0
                    ${isActive 
                      ? 'text-white bg-[#C9A84C]' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
            {activeComponent === "hotel" && <HotelCard bookHotel={() => {}} />}
            {activeComponent === "apartments" && <ApartmentCard bookApartment={() => {}} />}
            {activeComponent === "transport" && <TransportCard bookTransport={() => {}} />}
            {activeComponent === "tourism" && <TourTypeSelector onTourSubmit={() => {}} />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ContainerWithButtons;