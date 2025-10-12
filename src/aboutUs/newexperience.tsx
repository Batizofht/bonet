
import { FaBuilding, FaUserTie, FaRocket } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function NewExperience() {
  const { t } = useTranslation();

  const features = [
    {
      title: t("experience.card1.title"),
      description: t("experience.card1.description"),
      icon: <FaBuilding className="text-2xl text-[#62b1ff] mr-2" />
    },
    {
      title: t("experience.card2.title"),
      description: t("experience.card2.description"),
      icon: <FaUserTie className="text-2xl text-[#62b1ff] mr-2" />
    },
    {
      title: t("experience.card3.title"),
      description: t("experience.card3.description"),
      icon: <FaRocket className="text-2xl text-[#62b1ff] mr-2" />
    }
  ];

  return (
    <div className="p-6 mt-10">
      <h2 className="text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent text-center mb-6">
        <span className="text-gray-700">{t("experience.title").split(" ")[0]}</span>{" "}
        {t("experience.title").split(" ").slice(1).join(" ")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-200 shadow-md p-6 rounded-xl text-center hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center mb-3">
              {feature.icon}
              <h3 className="text-lg font-semibold bg-[#188bff] bg-clip-text text-transparent">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
