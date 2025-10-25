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
    <div className="bg-white min-h-screen text-center text-white">
      <SecondService />
      <MissionVision />
      <WhyChooseBonet />
      <NewExperience />
      <Testimonials />
      <Gallery />

    </div>
  );
}
