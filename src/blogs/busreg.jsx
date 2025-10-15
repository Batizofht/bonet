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
      },
      {
        type: "heading",
        text: "Step-by-Step Registration Process"
      },
      {
        type: "paragraph",
        text: "The entire registration process can be completed online through the Rwanda Development Board (RDB) portal, typically within 24-48 hours for most business types."
      },
      {
        type: "heading",
        text: "Required Documents"
      },
      {
        type: "paragraph",
        text: "• National ID or passport copies for all directors\n• Proof of business address\n• Business name reservation certificate\n• Articles of association\n• Tax identification number application"
      },
      {
        type: "heading",
        text: "Costs and Fees"
      },
      {
        type: "paragraph",
        text: "Registration fees vary depending on your business type and capital. Most small to medium enterprises can expect to pay between $50-$200 for complete registration including all necessary permits."
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Business Registration Section */}
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
            Business <span className="bg-[#188bff] bg-clip-text text-transparent">Registration</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Streamlined process for registering your business with expert guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = icons[index] || FileText;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="text-center p-6 rounded-2xl bg-white border-2 border-blue-100 hover:border-[#188bff] transition-all duration-300 hover:shadow-xl group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-blue-100 text-[#188bff] rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold bg-[#188bff] bg-clip-text text-transparent">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
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
        <div className="relative h-64 bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-semibold">{blogArticle.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
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
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
              <button className="flex items-center gap-2 text-[#188bff] hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </button>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#188bff] transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-[#188bff] transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#188bff] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  Start Registration Today
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#188bff] text-[#188bff] px-6 py-3 rounded-xl font-semibold hover:bg-[#188bff] hover:text-white transition-all"
                >
                  Free Consultation
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessRegistration;