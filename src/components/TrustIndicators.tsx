"use client";
import { useTranslation } from "react-i18next";

/** The government bodies Bonet files with on clients' behalf */
const authorities = [
  { short: "RDB", name: "Rwanda Development Board", role: "Company registration, investment certificates" },
  { short: "RRA", name: "Rwanda Revenue Authority", role: "TIN, VAT and tax filings" },
  { short: "RSSB", name: "Rwanda Social Security Board", role: "Employer registration, payroll contributions" },
  { short: "DGIE", name: "Directorate General of Immigration", role: "Residence and work permits" },
];

const TrustIndicators = () => {
  const { t } = useTranslation();
  return (
    <section className="border-t border-line bg-white py-14 md:py-20">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <p className="eyebrow">{t("trust.label")}</p>
            <h2 className="h-display mt-3 text-[1.6rem] md:text-[1.9rem]">{t("trust.title")}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{t("trust.licensed")}</p>
          </div>
          <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
            {authorities.map((a, i) => (
              <li key={a.short} className={`border-b border-line py-5 ${i % 2 === 1 ? "sm:border-l sm:pl-8" : "sm:pr-8"}`}>
                <p className="font-display text-[1.15rem] font-semibold text-ink-900">{a.short}</p>
                <p className="mt-0.5 text-[14.5px] text-ink-700">{a.name}</p>
                <p className="mt-1 text-[13.5px] text-ink-400">{a.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
