"use client"

import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/api";
import { useParams } from "next/navigation";
import { Calendar, User, ArrowLeft, HandMetal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SocialShare from "../../../components/SocialShare";
import PageLoader from "../../../components/PageLoader";
import { useTranslation } from "react-i18next";
import { cleanText } from "@/lib/text";

interface Blog {
  id: number;
  title: string;
  image?: string;
  quote?: string;
  description?: string;
  created_at?: string;
  author?: string;
}

export default function BlogDetailClient({ initialBlog = null }: { initialBlog?: Blog | null }) {
  const params = useParams();
  const slug = params.slug as string;
  const { i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  // The server page already fetched the post, so it is rendered into the
  // HTML (crawlable) and the browser only refetches when it is missing.
  // The <title> comes from generateMetadata; it is not overwritten here.
  const [blog, setBlog] = useState<Blog | null>(initialBlog);
  const [loading, setLoading] = useState(!initialBlog);
  const [error, setError] = useState<string | null>(null);
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
        setBlog(null); // Clear old blog immediately
        
        const data = await apiGet<any>(
          "https://api.bonet.rw/bonetBackend/backend/public/blogs"
        );

        if (!data) {
          throw new Error('No data in response');
        }

        const blogsArray = data.data || data.blogs || data;
        
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

    if (slug && !initialBlog) {
      fetchBlog();
    }
  }, [slug, initialBlog]);

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
        const clapsData = await apiGet<any>(
          `https://api.bonet.rw/bonetBackend/backend/public/clappings?blog=${blog.id}`
        );

        if (clapsData) {
          setClaps(clapsData.total_claps || 0);
        }
        console.log(clapsData.data);

        // Check LOCAL storage if this device has clapped
        const hasClapped = localStorage.getItem(`blog_${blog.id}_clapped`) === 'true';
        setUserClapped(hasClapped);

        // Fetch views data from SERVER
        const viewsData = await apiGet<any>(
          `https://api.bonet.rw/bonetBackend/backend/public/views?blog=${blog.id}`
        );

        if (viewsData) {
          setViews(viewsData.views || 0);
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
      const data = await apiPost(
        `https://api.bonet.rw/bonetBackend/backend/public/clappings`,
        {
          blog: blog.id,
          device: deviceId,
          action: hasClappedLocally ? 'unclap' : 'clap' // Tell server what to do
        }
      );

      if (data) {
        // Update state from SERVER response
        setClaps(data.total_claps || 0);
        
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
        await apiPost(
          `https://api.bonet.rw/bonetBackend/backend/public/views`,
          { blog: blog.id, device: deviceId }
        );
        
        // Mark as viewed today in localStorage
        localStorage.setItem(viewKey, today);
        
        // Refresh view count from server
        const viewsData = await apiGet<any>(
          `https://api.bonet.rw/bonetBackend/backend/public/views?blog=${blog.id}`
        );

        if (viewsData) {
          setViews(viewsData.views || 0);
        }
      }
    } catch (err) {
      console.error('Error tracking view:', err);
    }
  };

  if (loading || !blog) {
    return <PageLoader />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{L("Blog Not Found","Article introuvable","文章未找到")}</h1>
          <p className="text-gray-600 mb-4">{error || L("The blog post you're looking for doesn't exist.","L'article que vous recherchez n'existe pas.","您查找的博客文章不存在。")}</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {L("Back to Home","Retour à l'accueil","返回首页")}
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

  // Same value on server and client (avoids a hydration mismatch) and
  // always shares the canonical URL rather than localhost or a tracking URL
  const getCurrentUrl = () => `https://bonet.rw/blog/${slug}`;

  // SIMPLE: Title always from URL slug. Never from blog state.
  const safeTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Blog Post';

  return (
    <div className="bg-white pb-16 md:pb-24">
      <div className="bg-ivory">
        <div className="container-x max-w-4xl pb-10 pt-12 md:pt-16">
          <nav aria-label="Breadcrumb" className="text-[13px] text-ink-500">
            <Link href="/" className="hover:text-ink-900">{L("Home","Accueil","首页")}</Link>
            <span className="mx-2">/</span>
            <Link href="/blogs" className="hover:text-ink-900">Blog</Link>
          </nav>
          <p className="eyebrow mt-8">{L("Insights","Guides","洞察")}</p>
          <h1 className="h-display mt-3 text-[1.9rem] sm:text-[2.3rem] md:text-[2.7rem]">
            {blog.title}
          </h1>
        </div>
      </div>
      <div className="container-x max-w-4xl pb-8 pt-8">

        <div className="mb-8 flex flex-wrap items-center gap-6 border-b border-line pb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gold-600" />
            <span className="text-sm font-medium text-ink-600">
              {formatDate(blog.created_at || '')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gold-600" />
            <span className="text-sm font-medium text-ink-600">
              {blog.author || 'Bonet Team'}
            </span>
          </div>
          
          {/* Advanced Social Share Component */}
          <SocialShare
            url={getCurrentUrl()}
            title={safeTitle}
            description={cleanText(blog.quote) || cleanText(blog.description)}
            imageUrl={blog.image ? `https://api.bonet.rw/bonetBackend/public/${blog.image}` : undefined}
            hashtags={["Rwanda", "Travel", "Business", "Investment", "BonetElite"]}
          />
        </div>

        {blog.image && (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[10px] bg-sand">
            <Image
              src={`https://api.bonet.rw/bonetBackend/public/${blog.image}`}
              alt={`${blog.title} - Bonet Elite Services, Kigali Rwanda`}
              fill
              priority
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        {cleanText(blog.quote) && (
          <blockquote className="mb-10 border-l-2 border-gold-500 py-1 pl-6">
            <p className="text-[1.15rem] font-medium leading-relaxed text-ink-900">
              "{cleanText(blog.quote)}"
            </p>
          </blockquote>
        )}

        <article className="max-w-none">
          <div className="overflow-hidden">
            {cleanText(blog.description) ? (
              <>
              <div
                className="prose-bonet break-words [&_h1]:font-display [&_h1]:text-[2rem] [&_h1]:font-semibold [&_h1]:text-ink-900 [&_img]:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: htmlDescription }}
              />

{/* Internal Links for SEO */}
<div className="mt-12 rounded-[10px] border border-line p-7">
  <h2 className="mb-4 text-[1.15rem] font-semibold text-ink-900">{L("Explore Bonet Elite Services","Explorer Bonet Elite Services","探索Bonet Elite服务")}</h2>
  <div className="flex flex-wrap gap-3">
    <Link href="/about" className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-ink-900">
      {L("About Our Team","Notre équipe","关于我们的团队")}
    </Link>
    <Link href="/services" className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-ink-900">
      {L("Our Services","Nos services","我们的服务")}
    </Link>
    <Link href="/blogs" className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-ink-900">
      {L("More Articles","Plus d'articles","更多文章")}
    </Link>
    <Link href="/contact" className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-ink-900">
      {L("Contact Us","Nous contacter","联系我们")}
    </Link>
  </div>
</div>

<div className="mt-8 pt-8 border-t border-gray-200">
  <div className="flex flex-col items-center justify-center">
    <div className="flex items-center gap-4 mb-2">
      <button
        onClick={handleClap}
        disabled={clapping}
        className={`flex items-center justify-center p-3 rounded-lg transition-all duration-300 ${
          userClapped 
            ? 'bg-amber-100 text-amber-600 border-2 border-amber-300' 
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
