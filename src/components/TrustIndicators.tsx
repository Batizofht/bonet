"use client";
import { useTranslation } from "react-i18next";

type Partner = { name: string; image: string; invertOnWhite?: boolean };

const partners: Partner[] = [
  { name: "Rwanda Development Board", image: "https://pbs.twimg.com/profile_images/763711110461677569/Tp0r6Bir_400x400.jpg" },
  { name: "Rwanda Government", image: "https://www.gov.rw/fileadmin/gov/resources/public/images/Coat_of_Arms_Rwanda-01.png" },
  { name: "Visit Rwanda", image: "https://cdn-bal.nba.com/manage/sites/3/2022/02/h5gzz91kuhif7pyjhqqx-1.png" },
  { name: "RURA Rwanda", image: "https://www.rura.rw/fileadmin/user_upload/RURA/Icon_Images/logorura.png" },
];

const TrustIndicators = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-50 py-16 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-3">{t("trust.label")}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider mb-10 lg:mb-12">
          {t("trust.title")}
        </h2>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200"
          style={{
            maskImage: "radial-gradient(ellipse 80% 70% at center, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at center, black 30%, transparent 100%)",
          }}
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group bg-white aspect-[3/2] flex items-center justify-center p-4 md:p-6"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className={`max-w-full max-h-full object-contain transition-all duration-500 grayscale hover:grayscale-0 hover:scale-105${partner.invertOnWhite ? " invert" : ""}`}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-xs font-bold text-gray-600 uppercase tracking-wider">{partner.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">
            {t("trust.licensed")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;