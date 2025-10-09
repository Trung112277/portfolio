// Import React Three Fiber patch first
import "@/lib/react-three-fiber-patch";
import type { Metadata, Viewport } from "next";
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
import { baseSEO, generatePersonStructuredData, generateWebsiteStructuredData } from "@/lib/seo";
import { GlobalRealtimeProvider } from "@/components/providers/global-realtime-provider";


const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseSEO.url),
  title: {
    default: baseSEO.title,
    template: `%s | ${baseSEO.siteName}`
  },
  description: baseSEO.description,
  keywords: baseSEO.keywords,
  authors: [{ name: baseSEO.author }],
  creator: baseSEO.author,
  publisher: baseSEO.author,
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
    type: baseSEO.type,
    locale: baseSEO.locale,
    url: baseSEO.url,
    title: baseSEO.title,
    description: baseSEO.description,
    siteName: baseSEO.siteName,
    images: [
      {
        url: `${baseSEO.url}${baseSEO.image}`,
        width: 1200,
        height: 630,
        alt: baseSEO.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: baseSEO.title,
    description: baseSEO.description,
    images: [`${baseSEO.url}${baseSEO.image}`],
    creator: baseSEO.twitterHandle,
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
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

  // Generate structured data
  const personStructuredData = generatePersonStructuredData(baseSEO);
  const websiteStructuredData = generateWebsiteStructuredData(baseSEO);

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
                  page_title: document.title,
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
