import { Metadata } from "next";
import DashboardClient from "@/components/pages/dashboard-client";
import { getAuthorNameServerSide } from "@/lib/author-name-server";

// Force dynamic rendering to ensure fresh data on every request
export const dynamic = 'force-dynamic';

// Generate metadata for dashboard page
export async function generateMetadata(): Promise<Metadata> {
  try {
    const authorName = await getAuthorNameServerSide();
    
    return {
      title: `Dashboard | ${authorName} Portfolio`,
      description: "Admin dashboard for managing portfolio content, projects, and analytics.",
      robots: {
        index: false,
        follow: false,
      },
    };
  } catch (error) {
    console.error("Error generating dashboard metadata:", error);
    return {
      title: "Dashboard | Portfolio",
      description: "Admin dashboard for managing portfolio content, projects, and analytics.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

// Server component that renders client component
export default function Dashboard() {
  return <DashboardClient />;
}