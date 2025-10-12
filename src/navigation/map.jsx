"use client"
import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
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
    <motion.div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-6 bg-white shadow-lg rounded-xl w-full">
      {/* Left Panel */}
      <div className="w-full md:w-1/3 space-y-4 relative">
        {/* Header with "Get Location" and User Icon */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-[#188bff] bg-clip-text text-transparent">
          {t("locationSecondSection.title")}
          </h2>
          <button
            onClick={getCurrentLocation}
            className="p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300"
          >
            <FaUser className="text-[#80cefd]" />
          </button>
        </div>

        {/* Starting Point Input */}
        <div className="flex items-center space-x-2 border p-2 rounded-lg shadow-sm">
          <FaMapMarkerAlt className="text-[#80cefd]" />
          <Autocomplete onLoad={(auto) => (startRef.current = auto)} onPlaceChanged={() => handlePlaceChange("start")}>
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              placeholder={t("locationSecondSection.startingPoint")}
              className="w-full outline-none placeholder-gray-500 text-gray-700"
            />
          </Autocomplete>
        </div>

        {/* Destination Input */}
        <div className="flex items-center space-x-2 border p-2 rounded-lg shadow-sm">
          <FaMapMarkerAlt className="text-[#F76680]" />
          <Autocomplete onLoad={(auto) => (endRef.current = auto)} onPlaceChanged={() => handlePlaceChange("end")}>
            <input
              type="text"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              placeholder={t("locationSecondSection.destination")}
              className="w-full outline-none placeholder-gray-500 text-gray-700"
            />
          </Autocomplete>
        </div>

        {/* Search Button */}
        <button onClick={calculateRoute}             className="bg-gradient-to-r from-blue-500 to-blue-600 w-full hover:from-blue-600 hover:to-blue-500 text-white font-semibold rounded-xl py-3 h-auto transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border-0"
>
        {t("locationSecondSection.search")}
        </button>

        {duration && <p className="text-gray-700 text-center">{t("locationSecondSection.estimatedTime")}: {duration}</p>}
      </div>  

      {/* Right Panel (Google Map) */}
      <motion.div className="w-full md:w-2/3 overflow-hidden rounded-lg shadow-lg">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={handleLoad}>
          {directions && <DirectionsRenderer directions={directions} options={{ polylineOptions: { strokeColor: "#57007B" } }} />}
        </GoogleMap>
      </motion.div>
    </motion.div>
  );
};

export default MapComponent;