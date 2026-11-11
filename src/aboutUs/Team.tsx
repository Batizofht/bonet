"use client";
import { Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const teamMembers = [
  {
    name: "Prince Bonfils Bimenyimana, MBA, PMP",
    role: "Founder & Executive Chairman",
    initials: "PB",
    image: "/image/Team/bon.jpg",
    bio: "A seasoned business strategist with over six years of executive leadership in finance, operations, and technology across Rwanda's private sector. Founded Bonet Elite Services to offer investors, entrepreneurs, and travelers a seamless premium experience from market entry to establishment.",
    tags: ["Strategy", "Finance", "ERP Systems"],
    linkedin: "https://www.linkedin.com/in/prince-bonfils-bimenyimana",
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
    <section className="border-t border-line bg-white py-16 md:py-24">
      <div className="container-x">
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="eyebrow">{L("Leadership","Direction","领导团队")}</p>
          <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">
            {L("Meet Our Team","Notre Équipe","认识我们的团队")}
          </h2>
          <p className="lead mt-5">
            {L("The experts behind every seamless experience","Les experts derrière chaque expérience sans faille","每次卓越体验背后的专家团队")}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="card card-hover flex flex-col overflow-hidden">
              <div className="relative w-full aspect-[4/5] bg-sand overflow-hidden">
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
              <div className="flex flex-1 flex-col p-6">
              <h3 className="text-[1.05rem] font-semibold leading-snug text-ink-900">{member.name}</h3>
              <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-gold-700">{member.role}</p>
              <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink-600">{member.bio}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {member.tags.map((tag, i) => (
                  <span key={i} className="rounded-full border border-line bg-ivory px-2.5 py-1 text-[11.5px] font-medium text-ink-600">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-[13.5px] font-medium text-ink-500 transition-colors hover:text-gold-700"
              >
                <Linkedin className="h-4 w-4" />
                <span>{L("View Profile","Voir le profil","查看简介")}</span>
              </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
