// app/explore-rwanda/page.tsx - Explore Rwanda with Bonet Elite
import React from "react";
import GreatSoftware from "../../components/greatSoftware";

export const metadata = {
  title: "Explore Rwanda | Business, Investment & Travel Guide | Bonet Elite",
  description:
    "Comprehensive guides to Rwanda: business setup, investment opportunities, travel tips, and local insights. Your complete resource for exploring Rwanda with Bonet Elite.",
  keywords:
    "Rwanda business guide, Rwanda investment opportunities, Rwanda travel tips, Kigali guide, Rwanda market access, East Africa business",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/explore-rwanda" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/explore-rwanda",
    title: "Explore Rwanda | Business, Investment & Travel Guide | Bonet Elite",
    description:
      "Comprehensive guides to Rwanda: business setup, investment opportunities, travel tips, and local insights.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Explore Rwanda with Bonet Elite",
      },
    ],
    siteName: "Bonet Elite Services",
  },
};

export default function ExploreRwandaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Rwanda with <span className="text-[#C9A84C]">Bonet Elite</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Innovative solutions for modern businesses — discover everything Rwanda has to offer 
            for investors, entrepreneurs, and travelers.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <GreatSoftware />

      {/* Additional Resources */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Resources for <span className="text-[#C9A84C]">Your Journey</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Business Setup Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#C9A84C] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Business Setup</h3>
              <p className="text-gray-600 text-sm mb-4">
                Step-by-step guide to registering your company in Rwanda — from RDB to tax compliance.
              </p>
              <a href="/investment" className="text-[#C9A84C] font-semibold text-sm hover:underline">
                Learn more →
              </a>
            </div>

            {/* Investment Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#C9A84C] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Investment Opportunities</h3>
              <p className="text-gray-600 text-sm mb-4">
                Uncover Rwanda's most promising sectors: ICT, manufacturing, tourism, energy, and agriculture.
              </p>
              <a href="/investment" className="text-[#C9A84C] font-semibold text-sm hover:underline">
                Learn more →
              </a>
            </div>

            {/* Travel Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#C9A84C] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Travel Guide</h3>
              <p className="text-gray-600 text-sm mb-4">
                Visa requirements, cultural etiquette, must-visit destinations, and the best times to visit.
              </p>
              <a href="/travel" className="text-[#C9A84C] font-semibold text-sm hover:underline">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Explore Rwanda?
          </h2>
          <p className="text-gray-300 mb-6">
            Whether you're investing, relocating, or visiting — we're here to make your Rwanda experience seamless.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
          >
            Book Your Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
