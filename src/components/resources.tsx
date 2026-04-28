'use client'
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { slugify } from "../../slugify";
import axios from "axios";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

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

  useEffect(() => {
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

  useEffect(() => {
    if (!isVisible) return;
    
    let isMounted = true;
    
    const fetchBlogs = async () => {
      try {
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

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 max-w-6xl mx-auto"
    > 
      {/* BLOG HEADER */}
      <div className="text-center mb-16">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          Resources
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t("blog.header.title1")} <span className="text-[#C9A84C]">{t("blog.header.title2")}</span>
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {t("Discover valuable articles and updates from our experts")}
        </p>
      </div>

      {/* Loader/Error States */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <p className="text-center text-red-500 font-semibold py-8">{error}</p>
      )}
      
      {!loading && blogs.length === 0 && !error && (
        <p className="text-center text-gray-500 py-8">{t("blog.noPosts")}</p>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {blogs.map((post, index) => (
          <article
            key={index}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-300/30 hover:border-[#C9A84C]/30 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
          >
            {/* Blog Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={`https://api.bonet.rw:8443/bonetBackend/public/${post.image}`}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Date Badge - Top Left */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span className="font-medium">{post.created_at ? formatDate(post.created_at) : 'Recent'}</span>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="p-5 md:p-6">
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#C9A84C] transition-colors duration-300 line-clamp-2 leading-snug">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                {post.quote}
              </p>

              {/* Read More Link */}
              <Link
                href={`/blog/${slugify(post.title)}`}
                className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm group/btn hover:gap-3 transition-all duration-300"
              >
                Read Article
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* View All Blogs CTA */}
      {blogs.length > 0 && (
        <div className="text-center mt-12">
          <Link href="/blogs">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors shadow-lg hover:shadow-xl">
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}