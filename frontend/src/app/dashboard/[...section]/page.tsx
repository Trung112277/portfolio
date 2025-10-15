import { Metadata } from "next";
import { DashboardContent } from "@/components/feature/dashboard/dashboard-content";
import { getAuthorNameServerSide } from "@/lib/author-name-server";
import { DynamicTitle } from "@/components/common/dynamic-title";

// Use SSR for better performance and SEO
// export const dynamic = 'force-static'; // Comment out to use default SSR

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

export default async function DashboardSection() {
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
