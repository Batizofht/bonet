"use client"
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import FirstHome from "../components/firsthome";
import Services from "../components/services";

// Lazy load below-the-fold components
const WhyChooseBonet = dynamic(() => import("../services/whychoose"), { ssr: false });
const NewExperience = dynamic(() => import("../aboutUs/newexperience"), { ssr: false });
const Gallery = dynamic(() => import("../components/visitrwanda"), { ssr: false });
const GreatSoftware = dynamic(() => import("../components/greatSoftware"), { ssr: false });
const FeaturedResources = dynamic(() => import("../components/resources"), { ssr: false });
const FAQ = dynamic(() => import("../components/footer"), { ssr: false });

export default function HomePageClient() {
  return (
    <div className="min-h-screen">
      <FirstHome />
      <Services />
      <Suspense fallback={<div className="h-40" />}>
        <WhyChooseBonet />
      </Suspense>
      <Suspense fallback={<div className="h-40" />}>
        <NewExperience />
      </Suspense>
      <Suspense fallback={<div className="h-40" />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<div className="h-40" />}>
        <GreatSoftware />
      </Suspense>
      <Suspense fallback={<div className="h-40" />}>
        <FeaturedResources />
      </Suspense>
      <Suspense fallback={<div className="h-40" />}>
        <FAQ />
      </Suspense>
    </div>
  );
}
