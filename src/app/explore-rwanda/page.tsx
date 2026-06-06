import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Explore Rwanda | Investment, Tourism & Living Guide",
  description: "Discover Rwanda: Africa's safest country for investment, tourism, and living. Key sectors, living costs, gallery, and business opportunities.",
  keywords: "Explore Rwanda, Rwanda investment, Rwanda tourism, Rwanda living, Kigali business, Rwanda economy",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/explore-rwanda" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/explore-rwanda",
    title: "Explore Rwanda | Investment & Tourism Guide",
    description: "Discover Rwanda: investment sectors, living guide, and tourism highlights.",
    images: [{ url: "https://bonet.rw/assets/images/logo.png", width: 1200, height: 630 }],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Rwanda | Investment & Tourism Guide",
    description: "Discover Rwanda: investment sectors, living guide, and tourism highlights.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function ExploreRwandaPage() {
  const galleryImages = [
    { src: "../assets/images/conv.jpg", title: "Convention Center" },
    { src: "../assets/images/k2.webp", title: "Kigali City" },
    { src: "../assets/images/memo.jpg", title: "Memorial" },
    { src: "../assets/images/k3.jpg", title: "Kigali Views" },
    { src: "../assets/images/kiv.jpg", title: "Lake Kivu" },
    { src: "../assets/images/vov.jpg", title: "Volcanoes" },
    { src: "../assets/images/part1.jpg", title: "Culture" },
    { src: "../assets/images/tea.webp", title: "Tea Plantations" },
    { src: "../assets/images/nyu5.jpg", title: "Nyungwe Forest" },
    { src: "../assets/images/gis3.jpg", title: "Gisenyi" },
    { src: "../assets/images/huye.JPG", title: "Huye" },
    { src: "../assets/images/muhazi.jpg", title: "Lake Muhazi" },
  ];

  const sectors = [
    { name: "ICT & Digital", desc: "Growing tech ecosystem with 4G coverage and digital hubs across Kigali" },
    { name: "Tourism", desc: "Mountain gorillas, eco-tourism, luxury hospitality and convention centers" },
    { name: "Manufacturing", desc: "Special economic zones with tax incentives and export processing" },
    { name: "Agriculture", desc: "Premium coffee, tea, and horticulture exports to global markets" },
    { name: "Energy", desc: "Renewable energy targets and solar investment opportunities" },
    { name: "Finance", desc: "Emerging fintech ecosystem and expanding banking sector" },
  ];

  const living = [
    { title: "Safety", desc: "#2 safest country in Africa with low crime rates and stable governance" },
    { title: "Cost of Living", desc: "Affordable compared to regional peers with competitive expat packages" },
    { title: "Healthcare", desc: "Modern hospitals and medical facilities with international standards" },
    { title: "Education", desc: "International schools and universities with globally recognized programs" },
    { title: "Connectivity", desc: "Excellent internet and digital infrastructure with nationwide fiber" },
    { title: "Climate", desc: "Year-round pleasant temperatures in the Land of a Thousand Hills" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full h-[20vh] sm:h-[30vh] bg-gray-900 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Discover</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">Explore Rwanda</h1>
        </div>
      </div>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">The Opportunity</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              Rwanda at a Glance
            </h2>
          </div>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Key facts that make Rwanda one of Africa&apos;s most attractive destinations for business, investment, and living.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-8">
            {[
              { value: "13M", label: "Population" },
              { value: "#2", label: "Safest in Africa" },
              { value: "Top 3", label: "Ease of Business" },
              { value: "6hrs", label: "Company Setup" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#C9A84C] mb-2">{item.value}</div>
                <p className="text-gray-600 text-sm uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Investment</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              Key Sectors
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              Rwanda&apos;s most promising industries for growth and investment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
                <div className="text-4xl font-bold text-[#C9A84C]/20 mb-3 leading-none">{(i + 1).toString().padStart(2, "0")}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{sector.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Lifestyle</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              Living in Rwanda
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              Quality of life factors for expats and residents
            </p>
          </div>
          <div className="divide-y divide-gray-200 max-w-4xl mx-auto">
            {living.map((item, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-4 md:gap-8 py-6 md:py-8 first:pt-0">
                <div className="md:text-right">
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider">0{i + 1}</p>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed md:col-span-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Gallery</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              Visit Rwanda
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              Destinations and experiences across the Land of a Thousand Hills
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative w-full bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/1.jpg')", minHeight: "30vh" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative flex flex-col items-center justify-center text-center px-4 py-16 lg:py-20">
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Get Started</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Explore Rwanda?
          </h2>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
            Whether you&apos;re investing, relocating, or visiting — we make your Rwanda experience seamless.
          </p>
          <Link
            href="/contact?service=consultation"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
          >
            Book Your Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
