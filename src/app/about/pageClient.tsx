"use client"
import React, { lazy, Suspense } from "react";

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

      <Suspense fallback={<div className="h-40 bg-white" />}>
        <Testimonials />
      </Suspense>
    </div>
  );
}
