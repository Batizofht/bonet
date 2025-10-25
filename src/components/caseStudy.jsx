import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Bot from "./Bigbot";
import ChatAi from "../ai/chat";
// import Chat from "../ai/Chat"; // Import Chat component

const caseStudies = [
  {
    image: "../assets/images/chat5.png",
    title: "AI-Powered Chatbot for Customer Support",
    description:
      "We developed an advanced AI chatbot that handles customer queries, assists with bookings, and guides users through business registration. The chatbot significantly improved response time, reducing customer wait times by 60%.",
    bgColor: "bg-blue-100",
    buttonText: "Open Chatbot",
    openChat: true,
  },
  {
    image: "../assets/images/chat3.jpeg",
    title: "AI-Driven Booking System for Hotels & Transport",
    description:
      "Our AI-powered booking system automates hotel, transport, and tour reservations. By leveraging machine learning, it provides dynamic pricing, personalized recommendations, and optimizes availability based on real-time data.",
    bgColor: "bg-green-100",
    buttonText: `${t("menu.bookNow")}`,
    navigateTO: "/bookNow", // Updated path to match React Router convention
  },
  // {
  //   image: "../assets/images/chat2.webp",
  //   title: "AI-Powered Business Insights & Document Assistance",
  //   description:
  //     "This AI-driven solution offers automated document assistance for business setup and provides deep business insights. It analyzes customer behavior, financial trends, and generates predictive reports to help businesses make data-driven decisions.",
  //   bgColor: "bg-pink-100",
  //   buttonText: "Open Now",
  // },
];

const CaseStudies = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [openChatIndex, setOpenChatIndex] = useState(null);
  const handleOpenChat = (index) => {
    setOpenChatIndex((prevIndex) => (prevIndex === index ? null : index)); 
  };
  {openChatIndex !== null && (
    <div className="mb-6">
      <ChatAi />
    </div>
  )}
  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      {showChat && (
        <div className="mb-6">
          <Bot />
        </div>
      )}
      {openChatIndex !== null && (
        <div className="mb-6">
          <ChatAi />
        </div>
      )}

      <div className="w-20 h-1 bg-[#188bff] mx-auto mt-2 mb-5"></div>
      <h2 className="text-center text-3xl mb-6 mx-auto text-gray-700 font-bold" style={{ maxWidth: "250px" }}>
        Our recent{" "}
        <span className="font-bold bg-[#188bff] bg-clip-text text-transparent">
          AI Solutions
        </span>
      </h2>

      <div className="space-y-6">
        {caseStudies.map((study, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg ${study.bgColor} flex flex-col md:flex-row items-center`}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src={study.image}
              alt={study.title}
              className="w-full md:w-1/3 rounded-lg object-cover mb-4 md:mb-0"
            />
            <div className="md:ml-6 text-center md:text-left w-full">
              <h3 className="font-semibold mb-2 bg-[#188bff] bg-clip-text text-transparent" style={{ fontSize: "28px" }}>
                {study.title}
              </h3>
              <p className="mb-4" style={{ color: "#4A5568", fontSize: "14px" }}>
                {study.description}
              </p>
              <div className="flex justify-between items-center">
              <button
  className="px-4 py-2 bg-[#188bff] text-white rounded-lg font-semibold"
  onClick={() => handleOpenChat(index)} // Open chat for specific card
>
  Chat Now
</button>

                <div className="text-right space-x-4">
                  <a className="bg-[#188bff] bg-clip-text text-transparent cursor-pointer font-semibold"
                  onClick={() => {
                    if (study.openChat) {
                      setShowChat((prev) => !prev); // Toggle chatbot for first card
                    } else if (study.navigateTO) {
                      navigate(study.navigateTO); // Navigate if navigateTO is defined
                    }
                  }}
                >
                  {study.buttonText}
                </a>
                
                  <a 
                  onClick={() => navigate(index === 0 ? "/customer" : index === 1 ? "/bookings" : "/business")}
                  className="font-semibold hover:underline bg-[#188bff] bg-clip-text text-transparent cursor-pointer"
                   >
                   Read more →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* <div className="text-right mt-6">
        <a
          href="#"
          className="font-semibold hover:underline bg-[#188bff] bg-clip-text text-transparent"
        >
          Read more Solutions →
        </a>
      </div> */}
    </section>
  );
};

export default CaseStudies;
