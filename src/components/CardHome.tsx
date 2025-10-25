"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Home, Car, Users, X, Star } from "lucide-react";
import Link from "next/link";

const BookingCards = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "hotel",
      title: "Hotel Reservations",
      description: "Luxury stays with premium amenities",
      icon: Building,
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "apartments", 
      title: "Apartment Booking",
      description: "Comfortable homes away from home",
      icon: Home,
      color: "from-green-500 to-emerald-400",
    },
    {
      id: "transport",
      title: "Transport Service", 
      description: "Safe and reliable transportation",
      icon: Car,
      color: "from-orange-500 to-amber-400",
    },
    {
      id: "tourism",
      title: "Tourism Guides",
      description: "Explore with expert local guides", 
      icon: Users,
      color: "from-purple-500 to-pink-400",
    }
  ];

  return (
    <>
      {/* Cards Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-4"
      >
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 cursor-pointer group hover:bg-white/20 transition-all duration-300"
              onClick={() => setSelectedService(service.id)}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 mx-auto`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-white font-semibold text-center text-sm mb-1">
                {service.title}
              </h3>
              <p className="text-gray-200 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (() => {
          const service = services.find(s => s.id === selectedService);
          if (!service) return null;
          const IconComponent = service.icon;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl max-w-sm w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-800 text-sm">Features:</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Premium quality service</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>24/7 customer support</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Best price guarantee</span>
                  </div>
                </div>
<Link href={`/bookNow#${selectedService}`}>
<button className="w-full bg-[#188bff] text-white py-2 rounded-xl font-semibold text-sm hover:bg-blue-600 transition-colors">
                  Book Now
                </button>
</Link>
                
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
};

export default BookingCards;