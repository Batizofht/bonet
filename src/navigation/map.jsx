"use client"
import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUser,  } from "react-icons/fa";

import { useTranslation } from "react-i18next";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "12px",
  overflow: "hidden",
};

const center = { lat: -1.9577, lng: 30.1127 };

const MapComponent = () => {
  const { t } = useTranslation();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [directions, setDirections] = useState(null);
  const [duration, setDuration] = useState(null);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);

  const startRef = useRef(null);
  const endRef = useRef(null);

  const handleLoad = (mapInstance) => setMap(mapInstance);

  const handlePlaceChange = (type) => {
    let autocomplete = type === "start" ? startRef.current : endRef.current;
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        if (type === "start") {
          setStartLocation(place.formatted_address);
          setStartCoords(location);
        } else {
          setEndLocation(place.formatted_address);
          setEndCoords(location);
        }
      }
    }
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        setStartCoords(location);

        // Reverse geocoding to get address
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          if (status === "OK" && results[0]) {
            setStartLocation(results[0].formatted_address);
          } else {
            setStartLocation("Current Location");
          }
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Location access was denied. Please enable it in your browser settings.");
        } else {
          alert("Error fetching location. Please try again.");
        }
      }
    );
  };

  const calculateRoute = () => {
    if (!startCoords || !endCoords) {
      alert("Please enter both start and destination locations.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: startCoords,
        destination: endCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          setDuration(result.routes[0].legs[0].duration.text);
        } else {
          alert("Could not get directions. Please try again.");
        }
      }
    );
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <motion.section
      className="py-16 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {/* EXACT SAME HEADER AS BLOG SECTION */}
      <div id="#location" className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          {/* <MapPin className="w-6 h-6 text-[#188bff] animate-pulse" /> */}
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
      
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {t("locationSecondSection.title", "Our Gallery").split(" ").map((word, i) => 
            i === 0 ? (
              <span key={i} className="bg-[#188bff] bg-clip-text text-transparent relative inline-block">
                {word} 
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#188bff] to-cyan-400 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
                {"  "}
              </span>
            ) : (
              <span key={i} className="text-gray-600">{" " +  word + "  "}</span>
            )
          )}
        </h2>
        <p className="text-gray-500 text-lg">Find your way with interactive directions</p>
      </div>

      {/* Map Content */}
      <motion.div 
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-8 bg-white rounded-2xl shadow-lg border border-blue-100 hover:border-[#188bff] transition-all duration-300 group"
        whileHover={{ y: -5, scale: 1.01 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Left Panel */}
        <div className="w-full md:w-1/3 space-y-6 relative">
          {/* Current Location Button */}
          <div className="flex justify-end">
            <button
              onClick={getCurrentLocation}
              className="inline-flex items-center gap-2 bg-[#188bff] text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold text-sm group/btn shadow-sm hover:shadow-md"
            >
              <FaUser className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              {t("locationSecondSection.title")}
            </button>
          </div>

          {/* Starting Point Input */}
          <motion.div 
            className="flex items-center space-x-3 border-2 border-blue-100 p-4 rounded-xl shadow-sm group-hover:border-blue-200 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <FaMapMarkerAlt className="text-[#188bff] text-lg" />
            <Autocomplete onLoad={(auto) => (startRef.current = auto)} onPlaceChanged={() => handlePlaceChange("start")}>
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder={t("locationSecondSection.startingPoint")}
                className="w-full outline-none placeholder-gray-500 text-gray-700 bg-transparent"
              />
            </Autocomplete>
          </motion.div>

          {/* Destination Input */}
          <motion.div 
            className="flex items-center space-x-3 border-2 border-blue-100 p-4 rounded-xl shadow-sm group-hover:border-blue-200 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <FaMapMarkerAlt className="text-[#F76680] text-lg" />
            <Autocomplete onLoad={(auto) => (endRef.current = auto)} onPlaceChanged={() => handlePlaceChange("end")}>
              <input
                type="text"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                placeholder={t("locationSecondSection.destination")}
                className="w-full outline-none placeholder-gray-500 text-gray-700 bg-transparent"
              />
            </Autocomplete>
          </motion.div>

          {/* Search Button */}
          <motion.button 
            onClick={calculateRoute}
            className="bg-gradient-to-r from-[#188bff] to-blue-600 w-full hover:from-blue-600 hover:to-[#188bff] text-white font-semibold rounded-xl py-4 h-auto transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border-0 group/btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              {t("locationSecondSection.search")}
              {/* <Navigation className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /> */}
            </span>
          </motion.button>

          {/* Duration Display */}
          {duration && (
            <motion.div 
              className="text-center p-3 bg-blue-50 rounded-xl border border-blue-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-700 font-semibold">
                {t("locationSecondSection.estimatedTime")}: <span className="text-[#188bff]">{duration}</span>
              </p>
            </motion.div>
          )}
        </div>  

        {/* Right Panel (Google Map) */}
        <motion.div 
          className="w-full md:w-2/3 overflow-hidden rounded-xl shadow-lg border border-blue-100 group-hover:border-[#188bff] transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <GoogleMap 
            mapContainerStyle={containerStyle} 
            center={center} 
            zoom={12} 
            onLoad={handleLoad}
            options={{
              styles: [
                {
                  featureType: "all",
                  elementType: "geometry",
                  stylers: [{ color: "#f5f5f5" }],
                },
              ],
            }}
          >
            {directions && <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeColor: "#188bff", strokeWeight: 6 } }} />}
          </GoogleMap>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default MapComponent;