import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import { slugify } from "../../slugify";
import axios from "axios";
import Link from "next/link";
import { Calendar, Clock, BookOpen, Sparkles, ArrowRight } from "lucide-react";

interface Blog {
  image: string;
  title: string;
  quote: string;
  created_at?: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>("");
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s/g).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <motion.section
      className="py-16 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {/* BLOG HEADER - SAME DESIGN AS BEFORE */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <BookOpen className="w-6 h-6 text-[#188bff] animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Latest <span className="bg-[#188bff] bg-clip-text text-transparent">Insights</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Discover valuable articles and updates from our experts
        </p>
      </div>

      {/* Loader/Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-8 h-8 text-[#188bff] animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg">{t("blog.loading")}</p>
        </div>
      )}
      
      {error && (
        <p className="text-center text-red-500 font-semibold py-8">{error}</p>
      )}
      
      {!loading && blogs.length === 0 && !error && (
        <p className="text-center text-gray-500 py-8">{t("blog.noPosts")}</p>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post, index) => (
          <motion.article
            key={index}
            className="bg-white rounded-2xl overflow-hidden border border-blue-50 hover:border-[#188bff] transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Blog Image */}
            <div className="relative overflow-hidden">
              <img
                src={`https://switchiify.com/bonetProject/backend/public/${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>{post.created_at ? formatDate(post.created_at) : 'Recent'}</span>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#188bff] transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.quote}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{getReadingTime(post.quote)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>Blog</span>
                  </div>
                </div>
              </div>

              {/* Read More Button */}
              <Link 
                href={`/blog/${slugify(post.title)}`}
                className="inline-flex items-center gap-2 text-[#188bff] font-semibold text-sm group/btn hover:gap-3 transition-all duration-300"
              >
                Read More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* View All Blogs CTA */}
      {blogs.length > 0 && (
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* <Link
            href="/blog"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#188bff] to-cyan-400 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold group/cta"
          >
            <BookOpen className="w-5 h-5" />
            View All Articles
            <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform" />
          </Link> */}
        </motion.div>
      )}
    </motion.section>
  );
}