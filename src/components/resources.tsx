'use client'
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { slugify } from "../../slugify";
import axios from "axios";
import Link from "next/link";
import { Calendar, Clock, BookOpen, Sparkles, ArrowRight, Eye } from "lucide-react";

interface Blog {
  image: string;
  title: string;
  quote: string;
  created_at?: string;
  view_count?: number;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  // OPTIMIZED: Only fetch when component is visible (below fold)
  useEffect(() => {
    // Intersection Observer to delay API call until visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch only when visible
  useEffect(() => {
    if (!isVisible) return;
    
    let isMounted = true;
    
    const fetchBlogs = async () => {
      try {
        // Delay API call by 500ms to prioritize render
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!isMounted) return;
        
        const response = await axios.get(
          "https://api.bonet.rw:8443/bonetBackend/backend/public/blogshome"
        );
        const blogArray = Array.isArray(response.data.data)
          ? response.data.data
          : response.data.data || [];
        setBlogs(blogArray);
      } catch (err) {
        if (isMounted) {
          setError("Failed to load blogs.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();
    
    return () => {
      isMounted = false;
    };
  }, [isVisible]);

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
    <section
      ref={sectionRef}
      className="py-16 px-4 max-w-6xl mx-auto"
    > 
      {/* BLOG HEADER - SAME DESIGN AS BEFORE */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <BookOpen className="w-6 h-6 text-[#188bff]"></BookOpen>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {t("blog.header.title1")} <span className="bg-[#188bff] bg-clip-text text-transparent">{t("blog.header.title2")}</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          {t("Discover valuable articles and updates from our experts")}
        </p>
      </div>

      {/* Loader/Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-8 h-8 text-[#188bff]" />
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
          <article
            key={index}
            className="bg-white rounded-2xl overflow-hidden border border-blue-50 hover:border-[#188bff] transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-2 hover:scale-105"
          >
            {/* Blog Image */}
            <div className="relative overflow-hidden">
              <img
                src={`https://api.bonet.rw:8443/bonetBackend/public/${post.image}`}
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
                  {/* View Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Eye className="w-3 h-3" />
                  <span>{post.created_at ? post.view_count: 'Recent'}</span>
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
  
              {/* Read More Button */}
              <Link 
                href={`/blog/${slugify(post.title)}`}
                className="inline-flex items-center gap-2 text-[#188bff] font-semibold text-sm group/btn hover:gap-3 transition-all duration-300"
              >
                {t("blog.readMore")}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform mt-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* View All Blogs CTA */}
      {blogs.length > 0 && (
        <div className="text-center mt-12">
   
        </div>
      )}
    </section>
  );
}