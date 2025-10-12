import { useState } from "react";
import { Card } from "antd";
import { CompassOutlined, CarOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import TourGuideForm from "./tourguideform";
import TourTransportForm from "./tourtransportfrom";
import TourMore from "./TourMore"; // 👈 Confirm this import

const TourTypeSelector = ({ onTourSubmit }) => {
  const { t } = useTranslation();
  const [activeForm, setActiveForm] = useState(null);

  const handleGuideFinish = (values) => {
    onTourSubmit({ type: "guide", data: values });
    console.log("Guide Form Data Submitted:", values);
  };

  const handleTransportFinish = (values) => {
    onTourSubmit({ type: "transport", data: values });
    console.log("Transport Form Data Submitted:", values);
  };

  const cardStyle = (type) =>
    activeForm === type
      ? { backgroundColor: "#e6f7ff", borderColor: "#91d5ff" }
      : {};

  return (
    <div>
      {/* Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card
          hoverable
          onClick={() => setActiveForm("guide")}
          style={cardStyle("guide")}
          className="cursor-pointer border transition-all"
        >
          <span className="text-3xl text-blue-500 mb-2">
            <CompassOutlined />
          </span>
          <h3 className="text-xl text-blue-400 font-semibold">
            {t("tourTypeSelector.guideTitle")}
          </h3>
          <p>{t("tourTypeSelector.guideDescription")}</p>
        </Card>

        <Card
          hoverable
          onClick={() => setActiveForm("transport")}
          style={cardStyle("transport")}
          className="cursor-pointer border transition-all"
        >
          <span className="text-3xl text-blue-500 mb-2">
            <CarOutlined />
          </span>
          <h3 className="text-xl text-blue-400 font-semibold">
            {t("tourTypeSelector.transportTitle")}
          </h3>
          <p>{t("tourTypeSelector.transportDescription")}</p>
        </Card>
      </div>

      {/* Forms (shown only before submission) */}
      <div className="mt-4">
        {activeForm === "guide" && (
          <TourGuideForm onFinish={handleGuideFinish} />
        )}
        {activeForm === "transport" && (
          <TourTransportForm onFinish={handleTransportFinish} />
        )}
      </div>
    </div>
  );
};

export default TourTypeSelector;
