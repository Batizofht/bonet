import { useState } from "react";
import { CompassOutlined, CarOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import TourGuideForm from "./tourguideform";
import TourTransportForm from "./tourtransportfrom";

const TourTypeSelector = ({ onTourSubmit }) => {
  const { t } = useTranslation();
  const [activeForm, setActiveForm] = useState("guide");

  const handleGuideSubmit = (values) => {
    if (onTourSubmit) {
      onTourSubmit({ type: "guide", data: values });
    }
  };

  const handleTransportSubmit = (values) => {
    if (onTourSubmit) {
      onTourSubmit({ type: "transport", data: values });
    }
  };

  return (
    <div className="min-h-screen  pb-4">
      <div className="mx-0 md:max-w-4xl md:mx-auto md:px-4 px-2">
        {/* Compact Tabs */}
        <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm mb-6 max-w-md mx-auto">
          <button
            onClick={() => setActiveForm("guide")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeForm === "guide"
                ? "bg-blue-50 text-blue-600 border border-blue-200"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <CompassOutlined className="text-base" />
            <span>Tour Guide</span>
          </button>
          
          <button
            onClick={() => setActiveForm("transport")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeForm === "transport"
                ? "bg-green-50 text-green-600 border border-green-200"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <CarOutlined className="text-base" />
            <span>Transport</span>
          </button>
        </div>

        {/* Forms */}
        <div>
          {activeForm === "guide" && (
            <TourGuideForm onTourSubmit={handleGuideSubmit} />
          )}
          {activeForm === "transport" && (
            <TourTransportForm onTourSubmit={handleTransportSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TourTypeSelector;