import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/', '/_next/', '/admin/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nhattrung.dev'}/sitemap.xml`,
  }
}

