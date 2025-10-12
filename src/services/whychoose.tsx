
import { motion } from "framer-motion";
import { useState } from "react";
import { FaMapMarkerAlt, FaBuilding, FaUsers } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const WhyChooseBonet = () => {
  const { t } = useTranslation();
  const [expandedCard, setExpandedCard] = useState(null);

  const cardData = [
    {
      icon: <FaMapMarkerAlt className="w-16 h-16 text-blue-400" />,
      title: t("whyBonet.cards.0.title"),
      shortDesc: t("whyBonet.cards.0.shortDesc"),
      longDesc: t("whyBonet.cards.0.longDesc"),
    },
    {
      icon: <FaBuilding className="w-16 h-16 text-blue-400" />,
      title: t("whyBonet.cards.1.title"),
      shortDesc: t("whyBonet.cards.1.shortDesc"),
      longDesc: t("whyBonet.cards.1.longDesc"),
    },
    {
      icon: <FaUsers className="w-16 h-16 text-blue-400" />,
      title: t("whyBonet.cards.2.title"),
      shortDesc: t("whyBonet.cards.2.shortDesc"),
      longDesc: t("whyBonet.cards.2.longDesc"),
    },
  ];

  const toggleExpand = (index:any) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="flex flex-col justify-center p-4 w-full md:w-11/12 lg:w-10/12 xl:w-9/12 pt-10 items-start gap-16 mx-auto">
      <div className="text-center w-full">
        <h2 className="text-2xl xl:text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent">
          <span className="text-gray-700">{t("whyBonet.title")}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`p-6 bg-white border border-blue-500 shadow-lg rounded-lg flex flex-col items-center text-center gap-4 cursor-pointer transition-all duration-500 ${expandedCard === index ? 'h-auto' : 'h-[250px]'}`}
            onClick={() => toggleExpand(index)}
          >
            {card.icon}
            <h3 className="text-xl font-bold bg-[#188bff] bg-clip-text text-transparent">
              {card.title}
            </h3>
            <p className="text-zinc-600 text-sm">
              {expandedCard === index ? card.longDesc : card.shortDesc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseBonet;
