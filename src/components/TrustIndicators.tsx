"use client";

const partners = [
  { name: "Visit Rwanda", image: "https://cdn-bal.nba.com/manage/sites/3/2022/02/h5gzz91kuhif7pyjhqqx-1.png" },
  { name: "Rwanda Development Board", image: "https://pbs.twimg.com/profile_images/763711110461677569/Tp0r6Bir_400x400.jpg" },
  { name: "Rwanda Government", image: "https://www.gov.rw/fileadmin/gov/resources/public/images/Coat_of_Arms_Rwanda-01.png" },
  { name: "Marriott International", image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Marriott_hotels_logo14.svg" },
  { name: "Kigali City", image: "https://www.kigalicity.gov.rw/fileadmin/user_upload/Kigali_city/Icon_images/LOGO_COK.jpg" },
  { name: "RwandAir", image: "https://www.rwandair.com/wp-content/themes/rwandairajax/imgs/favi.png" },
  { name: "RURA Rwanda", image: "https://www.rura.rw/fileadmin/user_upload/RURA/Icon_Images/logorura.png" },
  { name: "Rwanda Finance LTD", image: "https://www.kigalicity.gov.rw/fileadmin/user_upload/Kigali_city/Icon_images/Rwanda_Finance.png" },
  { name: "UNDP", image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/UNDP_logo.svg" },
  { name: "World Bank", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/World_Bank_logo.svg/2560px-World_Bank_logo.svg.png" },
  { name: "African Development Bank", image: "https://logo.clearbit.com/afdb.org" },
  { name: "European Union", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/2560px-Flag_of_Europe.svg.png" },
  { name: "GIZ", image: "https://logo.clearbit.com/giz.de" },
  { name: "UNHCR", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/UNHCR_logo.svg/2560px-UNHCR_logo.svg.png" },
  { name: "MINICOM", image: "https://logo.clearbit.com/minicom.gov.rw" },
  { name: "Radisson Blu", image: "https://logo.clearbit.com/radissonhotels.com" },
  { name: "Serena Hotels", image: "https://logo.clearbit.com/serenahotels.com" },
  { name: "Kigali Convention Centre", image: "https://logo.clearbit.com/kcc.rw" },
  { name: "Bank of Kigali", image: "https://logo.clearbit.com/bk.rw" },
  { name: "I&M Bank Rwanda", image: "https://logo.clearbit.com/imbank.com" },
  { name: "MTN Rwanda", image: "https://logo.clearbit.com/mtn.co.rw" },
  { name: "Airtel Rwanda", image: "https://logo.clearbit.com/airtel.co.rw" },
  { name: "BRITAM", image: "https://logo.clearbit.com/britam.com" },
  { name: "Norrsken House", image: "https://logo.clearbit.com/norrskenhouse.com" },
];

const TrustIndicators = () => {
  return (
    <section className="bg-gray-50 py-16 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Edge</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider mb-10 lg:mb-12">
          Institutions and brands we've worked with
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
                className="max-w-full max-h-full object-contain transition-all duration-500 grayscale hover:grayscale-0 hover:scale-105"
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
            Licensed by Rwanda Development Board · Government Approved · 5+ Years Experience
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;