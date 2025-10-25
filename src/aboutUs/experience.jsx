export default function ExperienceComponent() {
  const features = [
    {
      title: "Unmatched Local Expertise",
      description: "With deep knowledge of Rwanda’s business and tourism landscape, we provide tailored solutions for travelers, investors, and entrepreneurs."
    },
    {
      title: "One-Stop Business & Travel Solution",
      description: "From business registration to executive travel arrangements,we handle everything seamlessly, saving you time and effort."
    },
    {
      title: "Exclusive & VIP Services",
      description: "We offer high-end, personalized experiences, whether for business setup, relocation, or luxury accommodations."
    },
    {
      title: "Fast & Hassle-Free Process",
      description: "We simplify complex procedures and ensure smooth,efficient service delivery so you can focus on what matters."
    },
    {
      title: "Strong Network & Government Liaison",
      description: "Our partnerships with government agencies, real estate firms, and financial institutions allow us to provide quick and reliable solutions."
    },
    {
      title: "Premium Client Support",
      description: "We prioritize customer satisfaction with dedicated, round-the-clock assistance for all your business and travel needs."
    }
  ];

  return (
    <div className="p-6 mt-10">
      {/* Title */}
      <h2 className="text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent text-center mb-6">
        <span className="text-gray-700">What Makes</span> Us Different?
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="border border-gray-300 shadow-lg p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
