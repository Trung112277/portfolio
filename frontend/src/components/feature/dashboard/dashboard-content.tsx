"use client";

import { useEffect, useState, useCallback } from "react";
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

  // Handle section change
  const handleSectionChange = useCallback(
    (newSection: string) => {
      if (newSection === currentSection) return;
      setCurrentSection(newSection);
    },
    [currentSection]
  );

  // Handle initial load and redirect
  useEffect(() => {
    if (pathname === "/dashboard") {
      router.replace("/dashboard/overview");
      setCurrentSection("overview");
    }
  }, [pathname, router]);

  // Handle pathname changes for navigation (separate effect)
  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const section = pathParts[1] || "overview";

    // Only update if section is different
    if (section !== currentSection) {
      handleSectionChange(section);
    }
  }, [pathname, currentSection, handleSectionChange]);

  const navigateToSection = useCallback(
    (section: string) => {
      // Always update section with loading
      if (section !== currentSection) {
        // Update URL first
        const newPath = `/dashboard/${section}`;
        router.replace(newPath, { scroll: false });
        window.history.replaceState(null, "", newPath);

        // Handle section change with loading
        handleSectionChange(section);
      } else {
        // Force update even if section is the same
        setCurrentSection(section);
      }
    },
    [currentSection, router, handleSectionChange]
  );

  // Make navigation available globally for sidebar
  useEffect(() => {
    window.dashboardNavigation = {
      navigateToSection,
      currentSection,
      setCurrentSection,
    };
  }, [currentSection, navigateToSection]);

  // Fallback: Force update section if URL doesn't match current section
  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const urlSection = pathParts[1] || "overview";

    // If URL section doesn't match current section, force update
    if (urlSection !== currentSection) {
      handleSectionChange(urlSection);
    }
  }, [pathname, currentSection, handleSectionChange]);

  const renderContent = () => {
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
  };

  return <div className="dashboard-content">{renderContent()}</div>;
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
