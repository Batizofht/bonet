import React from "react";
import { useTranslation, Trans } from "react-i18next";

const InvestingInRwanda = () => {
  const { t } = useTranslation();

  const steps = t("investingInRwanda.steps", { returnObjects: true });
  const step2 = t("investingInRwanda.step2", { returnObjects: true });
  const businessPlan = t("investingInRwanda.businessPlan", { returnObjects: true });

  return (
    <div className="mb-20">
      {/* Title with highlighted 'au Rwanda' */}
      <h1 className="mt-20 text-gray-700 mb-5 text-3xl font-bold text-center">
        <Trans
          i18nKey="investingInRwanda.title"
          components={{ 
            highlight: <span className="bg-[#188bff] bg-clip-text text-transparent" />
          }}
        />
      </h1>

      <div className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Why Invest */}
        <div className="p-8 mb-6">
          <h2 className="text-2xl font-semibold bg-[#188bff] bg-clip-text text-transparent text-center">
            {t("investingInRwanda.whyInvest.title")}
          </h2>
          <p className="text-gray-600 mt-4 text-center">
            {t("investingInRwanda.whyInvest.text")}
          </p>
        </div>

        {/* Steps Part 1 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
              {steps.prepare.title}
            </h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {steps.prepare.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
              {steps.documents.title}
            </h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {steps.documents.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps Part 2 */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
              {steps.registerOnline.title}
            </h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {steps.registerOnline.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
              {steps.taxes.title}
            </h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {steps.taxes.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Information */}
        <div className="bg-gray-100 p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
            {steps.keyInfo.title}
          </h2>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            {steps.keyInfo.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Step 2 */}
        <h2 className="text-2xl font-semibold bg-[#188bff] bg-clip-text text-transparent text-center mt-8">
          {step2.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
              {step2.onlineApplication.title}
            </h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {step2.onlineApplication.items.map((item, idx) => (
                <li key={idx}>
                  {item.includes("osc.rdb.rw") ? (
                    <a
                      href="https://osc.rdb.rw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      {item}
                    </a>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
              {step2.applicationLetter.title}
            </h2>
            <p className="text-gray-600 mt-2">{step2.applicationLetter.text}</p>
          </div>
        </div>

        {/* Business Plan */}
        <div className="bg-gray-100 p-6 rounded-lg shadow mt-8">
          <h2 className="text-xl font-semibold bg-[#188bff] bg-clip-text text-transparent text-center">
            {businessPlan.title}
          </h2>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            {businessPlan.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestingInRwanda;
