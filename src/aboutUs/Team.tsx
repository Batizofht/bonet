"use client";

const teamMembers = [
  {
    name: "Prince Bonfils Bimenyimana, MBA, PMP (Candidate)",
    role: "Founder & Executive Chairman",
    initials: "PB",
    image: "/image/Team/bon.jpg",
    bio: "A seasoned business strategist with over six years of executive leadership in finance, operations, and technology across Rwanda's private sector. Founded Bonet Elite Services to offer investors, entrepreneurs, and travelers a seamless premium experience from market entry to establishment.",
    tags: ["Strategy", "Finance", "ERP Systems"],
    colorClass: "bg-[#188bff]",
  },
  {
    name: "Jean Luc Shema, CPA(R)",
    role: "Chief Financial Officer",
    initials: "JL",
    image: "/image/Team/SHEMAPIC.JPG",
    bio: "Certified Public Accountant registered with ICPAR. Deep expertise in IFRS reporting, tax compliance, BNR regulatory frameworks, and financial management for regulated institutions.",
    tags: ["IFRS", "Tax Compliance", "BNR Regulations"],
    colorClass: "bg-green-500",
  },
  {
    name: "Emmanuel Cubahiro",
    role: "Chief Legal Officer & Authorized Notary",
    initials: "EC",
    image: "/image/Team/another.jpg",
    bio: "Practicing lawyer registered with the Rwanda Bar Association and East Africa Law Society. Over a decade of experience in corporate law, contract drafting, and dispute resolution. Currently pursuing a Master's in International Law at Georg-August Universität Göttingen.",
    tags: ["Corporate Law", "Contracts", "Compliance"],
    colorClass: "bg-orange-500",
  },
  {
    name: "Diane Nyirabahire",
    role: "Senior Financial Advisor & Project Management Specialist",
    initials: "DN",
    image: "/image/Team/DSC_7901.JPG.jpeg",
    bio: "Over 7 years in financial reporting, tax compliance, and business process improvement. MBA in Project Management and Bachelor's in Accounting from the University of Rwanda. Currently completing CPA with ICPAR.",
    tags: ["Financial Reporting", "Project Management", "IFRS"],
    colorClass: "bg-purple-500",
  },
  {
    name: "Ronald Mutabazi",
    role: "Director of Human Capital & Organizational Development",
    initials: "RM",
    image: "/image/Team/mutabazi.jpeg",
    bio: "Over 12 years in human capital management covering talent acquisition, organizational development, and labor law compliance. Managing Director of Emet Hand Supply and Services Ltd.",
    tags: ["HR Strategy", "Talent", "Labour Law"],
    colorClass: "bg-cyan-500",
  },
];

export default function Team() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          Leadership
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
          Meet Our <span className="text-[#C9A84C]">Team</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          The experts behind every seamless experience
        </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#C9A84C] hover:shadow-lg transition-all duration-300 group ${
                index >= 3 ? "md:last:col-start-auto lg:last:col-start-auto" : ""
              } ${index === 3 ? "lg:col-start-1" : ""} ${
                index === 4 ? "lg:col-start-2" : ""
              }`}
            >
              {/* Image */}
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-full aspect-[4/3] ${member.colorClass} rounded-xl flex items-center justify-center mb-4 shadow-lg overflow-hidden`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-[50%_25%]"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "auto"}
                    style={
                      member.name === "Emmanuel Cubahiro"
                        ? { objectPosition: "50% 10%" }
                        : undefined
                    }
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <span className="text-white text-4xl font-bold hidden">
                    {member.initials}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-gray-800 leading-tight">
                  {member.name}
                </h3>
                <p className="text-[#C9A84C] text-sm font-medium mt-1">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-gray-600 text-sm leading-relaxed mt-4">
                  {member.bio}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {member.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
