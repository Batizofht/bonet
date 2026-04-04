"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

const teamMembers = [
  {
    name: "Prince Bonfils Bimenyimana, MBA, PMP (Candidate)",
    role: "Founder & Executive Chairman",
    initials: "PB",
    image: "/assets/images/team/prince.jpg",
    bio: "A seasoned business strategist with over six years of executive leadership in finance, operations, and technology across Rwanda's private sector. Founded Bonet Elite Services to offer investors, entrepreneurs, and travelers a seamless premium experience from market entry to establishment.",
    tags: ["Strategy", "Finance", "ERP Systems"],
    colorClass: "bg-[#188bff]",
  },
  {
    name: "Jean Luc Shema, CPA(R)",
    role: "Chief Financial Officer",
    initials: "JL",
    image: "/assets/images/team/jeanluc.jpg",
    bio: "Certified Public Accountant registered with ICPAR. Deep expertise in IFRS reporting, tax compliance, BNR regulatory frameworks, and financial management for regulated institutions.",
    tags: ["IFRS", "Tax Compliance", "BNR Regulations"],
    colorClass: "bg-green-500",
  },
  {
    name: "Emmanuel Cubahiro",
    role: "Chief Legal Officer & Authorized Notary",
    initials: "EC",
    image: "/assets/images/team/emmanuel.jpg",
    bio: "Practicing lawyer registered with the Rwanda Bar Association and East Africa Law Society. Over a decade of experience in corporate law, contract drafting, and dispute resolution. Currently pursuing a Master's in International Law at Georg-August Universität Göttingen.",
    tags: ["Corporate Law", "Contracts", "Compliance"],
    colorClass: "bg-orange-500",
  },
  {
    name: "Diane Nyirabahire",
    role: "Senior Financial Advisor & Project Management Specialist",
    initials: "DN",
    image: "/assets/images/team/diane.jpg",
    bio: "Over 7 years in financial reporting, tax compliance, and business process improvement. MBA in Project Management and Bachelor's in Accounting from the University of Rwanda. Currently completing CPA with ICPAR.",
    tags: ["Financial Reporting", "Project Management", "IFRS"],
    colorClass: "bg-purple-500",
  },
  {
    name: "Ronald Mutabazi",
    role: "Director of Human Capital & Organizational Development",
    initials: "RM",
    image: "/assets/images/team/ronald.jpg",
    bio: "Over 12 years in human capital management covering talent acquisition, organizational development, and labor law compliance. Managing Director of Emet Hand Supply and Services Ltd.",
    tags: ["HR Strategy", "Talent", "Labour Law"],
    colorClass: "bg-cyan-500",
  },
];

export default function Team() {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
      },
    }),
    []
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse" />
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent" />
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse" />
        </div>

        <h2 className="text-4xl font-bold text-gray-800">
          Meet Our{" "}
          <span className="bg-[#188bff] bg-clip-text text-transparent">
            Team
          </span>
        </h2>
        <p className="text-gray-500 text-lg mt-2">
          The experts behind every seamless experience
        </p>
      </div>

      {/* Team Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`bg-white p-6 rounded-2xl border border-blue-100 hover:border-[#188bff] hover:shadow-lg transition-all duration-300 group ${
              index >= 3 ? "md:last:col-start-auto lg:last:col-start-auto" : ""
            } ${index === 3 ? "lg:col-start-1" : ""} ${
              index === 4 ? "lg:col-start-2" : ""
            }`}
          >
            {/* Avatar */}
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-20 h-20 ${member.colorClass} rounded-full flex items-center justify-center mb-4 shadow-lg overflow-hidden`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <span className="text-white text-2xl font-bold hidden">
                  {member.initials}
                </span>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-bold text-gray-800 leading-tight">
                {member.name}
              </h3>
              <p className="text-[#188bff] text-sm font-medium mt-1">
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
                    className="px-3 py-1 bg-blue-50 text-[#188bff] text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
