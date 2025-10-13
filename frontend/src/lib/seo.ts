/**
 * SEO Configuration and Utilities
 * Comprehensive SEO setup for the portfolio
 */

export interface SEOConfig {
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

/**
 * Generate base SEO configuration with dynamic author name
 */
export function generateBaseSEO(authorName: string = "Developer"): SEOConfig {
  // Ensure authorName is a string and has a fallback
  const safeAuthorName = typeof authorName === 'string' && authorName.trim() ? authorName : "Developer";
  const socialHandle = safeAuthorName.toLowerCase().replace(/\s+/g, '');
  
  return {
    description: `Professional portfolio showcasing ${safeAuthorName}'s development skills, React, Next.js, TypeScript projects, and modern web technologies. Experienced developer with expertise in creating responsive, performant web applications.`,
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
    author: safeAuthorName,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.dev",
    image: "/open-graph/open-graph-1.png",
    type: "website",
    locale: "en_US",
    siteName: `${safeAuthorName} Portfolio`,
    twitterHandle: `@${socialHandle}`,
    facebookAppId: "your-facebook-app-id"
  };
}

// Default base SEO configuration (fallback)
export const baseSEO: SEOConfig = generateBaseSEO();

/**
 * Generate page-specific SEO configurations with dynamic author name
 */
export function generatePageSEO(authorName: string = "Developer"): Record<string, Partial<SEOConfig>> {
  // Ensure authorName is a string and has a fallback
  const safeAuthorName = typeof authorName === 'string' && authorName.trim() ? authorName : "Developer";
  
  return {
    home: {
      description: `Professional portfolio showcasing ${safeAuthorName}'s development skills, React, Next.js, TypeScript projects, and modern web technologies.`,
      keywords: ["portfolio", "developer", "react", "nextjs", "typescript"]
    },
    dashboard: {
      description: "Admin dashboard for managing portfolio content, projects, and analytics.",
      keywords: ["dashboard", "admin", "portfolio management"]
    },
    about: {
      description: `Learn more about ${safeAuthorName}'s background, skills, and experience in development.`,
      keywords: ["about", "developer", "experience", "skills"]
    },
    projects: {
      description: `Explore ${safeAuthorName}'s portfolio of web development projects built with modern technologies.`,
      keywords: ["projects", "web development", "portfolio", "case studies"]
    },
    tech: {
      description: `Technologies and tools used by ${safeAuthorName} in development projects.`,
      keywords: ["tech stack", "technologies", "tools", "skills"]
    }
  };
}

// Default page-specific SEO configurations (fallback)
export const pageSEO: Record<string, Partial<SEOConfig>> = generatePageSEO();

/**
 * Generate page metadata with dynamic author name
 */
export function generatePageMetadata(
  page: string, 
  authorName: string = "Developer",
  customConfig?: Partial<SEOConfig>
): SEOConfig {
  // Ensure authorName is a string and has a fallback
  const safeAuthorName = typeof authorName === 'string' && authorName.trim() ? authorName : "Developer";
  
  const dynamicBaseSEO = generateBaseSEO(safeAuthorName);
  const dynamicPageSEO = generatePageSEO(safeAuthorName);
  const pageConfig = dynamicPageSEO[page] || {};
  
  return {
    ...dynamicBaseSEO,
    ...pageConfig,
    ...customConfig,
    description: customConfig?.description || pageConfig.description || dynamicBaseSEO.description
  };
}

/**
 * Generate structured data for Person/Profile with dynamic author name
 */
export function generatePersonStructuredData(authorName: string = "Developer"): StructuredData {
  // Ensure authorName is a string and has a fallback
  const safeAuthorName = typeof authorName === 'string' && authorName.trim() ? authorName : "Developer";
  const config = generateBaseSEO(safeAuthorName);
  const socialHandle = safeAuthorName.toLowerCase().replace(/\s+/g, '');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: safeAuthorName,
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
      `https://github.com/${socialHandle}`,
      `https://linkedin.com/in/${socialHandle}`,
      `https://twitter.com/${socialHandle}`
    ]
  };
}

/**
 * Generate structured data for Website with dynamic author name
 */
export function generateWebsiteStructuredData(authorName: string = "Developer"): StructuredData {
  // Ensure authorName is a string and has a fallback
  const safeAuthorName = typeof authorName === 'string' && authorName.trim() ? authorName : "Developer";
  const config = generateBaseSEO(safeAuthorName);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.siteName,
    url: config.url,
    description: config.description,
    author: {
      '@type': 'Person',
      name: safeAuthorName
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate structured data for Portfolio/Collection with dynamic author name
 */
export function generatePortfolioStructuredData(authorName: string = "Developer"): StructuredData {
  // Ensure authorName is a string and has a fallback
  const safeAuthorName = typeof authorName === 'string' && authorName.trim() ? authorName : "Developer";
  const config = generateBaseSEO(safeAuthorName);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${safeAuthorName} Portfolio`,
    description: config.description,
    url: config.url,
    author: {
      '@type': 'Person',
      name: safeAuthorName
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
 * Generate all structured data with dynamic author name
 */
export function generateAllStructuredData(authorName: string = "Developer") {
  // Ensure authorName is a string and has a fallback
  const safeAuthorName = typeof authorName === 'string' && authorName.trim() ? authorName : "Developer";
  
  return {
    person: generatePersonStructuredData(safeAuthorName),
    website: generateWebsiteStructuredData(safeAuthorName),
    portfolio: generatePortfolioStructuredData(safeAuthorName),
  };
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.dev';
  
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.dev';
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
