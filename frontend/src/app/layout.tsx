import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
 
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nhat Trung | Portfolio",
  description: "Nhat Trung's portfolio showcasing frontend development skills and projects",
  keywords: ["portfolio", "frontend", "developer", "react", "nextjs", "typescript"],
  authors: [{ name: "Nhat Trung" }],
  viewport: "width=device-width, initial-scale=1",
  icons: { 
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Nhat Trung | Portfolio",
    description: "Nhat Trung's portfolio showcasing frontend development skills and projects",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhat Trung | Portfolio",
    description: "Nhat Trung's portfolio showcasing frontend development skills and projects",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} font-open-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
