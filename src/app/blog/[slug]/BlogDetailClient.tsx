"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Calendar, User, ArrowLeft, HandMetal } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Head from 'next/head';
import SocialShare from "../../../components/SocialShare";

interface Blog {
  id: number;
  title: string;
  image?: string;
  quote?: string;
  description?: string;
  created_at?: string;
  author?: string;
}

export default function BlogDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Add these state variables after your existing states
  const [claps, setClaps] = useState(0);
  const [userClapped, setUserClapped] = useState(false);
  const [clapping, setClapping] = useState(false);
  const [views, setViews] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          "https://api.bonet.rw:8443/bonetBackend/backend/public/blogs",
          { timeout: 10000 }
        );

        if (!response.data) {
          throw new Error('No data in response');
        }

        const blogsArray = response.data.data || response.data.blogs || response.data;
        
        if (!Array.isArray(blogsArray)) {
          throw new Error('Blogs data is not an array');
        }

        const foundBlog = blogsArray.find((item: Blog) => {
          if (!item.title) return false;
          
          const blogSlug = item.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
          
          return blogSlug === slug;
        });

        if (!foundBlog) {
          const alternativeBlog = blogsArray.find((item: Blog) => {
            if (!item.title) return false;
            
            const normalizedSlug = item.title
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .trim();
            
            const formats = [normalizedSlug, item.title];
            return formats.includes(slug);
          });
          
          if (alternativeBlog) {
            setBlog(alternativeBlog);
            return;
          }
          
          throw new Error(`No blog found with slug: ${slug}`);
        }

        setBlog(foundBlog);
      } catch (err: any) {
        setError(err.message || 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  // Generate unique device ID
  const getDeviceId = () => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      // Create a unique device fingerprint
      const fingerprint = [
        navigator.userAgent,
        navigator.language,
        navigator.platform,
        screen.width,
        screen.height,
        screen.colorDepth,
        new Date().getTime(),
        Math.random().toString(36).substr(2, 9)
      ].join('|');
      
      // Create hash
      const hash = btoa(fingerprint).substring(0, 32);
      deviceId = `device_${hash}`;
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  };

  // Fix the fetch function to check localStorage for userClapped state
  useEffect(() => {
    const fetchClapsAndViews = async () => {
      if (!blog?.id) return;

      try {
        const deviceId = getDeviceId();
        
        // Fetch claps data from SERVER
        const clapsResponse = await axios.get(
          `https://api.bonet.rw:8443/bonetBackend/backend/public/clappings?blog=${blog.id}`
        );

        if (clapsResponse.data) {
          setClaps(clapsResponse.data.total_claps || 0);
        }
        console.log(clapsResponse.data);

        // Check LOCAL storage if this device has clapped
        const hasClapped = localStorage.getItem(`blog_${blog.id}_clapped`) === 'true';
        setUserClapped(hasClapped);

        // Fetch views data from SERVER
        const viewsResponse = await axios.get(
          `https://api.bonet.rw:8443/bonetBackend/backend/public/views?blog=${blog.id}`
        );

        if (viewsResponse.data) {
          setViews(viewsResponse.data.views || 0);
        }
      } catch (err) {
        console.error('Error fetching claps/views:', err);
      }
    };

    if (blog?.id) {
      fetchClapsAndViews();
      trackView();
    }
  }, [blog?.id]);

  // Handle clap function - Toggle like/unlike
  const handleClap = async () => {
    if (!blog?.id || clapping) return;

    setClapping(true);
    
    try {
      const deviceId = getDeviceId();
      
      // Check local storage FIRST - does this device think it has clapped?
      const hasClappedLocally = localStorage.getItem(`blog_${blog.id}_clapped`) === 'true';
      
      // Tell server to TOGGLE the clap state
      const response = await axios.post(
        `https://api.bonet.rw:8443/bonetBackend/backend/public/clappings`,
        { 
          blog: blog.id,
          device: deviceId,
          action: hasClappedLocally ? 'unclap' : 'clap' // Tell server what to do
        },
        { 
          headers: { 
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        // Update state from SERVER response
        setClaps(response.data.total_claps || 0);
        
        // TOGGLE local clap state
        const newClapState = !hasClappedLocally;
        setUserClapped(newClapState);
        
        // Update localStorage
        localStorage.setItem(`blog_${blog.id}_clapped`, newClapState ? 'true' : 'false');
      }
    } catch (err) {
      console.error('Error clapping:', err);
      // Fallback toggle
      const newClapState = !userClapped;
      setUserClapped(newClapState);
      setClaps(prev => newClapState ? prev + 1 : Math.max(0, prev - 1));
      localStorage.setItem(`blog_${blog.id}_clapped`, newClapState ? 'true' : 'false');
    } finally {
      setClapping(false);
    }
  };

  // Track view function (call this to server)
  const trackView = async () => {
    if (!blog?.id) return;
    
    try {
      const deviceId = getDeviceId();
      const today = new Date().toDateString();
      const viewKey = `viewed_${blog.id}_${deviceId}`;
      
      // Check if already viewed today in localStorage
      const lastViewDate = localStorage.getItem(viewKey);
      
      if (lastViewDate !== today) {
        // Send view to SERVER
        await axios.post(
          `https://api.bonet.rw:8443/bonetBackend/backend/public/views`,
          { blog: blog.id, device: deviceId },
          { 
            headers: { 
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Mark as viewed today in localStorage
        localStorage.setItem(viewKey, today);
        
        // Refresh view count from server
        const viewsResponse = await axios.get(
          `https://api.bonet.rw:8443/bonetBackend/backend/public/views?blog=${blog.id}`
        );
        
        if (viewsResponse.data) {
          setViews(viewsResponse.data.views || 0);
        }
      }
    } catch (err) {
      console.error('Error tracking view:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The blog post you're looking for doesn't exist."}</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

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
      .replace(/<p>/g, '<p class="mb-4 text-gray-700 leading-relaxed">')
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8">')
      .replace(/<\/h1>/g, '</h1>')
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-6">')
      .replace(/<\/h2>/g, '</h2>')
      .replace(/<h3>/g, '<h3 class="text-xl font-bold text-gray-900 mb-3 mt-5">')
      .replace(/<\/h3>/g, '</h3>')
      .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 ml-6">')
      .replace(/<\/ul>/g, '</ul>')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside mb-4 ml-6">')
      .replace(/<\/ol>/g, '</ol>')
      .replace(/<li>/g, '<li class="text-gray-700 mb-2">')
      .replace(/<\/li>/g, '</li>')
      .replace(/<strong>/g, '<strong class="font-semibold text-gray-900">')
      .replace(/<\/strong>/g, '</strong>')
      .replace(/<em>/g, '<em class="italic text-gray-600">')
      .replace(/<\/em>/g, '</em>')
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4 bg-gray-50 py-2">')
      .replace(/<\/blockquote>/g, '</blockquote>')
      .replace(/<a href=/g, '<a class="text-gray-700 hover:text-gray-900 underline font-medium" href=');
  };

  const htmlDescription = processHTMLContent(blog.description || '');

  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      return currentUrl;
    }
    return `https://bonet.rw/blog/${slug}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add this Head component in your return */}
      <Head>
        <title>{blog?.title} | Bonet Blog</title>
        <meta name="description" content={blog?.quote || 'Read on Bonet'} />
        <meta property="og:title" content={blog?.title} />
        <meta property="og:description" content={blog?.quote} />
        <meta property="og:image" content={blog?.image ? `https://api.bonet.rw:8443/bonetBackend/public/${blog.image}` : 'default-image.jpg'} />
        <meta property="og:url" content={`https://bonet.rw/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog?.title} />
        <meta name="twitter:description" content={blog?.quote} />
        <meta name="twitter:image" content={blog?.image ? `https://api.bonet.rw:8443/bonetBackend/public/${blog.image}` : 'default-image.jpg'} />
      </Head>
      <div className="max-w-4xl mx-auto px-4 pb-8 pt-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 text-center leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">
              {formatDate(blog.created_at || '')}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">
              {blog.author || 'Bonet Team'}
            </span>
          </div>
          
          {/* Advanced Social Share Component */}
          <SocialShare
            url={getCurrentUrl()}
            title={blog.title}
            description={blog.quote || blog.description || ''}
            imageUrl={blog.image ? `https://api.bonet.rw:8443/bonetBackend/public/${blog.image}` : undefined}
            hashtags={["Rwanda", "Travel", "Business", "Investment", "BonetElite"]}
          />
        </div>

        {blog.image && (
          <div className="relative rounded-lg overflow-hidden mb-8 bg-white shadow-sm border border-gray-200">
            <img
              src={`https://api.bonet.rw:8443/bonetBackend/public/${blog.image}`}
              alt={blog.title}
              className="w-full h-[400px] object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        {blog.quote && (
          <blockquote className="bg-gray-50 border-l-4 border-gray-300 rounded-lg p-6 mb-8">
            <p className="text-xl font-medium text-gray-700 leading-relaxed italic">
              "{blog.quote}"
            </p>
          </blockquote>
        )}

        <article className="max-w-none">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 overflow-hidden">
            {blog.description ? (
              <>
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed break-words overflow-wrap-break-word"
                dangerouslySetInnerHTML={{ __html: htmlDescription }}
              />
<div className="mt-8 pt-8 border-t border-gray-200">
  <div className="flex flex-col items-center justify-center">
    <div className="flex items-center gap-4 mb-2">
      <button
        onClick={handleClap}
        disabled={clapping}
        className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          userClapped 
            ? 'bg-amber-100 text-amber-600 border-2 border-amber-300 shadow-md' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-300'
        } ${clapping ? 'animate-pulse' : ''}`}
        title={userClapped ? "Unclap" : "Clap for this article"}
      >
        <HandMetal className={`w-6 h-6 ${userClapped ? 'fill-amber-500' : ''}`} />
      </button>
      
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-gray-900">{claps}</span>
        <span className="text-sm text-gray-500">
          {claps === 1 ? 'Clap' : 'Claps'}
        </span>
      </div>
    </div>
    
    {userClapped && (
      <p className="text-sm text-amber-600 font-medium mt-2 flex items-center gap-1 animate-pulse">
        <span className="text-amber-500">✓</span> You clapped for this article
      </p>
    )}
    
    <div className="mt-4 text-center">
      <div className="flex items-center gap-2 text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span className="text-sm font-medium">{views} views</span>
      </div>
    </div>
    

  </div>
</div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No content available for this blog post.</p>
              </div>
            )}
          </div>
          
        </article>
      </div>
    </div>
  );
}
