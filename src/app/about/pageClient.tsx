"use client"
import React, { lazy, Suspense } from "react";

// Lazy load components
const SecondService = lazy(() => import("../../services/secondservice"));
const MissionVision = lazy(() => import("../../aboutUs/mission"));
const WhyChooseBonet = lazy(() => import("../../services/whychoose"));
const NewExperience = lazy(() => import("../../aboutUs/newexperience"));
const Testimonials = lazy(() => import("../../components/reviews"));
const Gallery = lazy(() => import("../../components/visitrwanda"));


export default function AboutPageClient() {
  return (
    <div className="min-h-screen">
      <Suspense >
        <SecondService />
        <MissionVision />
        <WhyChooseBonet />
        <NewExperience />
        <Testimonials />
        <Gallery />
      </Suspense>

    </div>
  );
}
