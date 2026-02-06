'use client'
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Camera, Sparkles } from "lucide-react";

const Gallery = () => {
  const navigate = useRouter();
  const { t } = useTranslation();

  // OPTIMIZED: Memoize images array to prevent recreation on every render
  const images = useMemo(() => [
    { src: "../assets/images/conv.jpg", key: "conv" },
    { src: "../assets/images/k2.webp", key: "k2" },
    { src: "../assets/images/memo.jpg", key: "memo" },
    { src: "../assets/images/k3.jpg", key: "k3" },
    { src: "../assets/images/kiv.jpg", key: "kiv" },
    { src: "../assets/images/vov.jpg", key: "vov" },
    { src: "../assets/images/part1.jpg", key: "part1" },
    { src: "../assets/images/tea.webp", key: "tea" },
    { src: "../assets/images/nyu5.jpg", key: "nyu5" },
    { src: "../assets/images/gis3.jpg", key: "gis3" },
    { src: "../assets/images/huye.JPG", key: "huye" },
    { src: "../assets/images/muhazi.jpg", key: "muhazi" }
  ], []);

  // OPTIMIZED: Memoize animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  }), []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent" />
          <Camera className="w-6 h-6 text-[#188bff] animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent" />
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse" />
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {t("gallery.title", "Our Gallery").split(" ").map((word, i) => 
            i === 0 ? (
              <span key={i} className="bg-[#188bff] bg-clip-text text-transparent relative inline-block">
                {word}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#188bff] to-cyan-400 transform scale-x-0 hover:scale-x-100 transition-transform duration-300" />
                {" "}
              </span>
            ) : (
              <span key={i} className="text-gray-600">{" " + word + " "}</span>
            )
          )}
        </h2>
        <p className="text-gray-500 text-lg">{t("Explore beautiful destinations in Rwanda")}</p>
      </div>

      {/* OPTIMIZED: Use motion container with variants instead of individual initial props */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              {/* OPTIMIZED: Add loading="lazy" for better performance */}
              <img
                src={image.src}
                alt={t(`gallery.places.${image.key}`)}
                loading="lazy"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Location Badge */}
              <div className="absolute bottom-3 left-3 right-3">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-3 transform group-hover:translate-y-0 transition-transform duration-300"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#188bff] flex-shrink-0" />
                    <span className="text-gray-800 font-semibold text-sm truncate">
                      {t(`gallery.places.${image.key}`)}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Hover Sparkle Effect */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Button */}
      <div className="flex justify-center">
        <motion.button
          onClick={() => navigate.push("/visitrwanda")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-[#188bff] text-white px-8 py-4 rounded-2xl hover:bg-blue-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl cursor-pointer group/btn"
        >
         
          {t("gallery.button")}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
};

export default Gallery;