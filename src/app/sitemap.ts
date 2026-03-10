import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.bonet.rw'
  
  // Core static pages with proper SEO metadata
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/travel`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/investment`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  try {
    // Try multiple API endpoints for reliability
    const endpoints = [
      'https://api.bonet.rw:8443/bonetBackend/backend/public/full',
      'https://api.bonet.rw:8443/bonetBackend/backend/public/blogs'
    ]

    let blogs: any[] = []
    let apiWorked = false

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'BonetEliteSitemapBot/1.0; +https://www.bonet.rw',
          },
          cache: 'no-store',
          signal: AbortSignal.timeout(8000),
        })

        if (response.ok) {
          const data = await response.json()
          const fetchedBlogs = data.data || data.blogs || data
          
          if (Array.isArray(fetchedBlogs) && fetchedBlogs.length > 0) {
            blogs = fetchedBlogs
            apiWorked = true
            console.log(`✅ Sitemap: Found ${blogs.length} blogs from ${endpoint}`)
            break
          }
        }
      } catch (endpointError: any) {
        console.warn(`Endpoint ${endpoint} failed:`, endpointError?.message || 'Unknown error')
        continue
      }
    }

    if (!apiWorked) {
      console.warn('⚠️ All API endpoints failed, returning static pages only')
      return staticPages
    }

    // Generate professional blog URLs with proper metadata
    const blogUrls = blogs
      .filter((blog: any) => blog.title)
      .map((blog: any) => {
        // Professional slug generation
        const slug = blog.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Remove multiple hyphens
          .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
          .trim()

        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: blog.created_at ? new Date(blog.created_at) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }
      })

    return [...staticPages, ...blogUrls]
    
  } catch (error) {
    console.error('❌ Sitemap generation failed:', error)
    // Always return static pages as fallback
    return staticPages
  }
}
