// app/blog/[slug]/page.tsx
'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  image?: string;
  quote?: string;
  description?: string;
  created_at?: string;
  author?: string;
}

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Starting fetch for slug:', slug);
        
        const response = await axios.get(
          "https://api.bonet.rw/bonetBackend/backend/public/blogs",
          {
            timeout: 10000,
          }
        );

        console.log('📦 Full API response:', response);
        
        // Store debug info
        setDebugInfo({
          slug: slug,
          responseStatus: response.status,
          responseData: response.data,
          dataStructure: Object.keys(response.data),
          hasDataArray: Array.isArray(response.data?.data),
          dataLength: response.data?.data?.length || 0,
          allTitles: response.data?.data?.map((b: Blog) => b.title) || []
        });

        // Check if response has the expected structure
        if (!response.data) {
          throw new Error('No data in response');
        }

        // Handle different possible response structures
        const blogsArray = response.data.data || response.data.blogs || response.data;
        
        if (!Array.isArray(blogsArray)) {
          throw new Error('Blogs data is not an array');
        }

        console.log('📝 All blog titles:', blogsArray.map((b: Blog) => b.title));
        console.log('🔄 Looking for slug:', slug);

        const foundBlog = blogsArray.find((item: Blog) => {
          if (!item.title) return false;
          
          const blogSlug = item.title.toLowerCase().replace(/\s+/g, "-");
          console.log('🔍 Comparing:', blogSlug, '===', slug, '->', blogSlug === slug);
          return blogSlug === slug;
        });

        console.log('✅ Found blog:', foundBlog);

        if (!foundBlog) {
          // Try alternative slug formats
          const alternativeBlog = blogsArray.find((item: Blog) => {
            if (!item.title) return false;
            
            // Try different slug formats
            const formats = [
              item.title.toLowerCase().replace(/\s+/g, "-"),
              item.title.toLowerCase().replace(/\s+/g, "_"),
              item.title.toLowerCase(),
              item.title
            ];
            
            return formats.includes(slug);
          });
          
          if (alternativeBlog) {
            console.log('🎉 Found blog with alternative format:', alternativeBlog);
            setBlog(alternativeBlog);
            return;
          }
          
          throw new Error(`No blog found with slug: ${slug}. Available slugs: ${blogsArray.map((b: Blog) => b.title?.toLowerCase().replace(/\s+/g, "-")).join(', ')}`);
        }

        setBlog(foundBlog);
      } catch (err: any) {
        console.error('❌ Error fetching blog:', err);
        setError(err.message || 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#188bff] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
          {debugInfo && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">Debug: {JSON.stringify(debugInfo)}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-4">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
          
          {debugInfo && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
              <h3 className="font-bold mb-2">Debug Information:</h3>
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[#188bff] text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const getReadingTime = (text: string) => {
    if (!text) return '2 min read';
    const wordsPerMinute = 200;
    const words = text.split(/\s/g).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recent';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  const processHTMLContent = (html: string) => {
    if (!html) return '';
    
    return html
      .replace(/<p>/g, '<p class="">')
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-gray-800 ">')
      .replace(/<\/h1>/g, '</h1>')
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-gray-800 ">')
      .replace(/<\/h2>/g, '</h2>')
      .replace(/<h3>/g, '<h3 class="text-xl font-bold text-gray-800 ">')
      .replace(/<\/h3>/g, '</h3>')
      .replace(/<ul>/g, '<ul class="list-disc list-inside ">')
      .replace(/<\/ul>/g, '</ul>')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside ">')
      .replace(/<\/ol>/g, '</ol>')
      .replace(/<li>/g, '<li class="text-gray-700">')
      .replace(/<\/li>/g, '</li>')
      .replace(/<strong>/g, '<strong class="font-semibold text-gray-800">')
      .replace(/<\/strong>/g, '</strong>')
      .replace(/<em>/g, '<em class="italic text-gray-700">')
      .replace(/<\/em>/g, '</em>')
      .replace(
        /<blockquote>/g,
        '<blockquote class="border-l-4 border-[#188bff] pl-4 italic text-gray-600 ">'
      )
      .replace(/<\/blockquote>/g, '</blockquote>');
  };

  const htmlDescription = processHTMLContent(blog.description || '');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 pb-8 pt-8">
    

        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 text-center leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#188bff]" />
            <span className="text-sm font-medium">
              {formatDate(blog.created_at || '')}
            </span>
          </div>
          
          {/* <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#188bff]" />
            <span className="text-sm font-medium">
              {getReadingTime(blog.description || blog.quote || '')}
            </span>
          </div> */}
          
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#188bff]" />
            <span className="text-sm font-medium">
              {blog.author || 'Bonet Team'}
            </span>
          </div>
        </div>

        {blog.image && (
          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl border border-blue-100">
            <img
              src={`https://api.bonet.rw/bonetBackend/backend/public/${blog.image}`}
              alt={blog.title}
              className="w-full h-[400px] object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        )}

        {blog.quote && (
          <blockquote className="relative bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-8 mb-8 text-center">
            <p className="text-2xl font-semibold text-white leading-relaxed italic">
              "{blog.quote}"
            </p>
          </blockquote>
        )}

        <article className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-50">
            {blog.description ? (
              <div
                className="leading-relaxed text-gray-700 text-lg"
                dangerouslySetInnerHTML={{ __html: htmlDescription }}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No content available for this blog post.</p>
              </div>
            )}
          </div>
        </article>

        <div className="flex justify-center mt-12 pt-8 border-t border-blue-100">

        </div>
      </div>
    </div>
  );
}