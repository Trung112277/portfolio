import { Metadata } from "next";
import { getAuthorNameServerSide } from "@/lib/author-name-server";
import { DashboardContent } from "@/components/feature/dashboard/dashboard-content";
import { DynamicTitle } from "@/components/common/dynamic-title";

// Use SSR for better performance and SEO
// export const dynamic = 'force-static'; // Comment out to use default SSR

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
export default async function Dashboard() {
  // Get author name for dynamic title
  let authorName = "Developer";
  try {
    authorName = await getAuthorNameServerSide();
  } catch (error) {
    console.error("Error fetching author name:", error);
  }

  return (
    <>
      <DynamicTitle title={`Dashboard | ${authorName} Portfolio`} />
      <DashboardContent />
    </>
  );
}