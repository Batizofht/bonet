"use client"
import React from "react";
import Navbar from "../components/navbar";
import FirstHome from "../components/firsthome";
import Services from "../components/services";
import WhyChooseBonet from "../services/whychoose";
import NewExperience from "../aboutUs/newexperience";
import Gallery from "../components/visitrwanda";
import GreatSoftware from "../components/greatSoftware";
import FeaturedResources from "../components/resources";
import FAQ from "../components/footer";


export default function HomePageClient() {
  return (
    <div className="bg-white min-h-screen text-center">
    
      <FirstHome />
      <Services />
      <WhyChooseBonet />
      <NewExperience />
      <Gallery />
      <GreatSoftware />
      <FeaturedResources />
      <FAQ />
    </div>
  );
}
