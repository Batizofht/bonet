"use client";
import { Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const teamMembers = [
  {
    name: "Prince Bonfils Bimenyimana, MBA, PMP (Candidate)",
    role: "Founder & Executive Chairman",
    initials: "PB",
    image: "/image/Team/bon.jpg",
    bio: "A seasoned business strategist with over six years of executive leadership in finance, operations, and technology across Rwanda's private sector. Founded Bonet Elite Services to offer investors, entrepreneurs, and travelers a seamless premium experience from market entry to establishment.",
    tags: ["Strategy", "Finance", "ERP Systems"],
    linkedin: "https://www.linkedin.com/in/prince-bonfils-bimenyimana",
  },
  {
    name: "Jean Luc Shema, CPA(R)",
    role: "Chief Financial Officer",
    initials: "JL",
    image: "/image/Team/SHEMAPIC.JPG",
    bio: "Certified Public Accountant registered with ICPAR. Deep expertise in IFRS reporting, tax compliance, BNR regulatory frameworks, and financial management for regulated institutions.",
    tags: ["IFRS", "Tax Compliance", "BNR Regulations"],
    linkedin: "https://www.linkedin.com/in/jean-luc-shema",
  },
  {
    name: "Emmanuel Cubahiro",
    role: "Chief Legal Officer & Authorized Notary",
    initials: "EC",
    image: "/image/Team/another.jpg",
    bio: "Practicing lawyer registered with the Rwanda Bar Association and East Africa Law Society. Over a decade of experience in corporate law, contract drafting, and dispute resolution. Currently pursuing a Master's in International Law at Georg-August Universitat Gottingen.",
    tags: ["Corporate Law", "Contracts", "Compliance"],
    linkedin: "https://www.linkedin.com/in/emmanuel-cubahiro",
  },
  {
    name: "Diane Nyirabahire",
    role: "Senior Financial Advisor & Project Management Specialist",
    initials: "DN",
    image: "/image/Team/DSC_7901.JPG.jpeg",
    bio: "Over 7 years in financial reporting, tax compliance, and business process improvement. MBA in Project Management and Bachelor's in Accounting from the University of Rwanda. Currently completing CPA with ICPAR.",
    tags: ["Financial Reporting", "Project Management", "IFRS"],
    linkedin: "https://www.linkedin.com/in/diane-nyirabahire",
  },
  {
    name: "Ronald Mutabazi",
    role: "Director of Human Capital & Organizational Development",
    initials: "RM",
    image: "/image/Team/mutabazi.jpeg",
    bio: "Over 12 years in human capital management covering talent acquisition, organizational development, and labor law compliance. Managing Director of Emet Hand Supply and Services Ltd.",
    tags: ["HR Strategy", "Talent", "Labour Law"],
    linkedin: "https://www.linkedin.com/in/ronald-mutabazi",
  },
];

export default function Team() {
  const { i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">
            {L("Leadership","Direction","领导团队")}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            {L("Meet Our Team","Notre Équipe","认识我们的团队")}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            {L("The experts behind every seamless experience","Les experts derrière chaque expérience sans faille","每次卓越体验背后的专家团队")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
              <div className="w-full aspect-[4/3] rounded-lg bg-gray-100 overflow-hidden mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-[50%_25%]"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.parentElement?.querySelector("span");
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
                <span className="hidden w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold">
                  {member.initials}
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-tight">{member.name}</h3>
              <p className="text-[#C9A84C] text-sm font-medium mt-1">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed mt-4 flex-1">{member.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {member.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-semibold uppercase tracking-wider rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-gray-400 hover:text-[#C9A84C] transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>{L("View Profile","Voir le profil","查看简介")}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
