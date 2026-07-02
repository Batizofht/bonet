"use client";
import { useTranslation } from "react-i18next";

type Partner = { name: string; image: string; invertOnWhite?: boolean };

const partners: Partner[] = [
  { name: "Visit Rwanda", image: "https://cdn-bal.nba.com/manage/sites/3/2022/02/h5gzz91kuhif7pyjhqqx-1.png" },
  { name: "Rwanda Development Board", image: "https://pbs.twimg.com/profile_images/763711110461677569/Tp0r6Bir_400x400.jpg" },
  { name: "Rwanda Government", image: "https://www.gov.rw/fileadmin/gov/resources/public/images/Coat_of_Arms_Rwanda-01.png" },
  { name: "Marriott International", image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Marriott_hotels_logo14.svg" },
  { name: "Kigali City", image: "https://www.kigalicity.gov.rw/fileadmin/user_upload/Kigali_city/Icon_images/LOGO_COK.jpg" },
  { name: "RwandAir", image: "https://www.rwandair.com/wp-content/themes/rwandairajax/imgs/favi.png" },
  { name: "RURA Rwanda", image: "https://www.rura.rw/fileadmin/user_upload/RURA/Icon_Images/logorura.png" },
  { name: "Rwanda Finance LTD", image: "https://www.kigalicity.gov.rw/fileadmin/user_upload/Kigali_city/Icon_images/Rwanda_Finance.png" },
  { name: "UNDP", image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/UNDP_logo.svg" },
  {
    name: "World Bank",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/1280px-The_World_Bank_logo.svg.png",
  },
  {
    name: "African Development Bank",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Logo_Afrikanische_Entwicklungsbank.svg/640px-Logo_Afrikanische_Entwicklungsbank.svg.png",
  },
  {
    name: "European Union",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/960px-Flag_of_Europe.svg.png",
  },
  {
    name: "GIZ",
    image: "https://logowik.com/content/uploads/images/giz5563.jpg",
  },
  {
    name: "UNHCR",
    image: "https://images.seeklogo.com/logo-png/14/1/unhcr-logo-png_seeklogo-144883.png",
  },
  {
    name: "MINICOM",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Coat_of_arms_of_Rwanda.svg/960px-Coat_of_arms_of_Rwanda.svg.png",
  },
  {
    name: "Radisson Blu",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Radisson_Blu_logo.svg/250px-Radisson_Blu_logo.svg.png",
  },
  {
    name: "Serena Hotels",
    image: "https://images.seeklogo.com/logo-png/62/1/serena-hotels-logo-png_seeklogo-629723.png",
  },
  {
    name: "Kigali Convention Centre",
    image: "https://images.seeklogo.com/logo-png/7/1/kcc-logo-png_seeklogo-77705.png",
  },
  {
    name: "Bank of Kigali",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Bk-logo.png",
  },
  {
    name: "I&M Bank Rwanda",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/54/I%26M_Bank_Rwanda_plc_logo.png",
  },
  {
    name: "MTN Rwanda",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/MTN_2022_logo.svg/960px-MTN_2022_logo.svg.png",
  },
  {
    name: "Airtel Rwanda",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Airtel_logo.svg/330px-Airtel_logo.svg.png",
  },
  {
    name: "BRITAM",
    image: "https://images.seeklogo.com/logo-png/55/2/britam-insurance-uganda-limited-logo-png_seeklogo-555169.png",
  },
  {
    name: "Norrsken House",
    image: "https://cdn.prod.website-files.com/65e76a14af207274f46c7f0e/665dbf14c7f8d8e979b03ada_norrsken-logo-white.svg",
    invertOnWhite: true,
  },
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
          className="grid grid-cols-3 md:grid-cols-6 gap-px bg-gray-200"
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