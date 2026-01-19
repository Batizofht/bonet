import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { RiRobot2Line } from "react-icons/ri";
import { MdSupportAgent, MdInsights } from "react-icons/md";
import { FaHotel, FaMicrophoneAlt } from "react-icons/fa";
import { AiOutlineFileSearch } from "react-icons/ai";
import ElitePopup from "./voice";
import Bot from "./Bigbot";


const features = [
  {
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team assists with customer inquiries, answering FAQs, handling bookings, and guiding users through business registration.",
    icon: <MdSupportAgent className="w-6 h-6 text-white" />,
    iconBg: "bg-blue-500",
    action: "openBot",
  },
  {
    title: "Smart Booking System",
    description:
      "Our streamlined booking system handles hotel, transport, and tour reservations, offering seamless scheduling and real-time updates.",
    icon: <FaHotel className="w-6 h-6 text-white" />,
    iconBg: "bg-green-500",
    action: "/bookNow",
  },
  {
    title: "Personalized Recommendations",
    description:
      "We analyze your preferences to offer personalized recommendations, enhancing your experience and satisfaction.",
    icon: <RiRobot2Line className="w-6 h-6 text-white" />,
    iconBg: "bg-purple-500",
    action: "/bookNow",
  },
  // {
  //   title: "AI-Driven Document Assistance",
  //   description:
  //     "Our AI tools help users generate, review, and manage business setup documents, simplifying administrative tasks.",
  //   icon: <AiOutlineFileSearch className="w-6 h-6 text-white" />,
  //   iconBg: "bg-yellow-500",
  //   action: "/document",
  // },
  // {
  //   title: "Business Insights & Reports",
  //   description:
  //     "AI gathers and processes data to generate actionable business insights and detailed reports for strategic decision-making.",
  //   icon: <MdInsights className="w-6 h-6 text-white" />,
  //   iconBg: "bg-pink-500",
  //   action: "/document",
  // },
  {
    title: "Voice Support",
    description:
      "Enable hands-free customer interaction with our voice support system for answering queries and assisting users.",
    icon: <FaMicrophoneAlt className="w-6 h-6 text-white" />,
    iconBg: "bg-red-500",
    action: "openElitePopup",
  },
];

const AIFeatures = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showBot, setShowBot] = useState(false);
  const [showElite, setShowElite] = useState(false);

  const features = [
    {
      title: t("premiumFeatures.customerSupport.title"),
      description: t("premiumFeatures.customerSupport.description"),
      icon: <MdSupportAgent className="w-6 h-6 text-white" />,
      iconBg: "bg-blue-500",
      action: "openBot",
    },
    {
      title: t("premiumFeatures.bookingSystem.title"),
      description: t("premiumFeatures.bookingSystem.description"),
      icon: <FaHotel className="w-6 h-6 text-white" />,
      iconBg: "bg-green-500",
      action: "/bookNow",
    },
    {
      title: t("premiumFeatures.recommendations.title"),
      description: t("premiumFeatures.recommendations.description"),
      icon: <RiRobot2Line className="w-6 h-6 text-white" />,
      iconBg: "bg-purple-500",
      action: "/bookNow",
    },
    {
      title: t("premiumFeatures.voiceSupport.title"),
      description: t("premiumFeatures.voiceSupport.description"),
      icon: <FaMicrophoneAlt className="w-6 h-6 text-white" />,
      iconBg: "bg-red-500",
      action: "openElitePopup",
    },
  ];

  const handleClick = (action) => {
    if (action === "openBot") {
      setShowBot(true);
      // setShowElite(false); // Close ElitePopup if open
    } else if (action === "openElitePopup") {
      setShowElite(true);
      // setShowBot(false); // Close Bot if open
    } else if (action !== "#") {
      navigate(action);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-16 px-6 max-w-7xl mx-auto text-center border-2 border-[#E7DAED] rounded-lg relative"
    >
      {/* Display Bot if showBot is true */}
      {showBot && (
        // <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 p-6">
          <Bot/>
        // </div>
      )}

      {/* Display ElitePopup if showElite is true */}
      {showElite && (
        // <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 p-6">
          <ElitePopup/>
        // </div>
      )}

      <div className="w-20 h-1 bg-[#188bff] mx-auto mt-2 mb-5"></div>
      <h2 className="text-gray-700 text-3xl font-bold">{t("premiumFeatures.title")}</h2>
      <h3 className="text-3xl font-bold bg-gradient-to-b from-[#57007B] to-[#F76680] bg-clip-text text-transparent">
        {t("premiumFeatures.subtitle")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white shadow-md p-6 rounded-lg text-left flex items-start border border-[#E7DAED] cursor-pointer"
            onClick={() => handleClick(feature.action)}
          >
            <div
              className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${feature.iconBg} mr-4`}
            >
              {feature.icon}
            </div>
            <div>
              <h4
                className="text-lg font-semibold bg-[#188bff] bg-clip-text text-transparent"
                style={{ fontSize: "20px" }}
              >
                {feature.title}
              </h4>
              <p className="text-gray-600 mt-2 text-sm" style={{ fontSize: "14px" }}>
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIFeatures;
