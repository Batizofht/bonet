'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, Search, X, Briefcase, TrendingUp, MapPin } from 'lucide-react';
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
      return fallback || key;
    }
  }
  
  return typeof value === 'string' ? value : fallback || key;
};

const formatDate = (dateString?: string, language: SupportedLanguage = 'en'): string => {
  if (!dateString) return 'Recent';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'ch' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return 'Recent';
  }
};

export default function BlogsClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Filter blogs based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
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

  const featuredCategories = [
    // { href: '/blog-business', label: 'Business', icon: Briefcase, desc: 'Company setup & growth' },
    { href: '/blog-investment', label: 'Investment', icon: TrendingUp, desc: 'Opportunities & returns' },
    { href: '/blog-travel-tips', label: 'Travel Tips', icon: MapPin, desc: 'Visa, culture & safety' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            {t('blog.header.title1', 'Latest')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-3">
            {t('blog.header.title2', 'Blogs')}
          </h1>
          <p className="text-gray-500 text-lg max-w-xl">
            {t('blog.header.description', 'Expert articles and updates')}
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('blog.filter.placeholder', 'Search articles...')}
              className="w-full pl-10 pr-9 py-3 text-sm border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-[#C9A84C] transition-colors"
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
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              {blogItems.length} {t('blog.filter.of', 'of')} {allBlogs.length} articles
            </p>
          )}
        </div>

        {/* Featured Categories */}
        <div className="mb-12 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mr-1">Featured</span>
          {featuredCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200"
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-lg flex items-center justify-between">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => loadBlogs(1)}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              {t('common.retry', 'Retry')}
            </button>
          </div>
        )}

        {/* Loading State */}
        {isInitialLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#C9A84C] animate-spin" />
          </div>
        ) : (
          <>
            {blogItems.length > 0 ? (
              <>
                {/* Featured First Post - Editorial Hero */}
                {blogItems[0] && (
                  <Link href={`/blog/${blogItems[0].slug}`} className="group block mb-12">
                    <article className="md:flex md:gap-8">
                      <div className="md:w-3/5 mb-4 md:mb-0">
                        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                          <img
                            src={blogItems[0].imageUrl}
                            alt={blogItems[0].title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="eager"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/5 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">Featured</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs text-gray-500">{blogItems[0].formattedDate}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-[#C9A84C] transition-colors duration-200 line-clamp-3">
                          {blogItems[0].title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                          {blogItems[0].quote}
                        </p>
                        <span className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm">
                          Read article
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </article>
                  </Link>
                )}

                {/* Divider */}
                <div className="border-t border-gray-100 mb-10" />

                {/* Remaining Posts - Editorial List */}
                {blogItems.length > 1 && (
                  <div className="space-y-0">
                    {blogItems.slice(1).map((post, index) => (
                      <Link
                        key={`${post.id}-${index}`}
                        href={`/blog/${post.slug}`}
                        className="group block"
                      >
                        <article className="py-8 border-b border-gray-100 first:pt-0 last:border-b-0">
                          <div className="flex flex-col sm:flex-row sm:gap-6">
                            {/* Image */}
                            <div className="sm:w-48 md:w-56 flex-shrink-0 mb-4 sm:mb-0">
                              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                <img
                                  src={post.imageUrl}
                                  alt={post.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                            {/* Text */}
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs text-gray-500">{post.formattedDate}</span>
                              </div>
                              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#C9A84C] transition-colors duration-200 line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                                {post.quote}
                              </p>
                              <span className="inline-flex items-center gap-1.5 text-[#C9A84C] text-sm font-medium">
                                Read
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Load More */}
                {hasMore && (
                  <div className="text-center pt-10 pb-4">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {isLoadingMore ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Load more articles
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-gray-400 text-xs">
                      {blogItems.length} articles loaded
                    </p>
                  </div>
                )}

                {/* All Loaded */}
                {!hasMore && !searchQuery.trim() && allBlogs.length > 0 && (
                  <div className="text-center pt-8 pb-4">
                    <p className="text-sm text-gray-400">
                      {allBlogs.length} articles — you've read them all
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* No Results */
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  {searchQuery 
                    ? t('blog.noFilterResults', 'No articles match your search')
                    : t('blog.noPosts', 'No articles available yet.')}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {searchQuery 
                    ? t('blog.noFilterResultsHint', 'Try different keywords')
                    : t('blog.noPostsHint', 'Check back later for new content')}
                </p>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="px-6 py-2 bg-[#C9A84C] text-white rounded-lg font-medium hover:bg-[#B8973B] transition-colors duration-200 text-sm"
                  >
                    {t('blog.filter.clear', 'Clear search')}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
