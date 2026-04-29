"use client"
import React from "react";
import Link from "next/link";

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
      {/* Hero */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            Discover
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6 max-w-4xl leading-[1.1] tracking-tight">
            Explore <span className="text-[#C9A84C]">Rwanda</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
            Business, investment, and travel — your complete guide to the Land of a Thousand Hills
          </p>
        </div>
      </div>

      {/* Rwanda at a Glance */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              The Opportunity
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Rwanda at a <span className="text-[#C9A84C]">Glance</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Key facts that make Rwanda one of Africa&apos;s most attractive destinations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "13M", label: "Population" },
              { value: "#2", label: "Safest in Africa" },
              { value: "Top 3", label: "Ease of Business" },
              { value: "6hrs", label: "Company Setup" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold text-[#C9A84C] mb-3">{item.value}</div>
                <p className="text-gray-900 font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Sectors */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              Investment
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Key <span className="text-[#C9A84C]">Sectors</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Rwanda&apos;s most promising industries for growth and investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200/30 hover:border-[#C9A84C]/40 transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{sector.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Living in Rwanda */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              Lifestyle
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Living in <span className="text-[#C9A84C]">Rwanda</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Quality of life factors for expats and residents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {living.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200/30 hover:border-[#C9A84C]/40 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Visit <span className="text-[#C9A84C]">Rwanda</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Destinations and experiences across the Land of a Thousand Hills
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl border border-gray-200/30 bg-white hover:border-[#C9A84C]/40 transition-colors duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div
        className="relative w-full h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex flex-col justify-center items-center text-center px-4 h-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Explore Rwanda?
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl">
            Whether you&apos;re investing, relocating, or visiting — we make your Rwanda experience seamless.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
          >
            Book Your Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
