"use client"
import React from "react";
import { useTranslation } from "react-i18next";
import { 
  MapPin, 
  Clock, 
  Users, 
  Compass,
  Mountain
} from "lucide-react";
import Link from "next/link";

const TravelTips = () => {
  const { t } = useTranslation();

  const travelData = t("travelSpots", { returnObjects: true });

  if (!travelData || !travelData.spots) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-16">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          Travel Tips
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          Discover <span className="text-[#C9A84C]">Rwanda</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl">
          {travelData.title}
        </p>
      </div>

      {/* Travel Spots */}
      <div className="space-y-12">
        {travelData.spots.map((spot, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-start bg-white rounded-xl border border-gray-200 overflow-hidden ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="lg:w-2/5 w-full">
              <div className="relative overflow-hidden h-72 lg:h-full">
                {spot.image ? (
                  <img
                    src={spot.image}
                    alt={spot.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Mountain className="w-12 h-12 text-gray-300" />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-3/5 w-full p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {spot.title}
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">Full Day</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">Family</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {spot.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href="/bookNow">
                  <button className="bg-[#C9A84C] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#B8973B] transition-colors duration-200 text-sm">
                    Book Tour
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200 text-sm">
                    View Location
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 border border-gray-200 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Explore Rwanda?
        </h3>
        <p className="text-gray-500 mb-6 max-w-lg mx-auto">
          Let us create the perfect itinerary for your Rwandan adventure. From gorilla trekking to city tours, we've got you covered.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/bookNow">
            <button className="bg-[#C9A84C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#B8973B] transition-colors duration-200">
              Plan My Trip
            </button>
          </Link>
          <Link href="/contact">
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200">
              Get Free Guide
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TravelTips;