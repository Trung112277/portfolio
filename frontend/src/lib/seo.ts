/**
 * SEO Configuration and Utilities
 * Comprehensive SEO setup for the portfolio
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  url: string;
  image: string;
  type: 'website' | 'article' | 'profile';
  locale: string;
  siteName: string;
  twitterHandle?: string;
  facebookAppId?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

// Base SEO configuration
export const baseSEO: SEOConfig = {
  title: "Nhat Trung | Developer Portfolio",
  description: "Professional portfolio showcasing development skills, React, Next.js, TypeScript projects, and modern web technologies. Experienced developer with expertise in creating responsive, performant web applications.",
  keywords: [
    "developer",
    "fullstack developer",
    "backend developer",
    "frontend developer",
    "react developer",
    "nextjs developer", 
    "typescript developer",
    "portfolio",
    "javascript",
    "html",
    "css",
    "tailwind css",
    "three.js",
    "web performance",
    "responsive design",
    "modern web development"
  ],
  author: "Nhat Trung",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nhattrung.dev",
  image: "/open-graph/open-graph-1.png",
  type: "website",
  locale: "en_US",
  siteName: "Nhat Trung Portfolio",
  twitterHandle: "@nhattrung_dev",
  facebookAppId: "your-facebook-app-id"
};

// Page-specific SEO configurations
export const pageSEO: Record<string, Partial<SEOConfig>> = {
  home: {
    title: "Nhat Trung | Developer Portfolio",
    description: "Professional portfolio showcasing development skills, React, Next.js, TypeScript projects, and modern web technologies.",
    keywords: ["portfolio", "developer", "react", "nextjs", "typescript"]
  },
  dashboard: {
    title: "Dashboard | Nhat Trung Portfolio",
    description: "Admin dashboard for managing portfolio content, projects, and analytics.",
    keywords: ["dashboard", "admin", "portfolio management"]
  },
  about: {
    title: "About Me | Nhat Trung Portfolio", 
    description: "Learn more about Nhat Trung's background, skills, and experience in development.",
    keywords: ["about", "developer", "experience", "skills"]
  },
  projects: {
    title: "Projects | Nhat Trung Portfolio",
    description: "Explore Nhat Trung's portfolio of web development projects built with modern technologies.",
    keywords: ["projects", "web development", "portfolio", "case studies"]
  },
  tech: {
    title: "Tech Stack | Nhat Trung Portfolio",
    description: "Technologies and tools used by Nhat Trung in development projects.",
    keywords: ["tech stack", "technologies", "tools", "skills"]
  }
};

/**
 * Generate page metadata
 */
export function generatePageMetadata(
  page: string, 
  customConfig?: Partial<SEOConfig>
): SEOConfig {
  const pageConfig = pageSEO[page] || {};
  return {
    ...baseSEO,
    ...pageConfig,
    ...customConfig,
    title: customConfig?.title || pageConfig.title || baseSEO.title,
    description: customConfig?.description || pageConfig.description || baseSEO.description
  };
}

/**
 * Generate structured data for Person/Profile
 */
export function generatePersonStructuredData(config: SEOConfig): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.author,
    url: config.url,
    description: config.description,
    image: `${config.url}${config.image}`,
    jobTitle: 'Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    knowsAbout: config.keywords,
    sameAs: [
      'https://github.com/nhattrung',
      'https://linkedin.com/in/nhattrung',
      'https://twitter.com/nhattrung_dev'
    ]
  };
}

/**
 * Generate structured data for Website
 */
export function generateWebsiteStructuredData(config: SEOConfig): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.siteName,
    url: config.url,
    description: config.description,
    author: {
      '@type': 'Person',
      name: config.author
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate structured data for Portfolio/Collection
 */
export function generatePortfolioStructuredData(config: SEOConfig): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${config.author} Portfolio`,
    description: config.description,
    url: config.url,
    author: {
      '@type': 'Person',
      name: config.author
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Portfolio Projects',
      description: 'Collection of web development projects'
    }
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nhattrung.dev';
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /dashboard/
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow important pages
Allow: /
Allow: /about
Allow: /projects
Allow: /tech
Allow: /contact`;
}

/**
 * Generate sitemap.xml content
 */
export function generateSitemap(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nhattrung.dev';
  const currentDate = new Date().toISOString();
  
  const pages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/projects', priority: '0.9', changefreq: 'weekly' },
    { url: '/tech', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' }
  ];

  const sitemapItems = pages.map(page => 
    `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems}
</urlset>`;
}
