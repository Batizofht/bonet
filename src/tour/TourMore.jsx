import React, { useState } from "react";
import { CompassOutlined, CarOutlined } from "@ant-design/icons";
import UserGuideDetails from "./UserGuideDetails";
import UserTransportDetails from "./UserTransportDetails";

const TourMore = ({ tourData, goBack }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!tourData || !tourData.data) return null;
  const { type, data } = tourData;

  if (showDetails) {
    return type === "guide" ? (
      <UserGuideDetails data={data} goBack={goBack} />
    ) : (
      <UserTransportDetails data={data} goBack={goBack} />
    );
  }

  const Icon = type === "guide" ? CompassOutlined : CarOutlined;
  let items = [];

  if (type === "guide") {
    const {
      fullName,
      email,
      language,
      destinations,
      travelDates,
      tourType,
      activityLevel,
      duration,
      travelers,
      budget,
      requests,
    } = data;

    const formattedDates = travelDates?.map((date) => {
      try {
        return typeof date === "string"
          ? date
          : new Date(date).toLocaleDateString();
      } catch {
        return "Invalid date";
      }
    });

    items = [
      { label: "Full Name", value: fullName },
      { label: "Email", value: email },
      { label: "Language", value: language },
      { label: "Destinations", value: destinations },
      { label: "Travel Dates", value: formattedDates?.join(", ") },
      { label: "Tour Type", value: Array.isArray(tourType) ? tourType.join(", ") : null },
      { label: "Activity Level", value: activityLevel },
      { label: "Duration", value: duration },
      { label: "Travelers", value: travelers},
      { label: "Budget", value: budget ? `$${budget}` : null },
      { label: "Special Requests", value: requests },
    ];
  } else if (type === "transport") {
    const {
      name,
      datetime,
      pickup,
      dropoff,
      passengers,
      vehicle,
      notes,
    } = data;

    const formattedDatetime = datetime
      ? new Date(datetime).toLocaleString()
      : "N/A";

    items = [
      { label: "Full Name", value: name },
      { label: "Datetime", value: formattedDatetime },
      { label: "Pickup Location", value: pickup },
      { label: "Drop-off Location", value: dropoff },
      { label: "Passengers", value: passengers },
      { label: "Vehicle Type", value: vehicle },
      { label: "Extra Notes", value: notes },
    ];
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-500">Tour Details</h2>
        {/* <button
          onClick={goBack}
          className="text-sm text-blue-600 hover:underline"
        >
          Go Back
        </button> */}
      </div>

      <div className="flex gap-8 items-start">
        <div className="flex-shrink-0">
          <Icon style={{ fontSize: "5rem", color: "#3B82F6" }} />
        </div>

        <div className="flex-1 text-left space-y-2 text-gray-700">
          {items.map((item, idx) => (
            <p key={idx}>
              <strong className="text-blue-400">{item.label}:</strong> {item.value || "N/A"}
            </p>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setShowDetails(true)}
          className="bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TourMore;
