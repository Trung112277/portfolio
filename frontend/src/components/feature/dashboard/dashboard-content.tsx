"use client";

import { useEffect, useState, useCallback, useRef, useMemo, memo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DashboardOverview } from "@/components/feature/dashboard/sections/dashboard-overview";
import { DashboardAboutMe } from "@/components/feature/dashboard/sections/dashboard-about-me";
import { DashboardProjects } from "@/components/feature/dashboard/sections/dashboard-projects";
import { DashboardTech } from "@/components/feature/dashboard/sections/dashboard-tech";
import { DashboardUser } from "@/components/feature/dashboard/sections/dashboard-user";
import { useUserRole } from "@/hooks/useUserRole";
import { AccessDenied } from "@/components/common/access-denied";

const DashboardContent = memo(function DashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin, loading: roleLoading } = useUserRole();

  // Initialize currentSection from pathname to avoid showing overview first
  const getInitialSection = () => {
    if (pathname === "/dashboard") return "overview";
    const pathParts = pathname.split("/").filter(Boolean);
    return pathParts[1] || "overview";
  };

  const [currentSection, setCurrentSection] = useState(getInitialSection);
  const [isRedirecting, setIsRedirecting] = useState(pathname === "/dashboard");
  const hasRedirectedRef = useRef(false);


  // Handle pathname changes and navigation
  const prevPathname = useRef(pathname);
  const currentSectionRef = useRef(currentSection);
  currentSectionRef.current = currentSection;
  
  useEffect(() => {
    // Handle initial redirect from /dashboard to /dashboard/overview
    if (pathname === "/dashboard" && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      setIsRedirecting(true);
      router.replace("/dashboard/overview");
      setCurrentSection("overview");
      prevPathname.current = "/dashboard/overview";
      return;
    }

    // Handle other pathname changes
    if (pathname !== prevPathname.current) {
      const pathParts = pathname.split("/").filter(Boolean);
      const section = pathParts[1] || "overview";

      // Allow all users to access all sections, content will be controlled by role
      if (section !== currentSectionRef.current) {
        setCurrentSection(section);
      }
      prevPathname.current = pathname;
      setIsRedirecting(false); // Clear redirecting state when pathname changes
    }
  }, [pathname, router, isAdmin, roleLoading]);

  const navigateToSection = useCallback(
    (section: string) => {
      // Allow all users to navigate to all sections
      if (section !== currentSection) {
        // Update URL first
        const newPath = `/dashboard/${section}`;
        router.replace(newPath, { scroll: false });
        window.history.replaceState(null, "", newPath);

        // Handle section change with loading
        setCurrentSection(section);
      } else {
        // Force update even if section is the same
        setCurrentSection(section);
      }
    },
    [currentSection, router]
  );

  // Make navigation available globally for sidebar
  const navigateToSectionRef = useRef(navigateToSection);
  navigateToSectionRef.current = navigateToSection;
  
  useEffect(() => {
    window.dashboardNavigation = {
      navigateToSection: navigateToSectionRef.current,
      currentSection,
      setCurrentSection,
    };
  }, [currentSection]);


  const renderContent = useMemo(() => {
    switch (currentSection) {
      case "overview":
        return <DashboardOverview />;
      case "about-me":
        return <DashboardAboutMe />;
      case "projects":
        return <DashboardProjects />;
      case "tech":
        return <DashboardTech />;
      case "user":
        // Show content based on user role
        if (isAdmin) {
          return <DashboardUser />;
        } else {
          // Show access denied message for regular users
          return (
            <AccessDenied
              title="User Management Access Denied"
              message="You don't have permission to access the User Management section."
              description="Only administrators can manage user accounts and roles."
              onBack={() => navigateToSection("overview")}
            />
          );
        }
      default:
        return <DashboardOverview />;
    }
  }, [currentSection, isAdmin, navigateToSection]);

  // Don't render content while redirecting or when on /dashboard to prevent double render
  if (isRedirecting || pathname === "/dashboard") {
    return (
      <div className="dashboard-content">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return <div className="dashboard-content">{renderContent}</div>;
});

// Global interface for navigation
declare global {
  interface Window {
    dashboardNavigation?: {
      navigateToSection: (section: string) => void;
      currentSection: string;
      setCurrentSection: (section: string) => void;
    };
  }
}

export { DashboardContent };
