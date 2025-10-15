// Import semver fix
import "@/lib/semver-fix";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CustomCursor } from "@/components/feature/cursor/custom-cursor";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import ErrorBoundary from "@/components/common/error-boundary";
import { initEnhancedPerformanceMonitoring } from "@/lib/analytics";
import { initResourceHints } from "@/lib/resource-hints";
import { initCriticalCSS, getCriticalCSS } from "@/lib/critical-css";
import { serviceWorkerManager } from "@/lib/service-worker";
import { SkipLink } from "@/components/common/skip-link";
import { Toaster } from "@/components/ui/sonner";
import { generatePersonStructuredData, generateWebsiteStructuredData, generateBaseSEO } from "@/lib/seo";
import { getAuthorNameServerSide } from "@/lib/author-name-server";
import { GlobalRealtimeProvider } from "@/components/providers/global-realtime-provider";


const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

// Force dynamic rendering to ensure fresh data on every request
export const dynamic = 'force-dynamic';

/**
 * Generate metadata for the root layout
 * This function runs on every request to ensure fresh data
 * Only sets common metadata - each page manages its own title
 */
export async function generateMetadata(): Promise<Metadata> {
  // Always fetch fresh author name on every request
  let authorName = "Developer";
  
  try {
    authorName = await getAuthorNameServerSide();
  } catch (error) {
    console.error("Error fetching author name in generateMetadata:", error);
    // Continue with fallback
  }
  
  const seoConfig = generateBaseSEO(authorName);
  
  return {
    metadataBase: new URL(seoConfig.url),
    // Always set title immediately to prevent flash
    title: `${authorName} | Portfolio`,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    authors: [{ name: seoConfig.author }],
    creator: seoConfig.author,
    publisher: seoConfig.author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicon.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon.png",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      type: seoConfig.type,
      locale: seoConfig.locale,
      url: seoConfig.url,
      title: `${authorName} | Portfolio`,
      description: seoConfig.description,
      siteName: seoConfig.siteName,
      images: [
        {
          url: `${seoConfig.url}${seoConfig.image}`,
          width: 1200,
          height: 630,
          alt: seoConfig.description,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${authorName} | Portfolio`,
      description: seoConfig.description,
      images: [`${seoConfig.url}${seoConfig.image}`],
      creator: seoConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    },
  };
}



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize performance optimizations on client side
  if (typeof window !== "undefined") {
    // Initialize enhanced performance monitoring
    initEnhancedPerformanceMonitoring();

    // Initialize resource hints
    initResourceHints();

    // Initialize critical CSS
    initCriticalCSS({
      css: getCriticalCSS(),
      preload: true,
      nonCriticalUrl: "/styles/non-critical.css",
    });

    // Register service worker in production
    if (process.env.NODE_ENV === "production") {
      serviceWorkerManager.register();
    }
  }

  // Generate structured data with dynamic author name
  // Reuse the same author name fetching logic to ensure consistency
  let personStructuredData, websiteStructuredData, authorName;
  try {
    authorName = await getAuthorNameServerSide();
    personStructuredData = generatePersonStructuredData(authorName);
    websiteStructuredData = generateWebsiteStructuredData(authorName);
  } catch (error) {
    console.error("Error generating structured data:", error);
    // Fallback to static structured data with consistent author name
    authorName = "Developer";
    personStructuredData = generatePersonStructuredData(authorName);
    websiteStructuredData = generateWebsiteStructuredData(authorName);
  }

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_location: window.location.href,
                  send_page_view: false
                });
              `}
            </Script>
          </>
        )}

        {/* Structured Data */}
        <Script
          id="structured-data-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <Script
          id="structured-data-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preload author name data */}
        <link rel="preload" href="/api/author-name" as="fetch" crossOrigin="anonymous" />

        {/* Load semver fix before any React code */}
        <Script src="/semver-fix.js" strategy="beforeInteractive" />
      
      </head>
      <body
        className={`${openSans.variable} font-open-sans antialiased`}
        data-scroll-behavior="smooth"
      >
        <SkipLink />
        <CustomCursor />
        <ErrorBoundary>
          <GlobalRealtimeProvider>
            <ScrollToTop />
            <div id="main-content">{children}</div>
            <Toaster />
          </GlobalRealtimeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
