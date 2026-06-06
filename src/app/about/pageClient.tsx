"use client"
import React, { lazy, Suspense } from "react";
import Link from "next/link";

// Lazy load components
const SecondService = lazy(() => import("../../services/secondservice"));
const MissionVision = lazy(() => import("../../aboutUs/mission"));
const Team = lazy(() => import("../../aboutUs/Team"));
const Testimonials = lazy(() => import("../../components/reviews"));

export default function AboutPageClient() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="h-[60vh] bg-gray-900" />}>
        <SecondService />
      </Suspense>

      <Suspense fallback={<div className="h-40 bg-white" />}>
        <MissionVision />
      </Suspense>

      <Suspense fallback={<div className="h-40 bg-gray-50" />}>
        <Team />
      </Suspense>

      <section className="bg-gray-900 pt-20 pb-28 lg:pt-28 lg:pb-36">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Get Started</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Ready to Work With Bonet Elite?
          </h2>
          <p className="text-white/75 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are registering a company, relocating your team, or planning an executive visit — we are here to make it seamless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* <Suspense fallback={<div className="h-40 bg-white" />}>
        <Testimonials />
      </Suspense> */}
    </div>
  );
}
