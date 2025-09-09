import { Metadata } from "next";
import { DashboardContent } from "@/components/feature/dashboard/dashboard-content";
import { generateSEOMetadata } from "@/components/seo/page-head";

// Generate metadata for this page
export const metadata: Metadata = generateSEOMetadata({
  page: "dashboard",
  description: "Admin dashboard for managing portfolio content, projects, and analytics.",
  keywords: ["dashboard", "admin", "portfolio management", "content management"],
});

export default function Dashboard() {
  return <DashboardContent />;
}