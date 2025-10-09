"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DashboardOverview } from "@/components/feature/dashboard/sections/dashboard-overview";
import { DashboardAboutMe } from "@/components/feature/dashboard/sections/dashboard-about-me";
import { DashboardProjects } from "@/components/feature/dashboard/sections/dashboard-projects";
import { DashboardTech } from "@/components/feature/dashboard/sections/dashboard-tech";
import { DashboardUser } from "@/components/feature/dashboard/sections/dashboard-user";

export function DashboardContent() {
  const router = useRouter();
  const pathname = usePathname();

  // Initialize currentSection from pathname to avoid showing overview first
  const getInitialSection = () => {
    if (pathname === "/dashboard") return "overview";
    const pathParts = pathname.split("/").filter(Boolean);
    return pathParts[1] || "overview";
  };

  const [currentSection, setCurrentSection] = useState(getInitialSection);


  // Handle pathname changes and navigation
  const prevPathname = useRef(pathname);
  const currentSectionRef = useRef(currentSection);
  currentSectionRef.current = currentSection;
  
  useEffect(() => {
    // Handle initial redirect from /dashboard to /dashboard/overview
    if (pathname === "/dashboard") {
      router.replace("/dashboard/overview");
      setCurrentSection("overview");
      prevPathname.current = "/dashboard/overview";
      return;
    }

    // Handle other pathname changes
    if (pathname !== prevPathname.current) {
      const pathParts = pathname.split("/").filter(Boolean);
      const section = pathParts[1] || "overview";

      // Only update if section is different
      if (section !== currentSectionRef.current) {
        setCurrentSection(section);
      }
      prevPathname.current = pathname;
    }
  }, [pathname, router]);

  const navigateToSection = useCallback(
    (section: string) => {
      // Always update section with loading
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
        return <DashboardUser />;
      default:
        return <DashboardOverview />;
    }
  }, [currentSection]);

  return <div className="dashboard-content">{renderContent}</div>;
}

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
