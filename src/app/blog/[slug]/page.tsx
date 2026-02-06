// app/blog/[slug]/page.tsx
'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Calendar, User, ArrowLeft, Share2, Facebook, Linkedin, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Head from 'next/head';
import { HandMetal } from "lucide-react";

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
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
// Add these state variables after your existing states
const [claps, setClaps] = useState(0);
const [userClapped, setUserClapped] = useState(false);
const [clapping, setClapping] = useState(false);
const [views, setViews] = useState(0);

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
// Add these state variables

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

// Fetch claps and views from localStorage
useEffect(() => {
  const fetchClapsAndViews = async () => {
    if (!blog?.id) return;

    const deviceId = getDeviceId();
    
    // Get claps from localStorage
    const clapsKey = `blog_${blog.id}_claps`;
    const storedClaps = localStorage.getItem(clapsKey);
    const clapsCount = storedClaps ? parseInt(storedClaps) : 0;
    setClaps(clapsCount);
    
    // Check if current device has clapped
    const clapStatusKey = `blog_${blog.id}_clapped_${deviceId}`;
    const hasClapped = localStorage.getItem(clapStatusKey) === 'true';
    setUserClapped(hasClapped);
    
    // Get views from localStorage (IP-based simulation)
    const viewsKey = `blog_${blog.id}_views`;
    const storedViews = localStorage.getItem(viewsKey);
    const viewsCount = storedViews ? parseInt(storedViews) : Math.floor(Math.random() * 100) + 50; // Default random views
    setViews(viewsCount);
    
    // Track view (once per device per day)
    trackView();
  };

  if (blog?.id) {
    fetchClapsAndViews();
  }
}, [blog?.id]);

// Handle clap function - Toggle like/unlike
const handleClap = () => {
  if (!blog?.id || clapping) return;

  setClapping(true);
  
  try {
    const deviceId = getDeviceId();
    const clapsKey = `blog_${blog.id}_claps`;
    const clapStatusKey = `blog_${blog.id}_clapped_${deviceId}`;
    
    // Get current claps
    const currentClaps = claps;
    const hasClapped = userClapped;
    
    if (hasClapped) {
      // UNCLAP - Decrease clap count
      const newClaps = Math.max(0, currentClaps - 1);
      setClaps(newClaps);
      setUserClapped(false);
      
      // Update localStorage
      localStorage.setItem(clapsKey, newClaps.toString());
      localStorage.setItem(clapStatusKey, 'false');
      
      // Remove from clapped devices list
      const clappedDevicesKey = `blog_${blog.id}_clapped_devices`;
      const clappedDevices = JSON.parse(localStorage.getItem(clappedDevicesKey) || '[]');
      const updatedDevices = clappedDevices.filter((id: string) => id !== deviceId);
      localStorage.setItem(clappedDevicesKey, JSON.stringify(updatedDevices));
    } else {
      // CLAP - Increase clap count
      const newClaps = currentClaps + 1;
      setClaps(newClaps);
      setUserClapped(true);
      
      // Update localStorage
      localStorage.setItem(clapsKey, newClaps.toString());
      localStorage.setItem(clapStatusKey, 'true');
      
      // Add to clapped devices list
      const clappedDevicesKey = `blog_${blog.id}_clapped_devices`;
      const clappedDevices = JSON.parse(localStorage.getItem(clappedDevicesKey) || '[]');
      if (!clappedDevices.includes(deviceId)) {
        clappedDevices.push(deviceId);
        localStorage.setItem(clappedDevicesKey, JSON.stringify(clappedDevices));
      }
    }
    
    // Sync to server in background (optional)
    syncClapsToServer();
    
  } catch (err) {
    console.error('Error clapping:', err);
  } finally {
    setClapping(false);
  }
};

// Track view function (once per device per day)
const trackView = () => {
  if (!blog?.id) return;
  
  try {
    const deviceId = getDeviceId();
    const today = new Date().toDateString();
    const viewKey = `blog_${blog.id}_viewed_${deviceId}_${today}`;
    const viewsKey = `blog_${blog.id}_views`;
    
    // Check if already viewed today
    const hasViewedToday = localStorage.getItem(viewKey) === 'true';
    
    if (!hasViewedToday) {
      // Increment view count
      const currentViews = views;
      const newViews = currentViews + 1;
      setViews(newViews);
      
      // Update localStorage
      localStorage.setItem(viewsKey, newViews.toString());
      localStorage.setItem(viewKey, 'true');
      
      // Add to viewed devices
      const viewedDevicesKey = `blog_${blog.id}_viewed_devices`;
      const viewedDevices = JSON.parse(localStorage.getItem(viewedDevicesKey) || '[]');
      if (!viewedDevices.includes(deviceId)) {
        viewedDevices.push(deviceId);
        localStorage.setItem(viewedDevicesKey, JSON.stringify(viewedDevices));
      }
      
      // Sync to server in background (optional)
      syncViewsToServer();
    }
  } catch (err) {
    console.error('Error tracking view:', err);
  }
};

