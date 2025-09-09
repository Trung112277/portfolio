/**
 * SEO Utilities for Next.js App Router
 * Functions to generate metadata and structured data
 */

import { Metadata } from "next";
import { generatePageMetadata, generateBreadcrumbStructuredData } from "@/lib/seo";

interface SEOProps {
  page: string;
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noindex?: boolean;
}

/**
 * Generate metadata for App Router pages
 * Use this in your page.tsx files like: export const metadata = generateSEOMetadata({...})
 */
export function generateSEOMetadata({
  page,
  title,
  description,
  keywords,
  image,
  noindex = false,
}: SEOProps): Metadata {
  const seoConfig = generatePageMetadata(page, {
    title,
    description,
    keywords,
    image
  });

  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    authors: [{ name: seoConfig.author }],
    openGraph: {
      title: seoConfig.title,
      description: seoConfig.description,
      url: seoConfig.url,
      type: seoConfig.type,
      images: [
        {
          url: `${seoConfig.url}${seoConfig.image}`,
          width: 1200,
          height: 630,
          alt: seoConfig.title,
        },
      ],
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: seoConfig.title,
      description: seoConfig.description,
      images: [`${seoConfig.url}${seoConfig.image}`],
      creator: seoConfig.twitterHandle,
    },
    robots: noindex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: seoConfig.url,
    },
  };
}

/**
 * Generate breadcrumb structured data component
 * Use this in your page components for breadcrumb SEO
 */
export function BreadcrumbStructuredData({
  breadcrumbs
}: {
  breadcrumbs: Array<{ name: string; url: string }>
}) {
  const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbs);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbStructuredData),
      }}
    />
  );
}