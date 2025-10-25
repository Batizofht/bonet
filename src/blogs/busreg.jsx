"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Building, 
  ClipboardList, 
  Award,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark
} from "lucide-react";
// Import these icons or use your preferred ones
import { Plane, Briefcase } from 'lucide-react';
import Link from "next/link";

const serviceIcons = [Plane, Building, Users, Briefcase];
const BusinessRegistration = () => {
  const { t } = useTranslation();
  const steps = t("businessRegistration.steps", { returnObjects: true });

  const icons = [FileText, Users, CheckCircle, Building, ClipboardList, Award];

  const blogArticle = {
    title: "Complete Guide to Business Registration in Rwanda: 2024 Edition",
    author: "Bonet Business Team",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Business Setup",
    image: "../assets/images/business-guide.jpg",
    content: [
      {
        type: "paragraph",
        text: "Starting a business in Rwanda has never been easier with the government's continued efforts to streamline the registration process. This comprehensive guide will walk you through every step needed to legally establish your business in Rwanda."
      },
      {
        type: "heading",
        text: "Why Register Your Business in Rwanda?"
      },
      {
        type: "paragraph",
        text: "Rwanda ranks among the easiest places to do business in Africa, thanks to its efficient registration system, favorable tax policies, and strong support for entrepreneurs. Registered businesses gain access to legal protection, banking services, and government incentives."
      }
    ]
  };
const services = [
  {
    title: "Travel & Hospitality",
    description: "Comprehensive travel solutions and hospitality services to enhance your business operations and customer experiences.",
    features: [
      "Business travel management",
      "Hotel & accommodation services",
      "Event planning & coordination",
      "VIP hospitality services"
    ],
    link:"travel"
  },

  {
    title: "Business Setup",
    description: "End-to-end business establishment services to launch your venture smoothly in any jurisdiction.",
    features: [
      "Company registration",
      "Legal documentation",
      "License acquisition",
      "Bank account setup"
    ],
    link:"investment"
  },
  {
    title: "Business Consulting",
    description: "Strategic consulting services to optimize your business processes and drive sustainable growth.",
    features: [
      "Strategic planning",
      "Process optimization",
      "Market analysis",
      "Performance improvement"
    ],
    link:"consulting"
  },
  {
    title: "HR & Admin Support",
    description: "Complete human resources and administrative support to streamline your organizational operations.",
    features: [
      "Recruitment & staffing",
      "Payroll management",
      "Employee relations",
      "Admin workflow optimization"
    ],
    link:"hrsupport"
  }
];


  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Business Registration Section */}
      <div className="mb-20">
      <div className="mb-20">
  <div className="text-center mb-16">
    <div className="flex justify-center items-center gap-3 mb-4">
      <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
      <Building className="w-6 h-6 text-[#188bff] animate-pulse" />
      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
      <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
    </div>
    
    <h2 className="text-4xl font-bold text-gray-800 mb-4">
      Our <span className="bg-[#188bff] bg-clip-text text-transparent">Major Services</span>
    </h2>
    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
      Professional solutions tailored for your business success
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {services.map((service, index) => {
      const IconComponent = serviceIcons[index] || FileText;
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="text-center p-8 rounded-2xl bg-white border-2 border-blue-50 hover:border-[#188bff] transition-all duration-300 hover:shadow-xl group cursor-pointer relative overflow-hidden"
        >
          {/* Background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#188bff] to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          <div className="absolute inset-[2px] rounded-2xl bg-white -z-10"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#188bff] transition-colors duration-300">
              {service.title}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {service.description}
            </p>

            {/* Features list */}
            <ul className="text-left space-y-2 mb-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-1.5 h-1.5 bg-[#188bff] rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <Link href={`/${service.link}`}>
           
            <button className="px-4 py-2 bg-gradient-to-r from-[#188bff] to-cyan-400 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
              Learn More
            </button>
             </Link>
          </div>
        </motion.div>
      );
    })}
  </div>
</div>
      </div>

      {/* Single Blog Article Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl border-2 border-blue-100 overflow-hidden shadow-xl"
      >
        {/* Blog Header */}
        <div className="relative h-75 md:h-64  bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-semibold">{blogArticle.category}</span>
            </div>
            <h1 className="text-lg md:text-4xl font-bold mb-4">
              {blogArticle.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blogArticle.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blogArticle.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blogArticle.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
        

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {blogArticle.content.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-6"
                >
                  {section.type === "heading" ? (
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8 bg-gradient-to-r from-[#188bff] to-cyan-500 bg-clip-text text-transparent">
                      {section.text}
                    </h3>
                  ) : (
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {section.text.split('\n').map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < section.text.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-100 text-center"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Need Help With Business Registration?
              </h3>
              <p className="text-gray-600 mb-4">
                Let our experts handle the entire registration process for you. 
                We ensure compliance with all regulations and save you time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/investment">
            
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#188bff] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  Start Registration Today
                </motion.button>    </Link>
                <Link href="/consulting">
             
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#188bff] text-[#188bff] px-6 py-3 rounded-xl font-semibold hover:bg-[#188bff] hover:text-white transition-all"
                >
                  Free Consultation
                </motion.button>   </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessRegistration;