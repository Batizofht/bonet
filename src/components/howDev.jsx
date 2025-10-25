import React from "react";
import { motion } from "framer-motion";

const HowDevelopmentWorks = () => {
  const steps = [
    {
      id: "#1",
      title: "AI-Powered Chatbot",
      description:
        "Our intelligent chatbot assists customers 24/7, answering FAQs, guiding business registrations, and handling bookings effortlessly.",
    },
    {
      id: "#2",
      title: "Smart Booking System",
      description:
        "AI-driven booking for hotels, transport, and tours, ensuring seamless scheduling and a personalized experience for users.",
    },
    {
      id: "#3",
      title: "Personalized Recommendations",
      description:
        "By analyzing user behavior, our AI provides tailored suggestions to enhance engagement and satisfaction.",
    },
    // {
    //   id: "#4",
    //   title: "AI Document Assistance",
    //   description:
    //     "From business setup paperwork to contract generation, AI streamlines document handling for accuracy and efficiency.",
    // },
    // {
    //   id: "#5",
    //   title: "Business Insights & Reports",
    //   description:
    //     "AI-driven analytics provide deep insights, helping businesses make data-backed decisions with confidence.",
    // },
    {
      id: "#6",
      title: "Voice Assistant Integration",
      description:
        "Customers can interact with our voice assistant for instant support, making the experience more interactive and convenient.",
    },
  ];

  return (
    <div className="bg-white py-16 px-6 text-center">
      <div className="w-20 h-1 bg-[#188bff] mx-auto mt-2 mb-5"></div>
      <h2 className="text-3xl text-gray-700 font-bold">How AI</h2>
      <h1 className="text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent">
        Powers Your Business
      </h1>

      <div className="relative mt-12 max-w-4xl mx-auto">
        {/* Vertical Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 top-8 w-1 h-full bg-gray-300 transform -translate-x-1/2"></div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative bg-white p-6 shadow-md rounded-lg border-t-4 transition-all ${
                index % 2 === 0 ? "border-blue-500" : "border-green-500"
              }`}
            >
              <h3 className="font-bold bg-[#188bff] bg-clip-text text-transparent">
                <span className="">{step.id}</span> 
                <span className="">{step.title}</span>
              </h3>
              <p className="text-sm text-[#718096] mt-2">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowDevelopmentWorks;