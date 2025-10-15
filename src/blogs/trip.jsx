"use client"
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Sparkles, 
  Compass,
  Mountain,
  Camera,
  Heart
} from "lucide-react";

const TravelTips = () => {
  const { t } = useTranslation();

  // Load travel spots as an array of objects from translation JSON, using returnObjects:true
  const travelData = t("travelSpots", { returnObjects: true });

  // travelData should have a structure like { title: string, spots: array }
  if (!travelData || !travelData.spots) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-2 h-2 bg-[#188bff] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#188bff] rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-[#188bff] rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <Compass className="w-6 h-6 text-[#188bff] animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Discover <span className="bg-[#188bff] bg-clip-text text-transparent">Rwanda</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          {travelData.title}
        </p>
      </div>

      {/* Travel Spots */}
      <div className="space-y-12">
        {travelData.spots.map((spot, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`flex flex-col lg:flex-row items-center bg-white rounded-3xl border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="lg:w-2/5 w-full relative">
              <div className="relative overflow-hidden h-80 lg:h-96">
                {spot.image ? (
                  <>
                    <img
                      src={spot.image}
                      alt={spot.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                        <Heart className="w-5 h-5 text-red-400 hover:fill-red-400 transition-all" />
                      </button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <Mountain className="w-16 h-16 text-[#188bff] opacity-50" />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-3/5 w-full p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#188bff] to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#188bff] to-cyan-500 bg-clip-text text-transparent">
                    {spot.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Full Day</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Family</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {spot.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl">
                  <Camera className="w-4 h-4 text-[#188bff]" />
                  <span className="text-sm font-medium text-gray-700">Photo Spots</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Must Visit</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-xl">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Guided Tours</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-[#188bff] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
                >
                  <Compass className="w-4 h-4" />
                  Book Tour
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 border-2 border-[#188bff] text-[#188bff] px-6 py-3 rounded-xl font-semibold hover:bg-[#188bff] hover:text-white transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  View Location
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-100 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-[#188bff] to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Compass className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Explore Rwanda?
          </h3>
          
          <p className="text-gray-600 text-lg mb-6">
            Let us create the perfect itinerary for your Rwandan adventure. 
            From gorilla trekking to city tours, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#188bff] text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
            >
              Plan My Trip
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-[#188bff] text-[#188bff] px-8 py-3 rounded-xl font-semibold hover:bg-[#188bff] hover:text-white transition-all"
            >
              Get Free Guide
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TravelTips;