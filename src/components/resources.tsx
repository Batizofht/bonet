import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import { slugify } from "../../slugify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";
import { MapPin, Navigation } from "lucide-react";

interface Blogs{
  image:string;
  title:string;
  quote: string
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>("");
  const navigate = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out", once: true });
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://switchiify.com/bonetProject/backend/public/blogs"
      );
      const blogArray = Array.isArray(response.data.data)
        ? response.data.data
        : response.data.data || [];
      setBlogs(blogArray);
    } catch (err) {
      setError("Failed to load blogs. Please try again later.");
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <motion.section
      className="py-16 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {/* EXACT SAME HEADER AS BLOG SECTION */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <MapPin className="w-6 h-6 text-[#188bff] animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="text-gray-600">{t("locationSection.title").split(" ")[0]}</span>{" "}
          <span className="bg-[#188bff] bg-clip-text text-transparent">
            {t("locationSection.title").split(" ")[1]}
          </span>
        </h2>
     
        <p className="text-gray-500 text-lg">Find us easily at our convenient location</p>
      </div>

      {/* Map Container */}
      <motion.div 
        className="bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
        whileHover={{ y: -5, scale: 1.01 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="relative overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3078.896987330303!2d30.12271957358988!3d-1.9494688367076565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca76e7bf4e2d3%3A0xa45692b805f13796!2sKimironko%20Bus%20Station!5e1!3m2!1sen!2srw!4v1742228259950!5m2!1sen!2srw"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[500px] transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <Navigation className="w-5 h-5 text-[#188bff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Location Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#188bff] transition-colors">
            Our Main Office
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Kimironko Bus Station Area, Kigali, Rwanda
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Easy to find</span>
            </div>
            <div className="flex items-center gap-1">
              <Navigation className="w-3 h-3" />
              <span>Free parking</span>
            </div>
          </div>

          {/* Directions Button */}
          <Link href={"/contact"}>
              <button className="inline-flex items-center gap-2 bg-[#188bff] text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold text-sm group/btn shadow-sm hover:shadow-md">
            Get Directions
            <Navigation className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
          </Link>
      
        </div>
      </motion.div>
    </motion.section>
  );
};


