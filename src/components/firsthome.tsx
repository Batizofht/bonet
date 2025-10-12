import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useRouter } from "next/navigation";

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

  const fullText = t("welcome_message");
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;

  const [ads, setAds] = useState<Advertisement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAd, setShowAd] = useState(false);

  // Typing effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        } else {
          setDeleting(false);
        }
      }
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, deleting, fullText]);

  // Fetch advertisements
  useEffect(() => {
    axios
      .get(
        "https://switchiify.com/bonetProject/backend/public/advertisements"
      )
      .then((res) => {
        const validAds = res.data.filter((ad:any) => Number(ad.time) > 0);
        setAds(validAds);
      })
      .catch((err) => console.error("Ad fetch error:", err));
  }, []);

  // Show first ad after 3s
  useEffect(() => {
    if (!ads.length) return;
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
    
      className="relative w-full min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/image/1.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4 z-10">
        <h1 className="font-Poppins font-bold text-[#188bff] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-full mb-5 drop-shadow-lg">
          {displayText}
        </h1>
        <p className="font-Inder italic text-gray-200 text-lg sm:text-xl md:text-2xl max-w-full mb-3">
          {t("subtitle")}
        </p>
        <p className="font-Inder text-gray-300 text-base sm:text-lg max-w-md mb-6">
          {t("description")}
        </p>

        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="font-raleway bg-[#188bff] text-white px-6 py-3 rounded-xl text-base sm:text-lg font-semibold shadow-md hover:shadow-lg transition-all z-20"
          onClick={() => router.push("/services")}
        >
          {t("get_started")}
        </motion.button>
      </div>

      {/* Advertisement */}
      <AnimatePresence>
        {showAd && ad && (
          <motion.div
            key={ad.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-5 right-5 p-3 sm:p-5 bg-gray-800 w-36 sm:w-72 shadow-xl rounded-lg overflow-hidden z-30"
          >
            <div className="relative w-full h-28 sm:h-40 overflow-hidden rounded-md">
              <img
                src={`https://switchiify.com/bonetProject/backend/public/${ad.image}`}
                alt={ad.adv_title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 sm:p-3">
              <h3 className="text-sm sm:text-lg font-semibold text-white font-poetsen">
                {ad.adv_title}
              </h3>
              <p className="text-xs sm:text-sm text-[#f5f5f5] font-poetsen">
                {ad.subtitle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FirstHome;
