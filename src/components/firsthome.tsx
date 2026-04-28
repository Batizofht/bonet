"use client"
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useRouter } from "next/navigation";
import BookingCards from "./CardHome";
import { X, MapPin, Clock, Users, Globe, Award, ArrowRight, Sparkle } from "lucide-react";

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

  // Trust bar data - memoized
  const trustStats = useMemo(() => [
    { icon: Award, value: "5+", label: "Years Experience" },
    { icon: Users, value: "100+", label: "Foreign Clients" },
    { icon: Globe, value: "15+", label: "Countries" },
    { icon: Clock, value: "24/7", label: "WhatsApp Support" },
  ], []);

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
      className="relative w-full min-h-[600px] md:min-h-screen bg-gray-900 bg-cover bg-center overflow-hidden py-8 md:py-12"
      style={{ backgroundImage: imageLoaded ? "url('/image/1.jpg')" : "none" }}
    >
      {/* Blackish Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Content Overlay */}
      <div className="relative flex flex-col justify-center items-center text-center px-4 z-20 py-8 md:py-0 min-h-full">
        
        {/* Kicker Label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
          <Award className="w-4 h-4 text-[#C9A84C]" />
          <span className="text-white/90 text-sm font-medium tracking-wide uppercase">Rwanda Investment Experts</span>
        </div>

        {/* Main Heading with better typography */}
        <h1 className="font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight max-w-5xl mb-6">
          Invest in Rwanda
          <span className="block text-[#C9A84C] mt-2">With Confidence</span>
        </h1>

        {/* Value proposition with better visual treatment */}
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-4 leading-relaxed">
          Zero minimum capital. 6-hour company registration. 0% corporate tax for qualifying investments.
        </p>

        <p className="text-gray-400 text-base md:text-lg max-w-xl mb-10">
          Full-service support from legal setup to daily operations.
        </p>

        {/* Refined CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            className="group relative bg-[#C9A84C] text-white px-8 md:px-10 py-4 rounded-lg font-semibold text-base md:text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#C9A84C]/20"
            onClick={() => router.push("/contact")}
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button
            className="group px-8 md:px-10 py-4 rounded-lg font-semibold text-base md:text-lg text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            onClick={() => router.push("/services")}
          >
            Explore Services
          </button>
        </div>

        {/* Trust Bar - Card Style */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4 max-w-4xl mx-auto px-2">
          {trustStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 md:px-5 md:py-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#C9A84C]/20 flex items-center justify-center">
                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-[#C9A84C]" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-base md:text-lg leading-none">{stat.value}</div>
                <div className="text-gray-400 text-[10px] md:text-xs whitespace-nowrap">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Cards */}
        <div className="mt-6 md:mt-8 w-full max-w-6xl mx-auto">
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
            className="absolute bottom-4 left-4 right-4 md:bottom-5 md:right-5 md:left-auto p-3 md:p-4 bg-white/95 rounded-xl md:rounded-2xl shadow-2xl border border-gray-200 md:w-80 z-30"
          >
            {/* Close Button */}
            <button
              onClick={() => setAdVisible(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors z-40"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-500">Sponsored</span>
            </div>

            {/* Image */}
            <div className="relative w-full h-40 overflow-hidden rounded-xl mb-3">
              <img
                src={`https://api.bonet.rw:8443/bonetBackend/backend/public/${ad.image}`}
                alt={ad.adv_title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 bg-[#C9A84C] text-white px-2 py-1 rounded-lg text-xs font-semibold">
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
              <button className="w-full bg-[#C9A84C] text-white py-2 rounded-lg hover:bg-[#B8973B] transition-colors font-semibold text-sm mt-2">
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