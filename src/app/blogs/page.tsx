'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Calendar, Clock, BookOpen, Sparkles, ArrowRight, Loader2, Search, X, Plus } from 'lucide-react';
import { slugify } from '../../slugify';

// Translation imports
import enTranslations from '../../../public/locales/en/translation.json';
import frTranslations from '../../../public/locales/fr/translation.json';
import chTranslations from '../../../public/locales/ch/translation.json';

interface Blog {
  id: number;
  title: string;
  quote: string;
  image: string;
  created_at?: string;
  publication_status?: string;
  view_count?: number;
}

interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog[];
  pagination?: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_more: boolean;
  };
  error?: string;
}

const BLOGS_PER_PAGE = 9;

const translationsMap = {
  en: enTranslations,
  fr: frTranslations,
  ch: chTranslations,
} as const;

type SupportedLanguage = keyof typeof translationsMap;
const FALLBACK_LANGUAGE: SupportedLanguage = 'en';

const getTranslation = (language: SupportedLanguage, key: string, fallback?: string): string => {
  const segments = key.split('.');
  let value: any = translationsMap[language] ?? translationsMap[FALLBACK_LANGUAGE];
  
  for (const segment of segments) {
    if (value && typeof value === 'object' && segment in value) {
      value = value[segment];
    } else {
      return fallback ?? key;
    }
  }
  
  return typeof value === 'string' ? value : fallback ?? key;
};

