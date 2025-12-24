// app/blog/[slug]/page.tsx
'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, BookOpen, Share2, Facebook, Instagram, Linkedin, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Starting fetch for slug:', slug);
        
        const response = await axios.get(
          "https://api.bonet.rw:8443/bonetBackend/backend/public/blogs",
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

  // Update meta tags for social sharing (Open Graph)
  useEffect(() => {
    if (!blog) return;

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const baseUrl = currentUrl.includes('localhost') 
      ? 'https://www.bonet.rw' 
      : currentUrl.split('/blog/')[0] || 'https://www.bonet.rw';
    const fullUrl = `${baseUrl}/blog/${slug}`;
    
    // Get image URL
    const imageUrl = blog.image 
      ? `https://api.bonet.rw:8443/bonetBackend/public/${blog.image}`
      : 'https://www.bonet.rw/assets/images/logo.png';
    
    // Get description (strip HTML tags for meta description)
    const plainDescription = blog.description 
      ? blog.description.replace(/<[^>]*>/g, '').substring(0, 200)
      : blog.quote || 'Read this article on Bonet Elite Services';

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateNameTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Open Graph tags for Facebook and LinkedIn
    updateMetaTag('og:title', blog.title);
    updateMetaTag('og:description', plainDescription);
    updateMetaTag('og:image', imageUrl);
    updateMetaTag('og:url', fullUrl);
    updateMetaTag('og:type', 'article');
    updateMetaTag('og:site_name', 'Bonet Elite Services');

    // Twitter Card tags
    updateNameTag('twitter:card', 'summary_large_image');
    updateNameTag('twitter:title', blog.title);
    updateNameTag('twitter:description', plainDescription);
    updateNameTag('twitter:image', imageUrl);

    // Standard meta tags
    updateNameTag('description', plainDescription);
    
    // Update page title
    document.title = `${blog.title} | Bonet Elite Services`;

    // Cleanup function
    return () => {
      // Optionally remove meta tags on unmount, but usually we want to keep them
    };
  }, [blog, slug]);

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

  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      // If on localhost, use production URL for sharing (previews won't work on localhost anyway)
      if (currentUrl.includes('localhost')) {
        return `https://www.bonet.rw/blog/${slug}`;
      }
      return currentUrl;
    }
    return `https://www.bonet.rw/blog/${slug}`;
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(getCurrentUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  const shareToInstagram = async () => {
    // Instagram doesn't support direct URL sharing via web
    // Copy URL to clipboard for user to paste in Instagram
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(getCurrentUrl());
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = getCurrentUrl();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(getCurrentUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const url = encodeURIComponent(getCurrentUrl());
    const text = encodeURIComponent(`Check out this article: ${blog.title}`);
    // Use api.whatsapp.com for better cross-platform support
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
  };

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
          
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#188bff] text-white rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            aria-label="Share article"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        {blog.image && (
          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl border border-blue-100">
            <img
              src={`https://api.bonet.rw:8443/bonetBackend/public/${blog.image}`}
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

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowShareModal(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  {/* Modal Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <Share2 className="w-6 h-6 text-[#188bff]" />
                    <h2 className="text-2xl font-bold text-gray-800">Share this article</h2>
                  </div>
                  
                  {/* Share Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={shareToFacebook}
                      className="flex flex-col items-center gap-2 p-4 bg-[#1877F2] text-white rounded-xl hover:bg-[#166FE5] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                      <span className="font-medium text-sm">Facebook</span>
                    </button>
                    
                    <button
                      onClick={shareToInstagram}
                      className={`flex flex-col items-center gap-2 p-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${copied ? 'ring-2 ring-green-400' : ''}`}
                      aria-label="Share on Instagram"
                    >
                      <Instagram className="w-6 h-6" />
                      <span className="font-medium text-sm">
                        {copied ? 'Copied!' : 'Instagram'}
                      </span>
                    </button>
                    
                    <button
                      onClick={shareToLinkedIn}
                      className="flex flex-col items-center gap-2 p-4 bg-[#0077B5] text-white rounded-xl hover:bg-[#006399] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-6 h-6" />
                      <span className="font-medium text-sm">LinkedIn</span>
                    </button>
                    
                    <button
                      onClick={shareToWhatsApp}
                      className="flex flex-col items-center gap-2 p-4 bg-[#25D366] text-white rounded-xl hover:bg-[#20BA5A] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      aria-label="Share on WhatsApp"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-medium text-sm">WhatsApp</span>
                    </button>
                  </div>
                  
                  {/* Copy URL Section */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Or copy link</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={getCurrentUrl()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                      />
                      <button
                        onClick={shareToInstagram}
                        className={`px-4 py-2 bg-[#188bff] text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium ${copied ? 'bg-green-500 hover:bg-green-600' : ''}`}
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}