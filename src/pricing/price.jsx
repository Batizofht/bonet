import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const pricingPlans = [
  {
    title: "Basic",
    price: "$29",
    features: [
      { name: "24/7 Tech Support", included: true },
      { name: "Advanced Options", included: true },
      { name: "Custom Integrations", included: false },
    ],
  },
  {
    title: "Pro",
    price: "$49",
    features: [
      { name: "24/7 Tech Support", included: true },
      { name: "Advanced Options", included: true },
      { name: "Custom Integrations", included: true },
    ],
  },
  {
    title: "Enterprise",
    price: "$69",
    features: [
      { name: "All Pro Features", included: true },
      { name: "Custom Integrations", included: true },
      { name: "Dedicated Support", included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <div className="w-full flex flex-col items-center p-8">
      <h2 className="text-black text-2xl font-bold text-center mb-6">
        Pricing{" "}
        <span className="bg-[#188bff] bg-clip-text text-transparent">
          Plans
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl justify-center items-center">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            className="relative w-full max-w-xs mx-auto md:mx-0"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Absolute Price Circle - Moved Outside */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center text-lg font-bold rounded-full shadow-md z-10 relative">
              <div className="absolute inset-0 rounded-full p-[2px] bg-[#188bff]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className="bg-[#188bff] bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Section - Title & Price */}
            <div
              className="relative flex flex-col items-center bg-[#188bff] text-white rounded-t-lg pb-8 pt-12 px-6"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)",
                borderRadius: "12px 12px 0 0",
              }}
            >
              <h3 className="text-xl font-bold">{plan.title}</h3>
            </div>

            {/* White Card (Main Section) */}
            <div className="bg-white p-8 rounded-b-lg shadow-md text-gray-700 min-h-[280px] w-[290px] flex flex-col justify-between mt-[-16px] mx-auto">
              <ul className="mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 mb-2 text-lg">
                    {feature.included ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    {feature.name}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-[#57007B] text-white py-3 rounded-full font-bold hover:bg-[#46005A] transition-all">
                Choose Plan
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
