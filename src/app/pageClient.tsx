"use client"
import React, { Suspense, lazy } from "react";
import FirstHome from "../components/firsthome";

// Lazy load below-the-fold components - CRITICAL for performance
const Services = lazy(() => import("../components/services"));
const WhyChooseBonet = lazy(() => import("../services/whychoose"));
const NewExperience = lazy(() => import("../aboutUs/newexperience"));
const Gallery = lazy(() => import("../components/visitrwanda"));
const GreatSoftware = lazy(() => import("../components/greatSoftware"));
const FeaturedResources = lazy(() => import("../components/resources"));
const FAQ = lazy(() => import("../components/footer"));

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
