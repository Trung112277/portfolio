import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/feature/cursor/custom-cursor";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { StoreProvider } from "@/components/feature/loading/store-provider";
import { LoadingProvider } from "@/components/feature/loading/loading-provider";
import ErrorBoundary from "@/components/common/error-boundary";
import { initPerformanceMonitoring } from "@/lib/analytics";
import { initResourceHints } from "@/lib/resource-hints";
import { initCriticalCSS, getCriticalCSS } from "@/lib/critical-css";
import { serviceWorkerManager } from "@/lib/service-worker";
import { SkipLink } from "@/components/common/skip-link";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Nhat Trung | Portfolio",
  description:
    "Nhat Trung's portfolio showcasing frontend development skills and projects",
  keywords: [
    "portfolio",
    "frontend",
    "developer",
    "react",
    "nextjs",
    "typescript",
  ],
  authors: [{ name: "Nhat Trung" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Nhat Trung | Portfolio",
    description:
      "Nhat Trung's portfolio showcasing frontend development skills and projects",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/open-graph/open-graph-1.png",
        width: 1200,
        height: 630,
        alt: "Nhat Trung | Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhat Trung | Portfolio",
    description:
      "Nhat Trung's portfolio showcasing frontend development skills and projects",
    images: ["/open-graph/open-graph-1.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize performance optimizations on client side
  if (typeof window !== "undefined") {
    // Initialize performance monitoring
    initPerformanceMonitoring();

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

  return (
    <html lang="en">
      <body
        className={`${openSans.variable} font-open-sans antialiased`}
        data-scroll-behavior="smooth"
      >
        <SkipLink />
        <CustomCursor />
        <ErrorBoundary>
          <LoadingProvider>
            <StoreProvider>
              <ScrollToTop />
              <div id="main-content">{children}</div>
            </StoreProvider>
          </LoadingProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
