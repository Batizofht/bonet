import { useState } from "react";
import { Card } from "antd";
import { CompassOutlined, CarOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import TourGuideForm from "./tourguideform";
import TourTransportForm from "./tourtransportfrom";

const TourTypeSelector = ({ onTourSubmit }) => {
  const { t } = useTranslation();
  const [activeForm, setActiveForm] = useState(null);

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Tour Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose between professional tour guides or reliable transportation services for your journey
          </p>
        </div>

        {/* Selection Cards */}
        {!activeForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Tour Guide Card */}
            <Card
              hoverable
              onClick={() => setActiveForm("guide")}
              className="cursor-pointer border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full"
              bodyStyle={{ padding: '32px', textAlign: 'center' }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <CompassOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Professional Tour Guide
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Expert local guides to show you the best attractions, hidden gems, and cultural experiences. Perfect for personalized tours and immersive experiences.
                </p>
                <div className="mt-4 text-sm text-blue-600 font-medium">
                  Click to book a tour guide
                </div>
              </div>
            </Card>

            {/* Transport Card */}
            <Card
              hoverable
              onClick={() => setActiveForm("transport")}
              className="cursor-pointer border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full"
              bodyStyle={{ padding: '32px', textAlign: 'center' }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CarOutlined className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Tour Transportation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Comfortable and reliable vehicles for all your travel needs. From airport transfers to multi-day tours with professional drivers.
                </p>
                <div className="mt-4 text-sm text-green-600 font-medium">
                  Click to book transportation
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Back Button when form is active */}
        {activeForm && (
          <div className="mb-6">
            <button
              onClick={() => setActiveForm(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
            >
              <span className="text-lg">←</span>
              Back to Services
            </button>
          </div>
        )}

        {/* Forms */}
        <div className="mt-6">
          {activeForm === "guide" && (
            <TourGuideForm onTourSubmit={handleGuideSubmit} />
          )}
          {activeForm === "transport" && (
            <TourTransportForm onTourSubmit={handleTransportSubmit} />
          )}
        </div>

        {/* Additional Info when no form is selected */}
        {!activeForm && (
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Choose Our Tour Services?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Local Expertise</h4>
                  <p className="text-gray-600 text-sm">Knowledgeable guides with deep local insights</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Reliable Service</h4>
                  <p className="text-gray-600 text-sm">Punctual and professional transportation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 font-bold">✓</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Customizable</h4>
                  <p className="text-gray-600 text-sm">Tailored experiences to match your preferences</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourTypeSelector;