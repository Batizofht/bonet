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
      <div className="text-center mb-10 lg:mb-14">
        <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-3">{t("blog.resourcesLabel")}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
          {t("blog.resourcesTitle")}
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          {t("blog.resourcesDesc")}
        </p>
      </div>

      {/* Loader/Error States */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-100 animate-pulse"></div>
              <div className="p-5 space-y-3">
                <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {blogs.map((post, index) => (
          <article
            key={index}
            className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
          >
            {/* Blog Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={`https://api.bonet.rw:8443/bonetBackend/public/${post.image}`}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Date Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-md px-2.5 py-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Calendar className="w-3 h-3 text-[#C9A84C]" />
                  <span className="font-medium">{post.created_at ? formatDate(post.created_at) : 'Recent'}</span>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="p-5">
              {/* Title */}
              <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                {post.quote}
              </p>

              {/* Read More Link */}
              <Link
                href={`/blog/${slugify(post.title)}`}
                className="inline-flex items-center gap-1.5 text-[#C9A84C] font-semibold text-sm hover:gap-2 transition-all"
              >
                {t("blog.readArticle")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* View All Blogs CTA */}
      {blogs.length > 0 && (
        <div className="text-center mt-12">
          <Link href="/blogs">
            <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors">
              {t("blog.viewAllArticles")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}