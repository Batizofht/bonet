"use client"
import React from "react";
import SecondService from "../../services/secondservice";
import MissionVision from "../../aboutUs/mission";
import WhyChooseBonet from "../../services/whychoose";
import NewExperience from "../../aboutUs/newexperience";
import Testimonials from "../../components/reviews";
import Gallery from "../../components/visitrwanda";


export default function AboutPageClient() {
  return (
    <div className="min-h-screen">
      <SecondService />
      <MissionVision />
      <WhyChooseBonet />
      <NewExperience />
      <Testimonials />
      <Gallery />

    </div>
  );
}
