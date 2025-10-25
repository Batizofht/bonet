import React, { useState } from "react";

const steps = [
  {
    number: 1,
    title: "Business Registration",
    description: [
      "Register your business with the Rwanda Development Board (RDB).",
      "Provide identification documents (ID or passport).",
      "Submit Memorandum of Association (if applicable).",
      "Registration is free and takes about 6 hours."
    ]
  },
  {
    number: 2,
    title: "Tax Identification Number (TIN) Registration",
    description: [
      "Obtain TIN from Rwanda Revenue Authority (RRA).",
      "Required for tax compliance and invoicing."
    ]
  },
  {
    number: 3,
    title: "Social Security Registration",
    description: [
      "Register with Rwanda Social Security Board (RSSB).",
      "Ensure employee pension and social security compliance."
    ]
  },
  {
    number: 4,
    title: "Sector-Specific Licenses and Permits",
    description: [
      "Health sector: Get approval from Rwanda Food and Drugs Authority (RFDA).",
      "Construction: Obtain permits from City of Kigali or district authorities.",
      "Food business: Register with Rwanda Hospitality Association (RHA)."
    ]
  },
  {
    number: 5,
    title: "Work Permits and Visas (If Needed)",
    description: [
      "Foreign investors must obtain a work permit.",
      "Apply through the Directorate General of Immigration and Emigration (DGIE).",
      "Use the IremboGov portal for applications."
    ]
  },
  {
    number: 6,
    title: "Environmental Compliance (If Needed)",
    description: [
      "Industries like manufacturing or mining need an Environmental Impact Assessment (EIA).",
      "Compliance overseen by the Rwanda Environment Management Authority (REMA)."
    ]
  }
];

const BLsteps = () => {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (number) => {
    setExpandedStep(expandedStep === number ? null : number);
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8 bg-[#188bff] bg-clip-text text-transparent">
        Business Licensing Process/Steps
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`relative p-6 bg-white shadow-lg rounded-2xl border border-gray-200 cursor-pointer transition-all duration-300 ${expandedStep === step.number ? 'h-auto' : 'h-24 overflow-hidden'}`}
            onClick={() => toggleStep(step.number)}
          >
            <div className="absolute top-2 left-4 mb-3 text-gray-500 text-3xl font-bold opacity-50">
              {step.number}
            </div>
            <h2 className="text-xl font-bold  ml-2 bg-[#188bff] bg-clip-text text-transparent mb-3">
              {step.title}
            </h2>
            <div className={`transition-opacity duration-300 ${expandedStep === step.number ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <ul className="text-gray-700 space-y-1 mt-4">
                {step.description.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BLsteps;