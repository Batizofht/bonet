"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { 
  Calendar,
  Clock,
  User,
} from "lucide-react";
import Link from "next/link";

const BusinessRegistration = () => {
  const { t } = useTranslation();

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
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Business Registration Section */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Our <span className="text-[#C9A84C]">Major Services</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Professional solutions tailored for your business success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="text-left p-8 rounded-2xl bg-white border border-gray-200/30 hover:border-[#C9A84C]/40 transition-colors duration-300"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="text-left space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <Link href={`/${service.link}`}>
                    <button className="px-4 py-2 bg-[#C9A84C] text-white text-sm font-medium rounded-full hover:bg-[#B8973B] transition-colors duration-300">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Single Blog Article Section */}
      <div className="bg-white rounded-3xl border border-gray-200/30 overflow-hidden">
        {/* Blog Header */}
        <div className="relative h-75 md:h-64 bg-black/70 flex items-center justify-center">
          <div className="text-center text-white p-8">
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
                <div
                  key={index}
                  className="mb-6"
                >
                  {section.type === "heading" ? (
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
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
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200/30 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Need Help With Business Registration?
              </h3>

              <p className="text-gray-600 mb-4">
                Let our experts handle the entire registration process for you. 
                We ensure compliance with all regulations and save you time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/investment">
                  <button className="bg-[#C9A84C] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#B8973B] transition-colors">
                    Start Registration Today
                  </button>
                </Link>
                <Link href="/consulting">
                  <button className="border border-gray-300 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-colors">
                    Free Consultation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessRegistration;