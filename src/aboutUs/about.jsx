"use client"
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBuilding, FaUsers } from 'react-icons/fa'; // Icons for services

const AboutUs = () => {
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleExpand = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    const cardData = [
        {
            icon: <FaMapMarkerAlt className="w-16 h-16 text-[#57007B]" />, 
            title: "Local Expertise",
            shortDesc: "Deep understanding of Rwanda’s tourism & business environment.",
            longDesc: "With years of experience in the Rwandan tourism and business landscape, we provide expert guidance to ensure seamless experiences for visitors and businesses alike."
        },
        {
            icon: <FaBuilding className="w-16 h-16 text-[#57007B]" />, 
            title: "One-Stop Solution",
            shortDesc: "All services under one roof for convenience.",
            longDesc: "From travel arrangements to corporate solutions, we streamline your needs into a single, efficient process, saving you time and effort."
        },
        {
            icon: <FaUsers className="w-16 h-16 text-[#57007B]" />, 
            title: "Professional & Reliable",
            shortDesc: "A dedicated team ensuring top-quality service.",
            longDesc: "Our team of professionals is committed to delivering exceptional service, ensuring reliability and satisfaction in every interaction."
        }
    ];

    return (
        <div className="w-full flex flex-col bg-white">
            {/* Full-Screen Hero Section */}
            <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/hero-bg.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-6">
                    <div className="max-w-3xl">
                        <div className="bg-[#188bff] inline-block text-transparent bg-clip-text">
                            <h1 className="text-4xl lg:text-4xl xl:text-4xl font-bold capitalize leading-tight">
                                AI-Powered Business Automation & Optimization
                            </h1>
                        </div>
                        <p className="text-lg text-gray-200 mt-4">
                            We specialize in AI-driven solutions that enhance automation, improve customer experience, and streamline operations.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Bonet Elite Services Section */}
            <div className="flex flex-col justify-center p-4 w-full md:w-11/12 lg:w-10/12 xl:w-9/12 pt-10 items-start gap-16 mx-auto">
                <div className="text-center w-full">
                    <h2 className="text-2xl xl:text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent">
                        <span className="text-gray-700">Why Choose Bonet</span> Elite Services?
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {cardData.map((card, index) => (
                        <div 
                            key={index}
                            className={`p-6 bg-white border border-gray-500 shadow-lg rounded-lg flex flex-col items-center text-center gap-4 cursor-pointer transition-all duration-500 ${expandedCard === index ? 'h-auto' : 'h-[250px]'}`}
                            onClick={() => toggleExpand(index)}
                        >
                            {card.icon}
                            <h3 className="text-xl font-bold bg-[#188bff] bg-clip-text text-transparent">
                                {card.title}
                            </h3>
                            <p className="text-zinc-600 text-sm">
                                {expandedCard === index ? card.longDesc : card.shortDesc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
