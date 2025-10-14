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
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <BookOpen className="w-6 h-6 text-[#188bff] animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="text-gray-600">{t("blog.header.title1")}</span>{" "}
          <span className="bg-[#188bff] bg-clip-text text-transparent">
            {t("blog.header.title2")}
          </span>
        </h2>
        <p className="text-gray-500 text-lg">Discover insightful articles and travel tips</p>
      </div>

      {/* Loader/Error */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-[#188bff] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#188bff] rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-[#188bff] rounded-full animate-bounce delay-200"></div>
          </div>
          <p className="mt-2 text-gray-600">{t("blog.loading")}</p>
        </div>
      )}
      
      {error && (
        <p className="text-center text-red-500 font-semibold py-8">{error}</p>
      )}
      
      {!loading && blogs.length === 0 && !error && (
        <p className="text-center text-gray-500 py-8">{t("blog.noPosts")}</p>
      )}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl overflow-hidden border border-blue-100 hover:border-[#188bff] transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={`https://switchiify.com/bonetProject/backend/public/${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <Sparkles className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#188bff] transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.quote}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Just now</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>5 min read</span>
                </div>
              </div>

              {/* Read More Button */}
              <Link
                href={`/blog/${slugify(post.title)}`}
                className="inline-flex items-center gap-2 bg-[#188bff] text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold text-sm group/btn shadow-sm hover:shadow-md"
              >
                {t("blog.readMore")}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}