// Optional: Sync to server (if you want backend backup)
const syncClapsToServer = async () => {
  if (!blog?.id) return;
  
  try {
    const deviceId = getDeviceId();
    const clappedDevicesKey = `blog_${blog.id}_clapped_devices`;
    const clappedDevices = JSON.parse(localStorage.getItem(clappedDevicesKey) || '[]');
    
    await axios.post(
      `https://api.bonet.rw:8443/bonetBackend/backend/public/clappings`,
      {
        blog: blog.id,
        device: deviceId,
        claps: claps,
        clappedDevices: clappedDevices.length
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Claps synced to server');
  } catch (err) {
    // Silent fail - offline mode
  }
};

const syncViewsToServer = async () => {
  if (!blog?.id) return;
  
  try {
    const viewedDevicesKey = `blog_${blog.id}_viewed_devices`;
    const viewedDevices = JSON.parse(localStorage.getItem(viewedDevicesKey) || '[]');
    
    await axios.post(
      `https://api.bonet.rw:8443/bonetBackend/backend/public/views`,
      {
        blog: blog.id,
        views: views,
        uniqueDevices: viewedDevices.length
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    // Silent fail - offline mode
  }
};

// Initialize with existing data from server (optional)
useEffect(() => {
  const initializeFromServer = async () => {
    if (!blog?.id) return;
    
    try {
      // Try to get initial data from server
      const [clapsResponse, viewsResponse] = await Promise.allSettled([
        axios.get(`https://api.bonet.rw:8443/bonetBackend/backend/public/clappings?blog=${blog.id}`),
        axios.get(`https://api.bonet.rw:8443/bonetBackend/backend/public/views?blog=${blog.id}`)
      ]);
      
      // Merge server data with local
      if (clapsResponse.status === 'fulfilled' && clapsResponse.value.data) {
        const serverClaps = clapsResponse.value.data.total_claps || 0;
        const localClapsKey = `blog_${blog.id}_claps`;
        const localClaps = parseInt(localStorage.getItem(localClapsKey) || '0');
        
        // Use whichever is higher
        const finalClaps = Math.max(serverClaps, localClaps);
        setClaps(finalClaps);
        localStorage.setItem(localClapsKey, finalClaps.toString());
      }
      
      if (viewsResponse.status === 'fulfilled' && viewsResponse.value.data) {
        const serverViews = viewsResponse.value.data.views || 0;
        const localViewsKey = `blog_${blog.id}_views`;
        const localViews = parseInt(localStorage.getItem(localViewsKey) || '0');
        
        // Use whichever is higher
        const finalViews = Math.max(serverViews, localViews);
        setViews(finalViews);
        localStorage.setItem(localViewsKey, finalViews.toString());
      }
    } catch (err) {
      console.error('Error initializing from server:', err);
    }
  };
  
  if (blog?.id) {
    initializeFromServer();
  }
}, [blog?.id]);
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

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(getCurrentUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const url = encodeURIComponent(getCurrentUrl());
    const text = encodeURIComponent(`Check out this article: ${blog.title}`);
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
  };

  const copyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(getCurrentUrl());
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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
        <meta property="og:url" content={`https://www.bonet.rw/blog/${slug}`} />
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
          
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
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

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowShareModal(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-sm w-full p-5 relative">
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 className="w-5 h-5 text-gray-700" />
                    <h2 className="text-lg font-semibold text-gray-900">Share this article</h2>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={shareToFacebook}
                      className="w-full flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Facebook</span>
                    </button>
                    
                    <button
                      onClick={shareToLinkedIn}
                      className="w-full flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </button>
                    
                    <button
                      onClick={shareToWhatsApp}
                      className="w-full flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                    
                    <button
                      onClick={copyLink}
                      className={`w-full flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium ${copied ? 'bg-green-50 text-green-700' : ''}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                    </button>
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
