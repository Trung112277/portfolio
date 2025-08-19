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
  description: "Nhat Trung's portfolio",
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
