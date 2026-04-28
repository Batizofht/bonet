"use client";

const TrustIndicators = () => {
  const partners = [
    { name: "Visit Rwanda", category: "Official Partner", image: "https://cdn-bal.nba.com/manage/sites/3/2022/02/h5gzz91kuhif7pyjhqqx-1.png", hoverText: "group-hover:text-[#009A44]", hoverBorder: "group-hover:border-[#009A44]/40" },
    { name: "Rwanda Development Board", category: "Investment Authority", image: "https://pbs.twimg.com/profile_images/763711110461677569/Tp0r6Bir_400x400.jpg", hoverText: "group-hover:text-[#C9A84C]", hoverBorder: "group-hover:border-[#C9A84C]/40" },
    { name: "Rwanda Government", category: "Official", image: "https://www.gov.rw/fileadmin/gov/resources/public/images/Coat_of_Arms_Rwanda-01.png", hoverText: "group-hover:text-[#00A1DE]", hoverBorder: "group-hover:border-[#00A1DE]/40" },
    { name: "Marriott International", category: "Hospitality", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=240&q=80", hoverText: "group-hover:text-[#A6192E]", hoverBorder: "group-hover:border-[#A6192E]/40" },
    { name: "Serena Hotels", category: "Hospitality", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=240&q=80", hoverText: "group-hover:text-[#6B8E23]", hoverBorder: "group-hover:border-[#6B8E23]/40" },
    { name: "RwandAir", category: "Aviation", image: "https://www.rwandair.com/wp-content/themes/rwandairajax/imgs/favi.png", hoverText: "group-hover:text-[#006B8F]", hoverBorder: "group-hover:border-[#006B8F]/40" },
    { name: "RURA Rwanda", category: "Regulatory", image: "https://www.rura.rw/fileadmin/user_upload/RURA/Icon_Images/logorura.png", hoverText: "group-hover:text-[#7A5A00]", hoverBorder: "group-hover:border-[#7A5A00]/40" },
    { name: "Official Licensee", category: "Verified", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=240&q=80", hoverText: "group-hover:text-[#C9A84C]", hoverBorder: "group-hover:border-[#C9A84C]/40" },  
  ];

  const desktopCells = Array(24).fill(null);
  desktopCells[7] = partners[0];
  desktopCells[8] = partners[1];
  desktopCells[9] = partners[2];
  desktopCells[10] = partners[3];
  desktopCells[13] = partners[4];
  desktopCells[14] = partners[5];
  desktopCells[15] = partners[6];
  desktopCells[16] = partners[7];



  const mobileCells = [null, null, ...partners, null, null];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-0">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            Our Network
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Trusted By Industry Leaders
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Official partnerships with Rwanda&apos;s government bodies and world-class hospitality brands
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 md:hidden gap-0 border border-gray-200 bg-white">
            {mobileCells.map((partner, index) => {
              const row = Math.floor(index / 2);
              const totalRows = Math.ceil(mobileCells.length / 2);
              const opacityClass = row === 0 || row === totalRows - 1 ? "opacity-30" : row === 1 || row === totalRows - 2 ? "opacity-60" : "opacity-85";

              return (
                <div
                  key={`mobile-${index}`}
                  className={`group h-36 border border-gray-200 -m-px px-4 flex flex-col items-center justify-center text-center bg-white transition-all duration-300 ${opacityClass} hover:opacity-100 ${partner ? partner.hoverBorder : ""}`}
                >
                  {partner ? (
                    <>
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-12 h-12 rounded-full object-cover mb-2 border border-gray-200"
                        loading="lazy"
                      />
                      <p className={`font-semibold text-gray-500 text-sm transition-colors duration-300 leading-tight ${partner.hoverText}`}>
                        {partner.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">
                        {partner.category}
                      </p>
                    </>
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden md:grid md:grid-cols-6 gap-0 border border-gray-200 bg-white">
            {desktopCells.map((partner, index) => {
              const row = Math.floor(index / 6);
              const col = index % 6;
              const colOpacity = col === 0 || col === 5 ? 25 : col === 1 || col === 4 ? 55 : 85;
              const rowOpacity = row === 0 || row === 4 ? 25 : row === 1 || row === 3 ? 55 : 85;
              const finalOpacity = Math.min(colOpacity, rowOpacity);
              const opacityClass = finalOpacity === 25 ? "opacity-25" : finalOpacity === 55 ? "opacity-55" : "opacity-85";

              return (
                <div
                  key={`desktop-${index}`}
                  className={`group h-40 border border-gray-200 -m-px px-4 md:px-6 flex flex-col items-center justify-center text-center bg-white transition-all duration-300 ${opacityClass} hover:opacity-100 ${partner ? partner.hoverBorder : ""}`}
                >
                  {partner ? (
                    <>
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-14 h-14 rounded-full object-cover mb-3 border border-gray-200"
                        loading="lazy"
                      />
                      <p className={`font-semibold text-gray-500 text-sm md:text-[15px] transition-colors duration-300 leading-tight ${partner.hoverText}`}>
                        {partner.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-2">
                        {partner.category}
                      </p>
                    </>
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 md:w-24 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-14 md:w-24 bg-gradient-to-l from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 md:h-16 bg-gradient-to-b from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 md:h-16 bg-gradient-to-t from-gray-50 to-transparent" />
        </div>

        {/* Trust line */}
        <div className="mt-14 text-center">
          <p className="text-gray-500 text-sm">
            Licensed by Rwanda Development Board · Government Approved · 5+ Years Experience
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
