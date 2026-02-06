"use client"
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import FirstHome from "../components/firsthome";

// Lazy load below-the-fold components - CRITICAL for performance
const Services = dynamic(() => import("../components/services"), { ssr: false });
const WhyChooseBonet = dynamic(() => import("../services/whychoose"), { ssr: false });
const NewExperience = dynamic(() => import("../aboutUs/newexperience"), { ssr: false });
const Gallery = dynamic(() => import("../components/visitrwanda"), { ssr: false });
const GreatSoftware = dynamic(() => import("../components/greatSoftware"), { ssr: false });
const FeaturedResources = dynamic(() => import("../components/resources"), { ssr: false });
const FAQ = dynamic(() => import("../components/footer"), { ssr: false });

export default function HomePageClient() {
  return (
    <div className="min-h-screen">
      {/* Above the fold - load immediately */}
      <FirstHome />
      
      {/* Below the fold - lazy load with better fallback */}
      <Suspense fallback={<div className="h-96 bg-gradient-to-b from-white to-blue-50/30 animate-pulse" />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse" />}>
        <WhyChooseBonet />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-white animate-pulse" />}>
        <NewExperience />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-gray-50 animate-pulse" />}>
        <Gallery />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-white animate-pulse" />}>
        <GreatSoftware />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse" />}>
        <FeaturedResources />
      </Suspense>
      
      <Suspense fallback={<div className="h-40 bg-white animate-pulse" />}>
        <FAQ />
      </Suspense>
    </div>
  );
}
