
import React from "react";
import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";
import Link from "next/link";

const AiSolutions = () => {
  const { t } = useTranslation();

  const aiFeatures = [
    {
      image: "../assets/images/rdb3.jfif",
      title: t("aisolutions.feature1.title"),
      description: t("aisolutions.feature1.description"),
      highlight: t("aisolutions.feature1.highlight"),
      link: "/blog-business",
    },
    {
      image: "../assets/images/luxury.jpg",
      title: t("aisolutions.feature2.title"),
      description: t("aisolutions.feature2.description"),
      highlight: t("aisolutions.feature2.highlight"),
      link: "/blog-travel-tips",
    },
    {
      image: "../assets/images/vision.jpg",
      title: t("aisolutions.feature3.title"),
      description: t("aisolutions.feature3.description"),
      highlight: t("aisolutions.feature3.highlight"),
      link: "/blog-investment",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <div className="w-20 h-1 bg-[#188bff] mx-auto mt-2 mb-5"></div>
      <h2 className="text-gray-700 text-3xl font-bold text-center mb-6">
        {t("aisolutions.title").split("Bonet Elite Service")[0]}
        <span className="text-[#188bff]">Bonet Elite Service</span>
      </h2>

      <div className="space-y-10">
        {aiFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-6 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full md:w-1/2 h-64 rounded-lg object-cover"
            />
            <div className="md:w-1/2 text-center md:text-left">
              <h4
                className="font-semibold mb-2 text-[#188bff]"
                style={{ fontSize: "20px" }}
              >
                {feature.title}
              </h4>
              <p className="text-[#2D3748] mb-2" style={{ fontSize: "14px" }}>
                {feature.description}
              </p>
              <div className="flex items-start gap-3 mt-4">
                <div className="w-1 h-full bg-gradient-to-b from-[#57007B] to-[#F76680]"></div>
                <p
                  className="italic text-[#188bff]"
                  style={{ fontSize: "13px" }}
                >
                  "{feature.highlight}"
                </p>
              </div>
              <div className="flex justify-center">
                <Link
                  href={feature.link}
                  className="mt-4 inline-block border border-blue-600 text-blue-600 px-20 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  {t("aisolutions.learnMore")}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AiSolutions;
