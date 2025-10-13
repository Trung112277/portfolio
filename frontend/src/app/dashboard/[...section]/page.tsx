import { Metadata } from "next";
import { DashboardContent } from "@/components/feature/dashboard/dashboard-content";
import { getAuthorNameServerSide } from "@/lib/author-name-server";

// Force dynamic rendering to ensure fresh data on every request
export const dynamic = 'force-dynamic';

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
    console.error("Error generating dashboard section metadata:", error);
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

export default function DashboardSection() {
  return <DashboardContent />;
}
