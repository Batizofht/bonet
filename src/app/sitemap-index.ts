import { MetadataRoute } from 'next'

export default function sitemapIndex(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.bonet.rw'
  
  return [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-static.xml`,
      lastModified: new Date(),
    },
  ]
}