const formatDate = (dateString: string | undefined, lang: SupportedLanguage) => {
  if (!dateString) return getTranslation(lang, 'blog.meta.recent', 'Recent');
  
  return new Intl.DateTimeFormat(lang === 'ch' ? 'zh-CN' : lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};

export default function BlogsPageWithLoadMore() {
  // State
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]); // Store all loaded blogs for filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<SupportedLanguage>(FALLBACK_LANGUAGE);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Get language from cookie
  useEffect(() => {
    const lang = document.cookie
      .split('; ')
      .find(row => row.startsWith('i18nextLng='))
      ?.split('=')[1] as SupportedLanguage;
    
    if (lang && translationsMap[lang]) {
      setLanguage(lang);
    }
  }, []);

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Add sticky class when scrolled past the header
        setIsSticky(scrollPosition > headerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Filter blogs based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      // If no search query, show all loaded blogs
      setBlogs(allBlogs);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = allBlogs.filter(blog => 
      blog.title.toLowerCase().includes(query) ||
      blog.quote.toLowerCase().includes(query)
    );
    
    setBlogs(filtered);
  }, [searchQuery, allBlogs]);

  // Fetch blogs function
  const fetchBlogs = useCallback(async (pageNum: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Build URL
      const url = new URL('https://api.bonet.rw:8443/bonetBackend/backend/public/full');
      url.searchParams.set('page', pageNum.toString());
      url.searchParams.set('limit', BLOGS_PER_PAGE.toString());
      
      const response = await fetch(url.toString(), {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch blogs`);
      }

      const data: BlogResponse = await response.json();
      console.log(data);
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch blogs');
      }
      
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid response structure from server');
      }

      return {
        blogs: data.data || [],
        hasMore: data.pagination?.has_more ?? (data.data.length === BLOGS_PER_PAGE)
      };
      
    } catch (error: any) {
      console.error('Fetch error:', error);
      setError(`Failed to load blogs: ${error.message}`);
      return null;
      
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load initial blogs
  const loadBlogs = useCallback(async (pageNum: number) => {
    if (pageNum > 1) {
      setIsLoadingMore(true);
    } else {
      setIsInitialLoading(true);
    }
    
    const result = await fetchBlogs(pageNum);
    
    if (result) {
      if (pageNum === 1) {
        setAllBlogs(result.blogs);
        setBlogs(result.blogs);
        setHasMore(result.hasMore);
        setCurrentPage(1);
      } else {
        const newBlogs = [...allBlogs, ...result.blogs];
        setAllBlogs(newBlogs);
        // Apply current search filter to new data
        if (!searchQuery.trim()) {
          setBlogs(newBlogs);
        } else {
          const query = searchQuery.toLowerCase().trim();
          const filtered = newBlogs.filter(blog => 
            blog.title.toLowerCase().includes(query) ||
            blog.quote.toLowerCase().includes(query)
          );
          setBlogs(filtered);
        }
        setHasMore(result.hasMore);
        setCurrentPage(pageNum);
      }
    }
    
    if (pageNum === 1) {
      setIsInitialLoading(false);
    } else {
      setIsLoadingMore(false);
    }
  }, [fetchBlogs, allBlogs, searchQuery]);

  // Initial load
  useEffect(() => {
    loadBlogs(1);
  }, []);

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    // Reset to show all loaded blogs
    setBlogs(allBlogs);
  };

  // Load more blogs
  const handleLoadMore = () => {
    if (!hasMore || isLoadingMore) return;
    loadBlogs(currentPage + 1);
  };

  // Translation helper
  const t = useMemo(() => 
    (key: string, fallback?: string) => getTranslation(language, key, fallback),
    [language]
  );

  // Memoized blog items
  const blogItems = useMemo(() => 
    blogs.map((post) => ({
      ...post,
      slug: slugify(post.title),
      formattedDate: formatDate(post.created_at, language),
      imageUrl: `https://api.bonet.rw:8443/bonetBackend/public/${post.image}`
    })),
    [blogs, language]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      <section className="py-12 px-4 max-w-6xl mx-auto">
        {/* Sticky Header */}
        <div 
          ref={headerRef}
          style={{
            marginTop: isSticky ? '-1000px' : '0',
          }}
          className={`mb-10 transition-all duration-300 ${
            isSticky 
              ? 'fixed rounded-lg  top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-lg py-4 px-4 md:px-6' 
              : ''
          }`}
          style={isSticky ? { 
            maxWidth: '72rem',
            margin: '0 auto',
            width: '100%'
          } : {}}
        >
          <div className={`${isSticky ? 'max-w-6xl mx-auto' : ''}`}>
            {/* Title Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 mt-1 h-5 text-[#188bff]" />
                <h1 className="text-2xl font-bold text-gray-800">
                  {t('blog.header.title1', 'Latest')}{" "}
                  <span className="text-[#188bff]">
                    {t('blog.header.title2', 'Blogs')}
                  </span>
                </h1>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                {t('blog.header.description', 'Expert articles and updates')}
              </p>
            </div>
            
            {/* Filter Section */}
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('blog.filter.placeholder', 'Filter blogs by title or content...')}
                  className="w-full pl-9 pr-9 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#188bff] focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear filter"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Filter info */}
              {searchQuery && (
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {t('blog.filter.showing', 'Showing')} {blogItems.length} {t('blog.filter.of', 'of')} {allBlogs.length} {t('blog.filter.blogs', 'blogs')}
                  </p>
                  {blogItems.length === 0 && (
                    <button
                      onClick={clearSearch}
                      className="text-sm text-[#188bff] hover:text-blue-600 font-medium"
                    >
                      {t('blog.filter.clear', 'Clear filter')}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spacer for sticky header */}
        {isSticky && <div className="h-32 md:h-28"></div>}

        {/* Error State */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-red-600">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">!</span>
                </div>
                <div>
                  <p className="font-semibold">{t('common.error', 'Error')}</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
              <button
                onClick={() => loadBlogs(1)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
              >
                {t('common.retry', 'Retry')}
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isInitialLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#188bff] animate-spin mb-4" />
            <p className="text-gray-600 font-medium">
              {t('blog.loading', 'Loading blogs...')}
            </p>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            {blogItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {blogItems.map((post, index) => (
                    <article
                      key={`${post.id}-${index}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#188bff] transition-all duration-300 shadow-sm hover:shadow-xl"
                    >
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">
                              {post.formattedDate}
                            </span>
                          </div>
                        </div>
                        
                        {/* Views Badge */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">
                              {post.view_count ?? 0} {t('blog.meta.views', 'views')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                       <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-[#188bff] font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                        >
                      
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#188bff] transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3></Link>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.quote}
                        </p>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-[#188bff] font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                        >
                          {t('blog.readMore', 'Read more')}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                 {/* Load More Button */}
                {hasMore && (
                  <div className="text-center py-8">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="inline-flex items-center gap-3 px-4 border border-[#188bff] py-4 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-[#188bff]" />
                        
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 text-[#188bff]" />
                         
                        </>
                      )}
                    </button>
                    
                    {/* Displaying count */}
                    <p className="mt-4 text-gray-500 text-sm">
                      {t('blog.displaying', 'Displaying')} {blogItems.length} {t('blog.blogs', 'blogs')}
                    </p>
                  </div>
                )}

                {/* No More Posts */}
                {!hasMore && !searchQuery.trim() && allBlogs.length > 0 && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-700">
                          {t('blog.allLoaded', "You've seen all our blog posts")}
                        </p>
                        <p className="text-sm text-gray-500">
                          {t('blog.totalPosts', 'Total posts loaded:')} {allBlogs.length}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* No Results */
              <div className="text-center py-16">
                <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      {searchQuery 
                        ? t('blog.noFilterResults', 'No blogs found matching your filter')
                        : t('blog.noPosts', 'No blog posts available right now.')}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      {searchQuery 
                        ? t('blog.noFilterResultsHint', 'Try different keywords or clear the filter')
                        : t('blog.noPostsHint', 'Check back later for new articles')}
                    </p>
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="px-6 py-2 bg-[#188bff] text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                      >
                        {t('blog.filter.clear', 'Clear filter')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}