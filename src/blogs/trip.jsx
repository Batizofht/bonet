"use client"
import React from "react";
import { useTranslation } from "react-i18next";

const TravelTips = () => {
  const { t } = useTranslation();

  // Load travel spots as an array of objects from translation JSON, using returnObjects:true
  const travelData = t("travelSpots", { returnObjects: true });

  // travelData should have a structure like { title: string, spots: array }
  if (!travelData || !travelData.spots) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent mb-6">
        {travelData.title}
      </h2>
      <div className="space-y-8">
        {travelData.spots.map((spot, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start gap-6"
          >
            <div className="w-full md:w-1/2 h-56 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
              {spot.image ? (
                <img
                  src={spot.image}
                  alt={spot.title}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              ) : (
                <span className="text-gray-500">[No Image Available]</span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
                {spot.title}
              </h3>
              <p className="text-gray-700 mt-2">{spot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelTips;
