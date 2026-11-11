"use client";
import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Hotel, House, Car, Palmtree } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { usePathname } from "next/navigation";
import PageLoader from "@/components/PageLoader";

// Lazy load components
const HotelCard = lazy(() => import("./hotelcard"));
const ApartmentCard = lazy(() => import("./apartments/apartmentcard"));
const TransportCard = lazy(() => import("./transport/transportcard"));
const TourTypeSelector = lazy(() => import("../tour/tourcard"));

const ContainerWithButtons = () => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
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
    { key: "hotel", label: t("travelHospitality.page.services.hotelReservations.title"), icon: Hotel },
    { key: "apartments", label: t("travelHospitality.selectService.options.apartment"), icon: House },
    { key: "transport", label: t("travelHospitality.selectService.options.transport"), icon: Car },
    { key: "tourism", label: t("travelHospitality.page.services.tourismGuides.title"), icon: Palmtree },
  ];


  return (
    <div className="min-h-screen bg-ivory pb-16 md:pb-24">
      {/* Header */}
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <Image src="/assets/photos/kigali-skyline.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/95 via-ink-950/80 to-ink-950/40" />
        <div className="container-x pb-28 pt-14 md:pb-32 md:pt-20">
          <p className="eyebrow eyebrow-light">{L("Reservations","Réservations","预订")}</p>
          <h1 className="h-display mt-3 !text-white text-[2.1rem] sm:text-[2.6rem] md:text-[3.1rem]">{L("Book Now","Réserver maintenant","立即预订")}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/70">
            {L("Hotels, apartments, transport and tours across Rwanda, confirmed by our Kigali team.","Hôtels, appartements, transport et circuits au Rwanda, confirmés par notre équipe à Kigali.","卢旺达各地的酒店、公寓、交通和旅游，由我们的基加利团队确认。")}
          </p>
        </div>
      </section>

      <div className="container-x relative z-10 -mt-16 pb-8 md:pb-12">
        {/* Tabs */}
        <div className="relative mb-8 rounded-[10px] bg-white p-2 shadow-[0_12px_30px_rgba(7,16,29,0.12)] ring-1 ring-line">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-[#C9A84C] hover:bg-gray-50 transition-colors md:hidden"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-[#C9A84C] hover:bg-gray-50 transition-colors md:hidden"
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
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-md font-display font-semibold text-sm transition-colors duration-200 whitespace-nowrap flex-shrink-0
                    ${isActive
                      ? 'text-white bg-ink-900'
                      : 'text-ink-600 hover:text-ink-900 hover:bg-ivory'
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
          <Suspense fallback={<PageLoader compact />}>
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