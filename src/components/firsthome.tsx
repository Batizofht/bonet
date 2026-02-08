"use client"
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useRouter } from "next/navigation";
import BookingCards from "./CardHome";
import { X, Star, MapPin, Sparkles } from "lucide-react";

interface Advertisement {
  id: number;
  time: string;
  image: string;
  adv_title: string;
  subtitle: string;
}

const FirstHome = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // Memoize translation to prevent re-renders
  const displayText = useMemo(() => t("welcome_message"), [t]);
  
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [adVisible, setAdVisible] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = '/image/1.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  // OPTIMIZED: Fetch ads only once on mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchAds = async () => {
      try {
        const res = await axios.get(
          "https://api.bonet.rw:8443/bonetBackend/backend/public/advertisements"
        );
        if (isMounted) {
          const validAds = res.data.filter((ad: any) => Number(ad.time) > 0);
          setAds(validAds);
        }
      } catch (error) {
        // Silent fail - don't break render
      }
    };

    // Delay ad fetch until after initial render and user interaction
    const timer = setTimeout(fetchAds, 3000);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Show first ad after delay
  useEffect(() => {
    if (ads.length === 0) return;
    const timer = setTimeout(() => setShowAd(true), 3000);
    return () => clearTimeout(timer);
  }, [ads]);

  // Rotate ads
  useEffect(() => {
    if (!showAd || ads.length <= 1) return;
    const currentAd = ads[currentIndex];
    const delay = (Number(currentAd.time) || 8) * 1000;

    const rotateTimer = setTimeout(() => {
      setShowAd(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
        setShowAd(true);
      }, 500);
    }, delay);

    return () => clearTimeout(rotateTimer);
  }, [showAd, ads, currentIndex]);

  const ad = ads[currentIndex];

  return (
    <div
      className="relative w-full h-[860px] md:h-[800px] bg-gray-900 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: imageLoaded ? "url('/image/1.jpg')" : "none" }}
    >
      {/* Blackish Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />


      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20">
        
        {/* Sparkle Icon */}
        {/* <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-6"

        {/* Main Heading - Original Color */}
        <h1 className="font-Poppins font-bold text-[#188bff] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-full mb-3 md:mt-[-5%] drop-shadow-2xl">
          {displayText}
        </h1>

        {/* Subtitle */}
        <p className="font-Inder italic text-gray-200 text-lg sm:text-xl md:text-2xl max-w-full mb-3">
          {t("subtitle")}
        </p>

        {/* Description */}
        <p className="font-Inder text-gray-300 text-base sm:text-lg max-w-md mb-6">
          {t("description")}
        </p>

        {/* CTA Button */}
        <button
          className="bg-[#188bff] text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl mb-3 hover:bg-blue-600 transition-all duration-300"
          onClick={() => router.push("/services")}
        >
          {t("get_started")}
        </button>
        
        {/* Booking Cards */}
        <div>
          <BookingCards />
        </div>
      </div>

      {/* Advertisement */}
      <AnimatePresence>
        {showAd && ad && adVisible && (
          <motion.div
            key={ad.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-5 right-5 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-200 w-80 z-30"
          >
            {/* Close Button */}
            <button
              onClick={() => setAdVisible(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors z-40"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Header with Stars */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-gray-500">Sponsored</span>
            </div>

            {/* Image */}
            <div className="relative w-full h-40 overflow-hidden rounded-xl mb-3">
              <img
                src={`https://api.bonet.rw:8443/bonetBackend/backend/public/${ad.image}`}
                alt={ad.adv_title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 bg-[#188bff] text-white px-2 py-1 rounded-lg text-xs font-semibold">
                Featured
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-800 font-sans">
                {ad.adv_title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {ad.subtitle}
              </p>
              
              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>Kigali, Rwanda</span>
              </div>

              {/* Action Button */}
              <button className="w-full bg-[#188bff] text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-sm mt-2">
                Learn More
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FirstHome;