"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import {
  DashboardOverview,
  DashboardAboutMe,
  DashboardProjects,
  DashboardTech
} from "./sections";
import { DashboardUser } from "./sections/dashboard-user";

export function DashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentSection, setCurrentSection] = useState('overview');
  const [isClient, setIsClient] = useState(false);

  // Extract section from pathname and redirect if needed
  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean);
    
    // If we're exactly on /dashboard, redirect to /dashboard/overview
    if (pathname === '/dashboard') {
      router.replace('/dashboard/overview');
      setCurrentSection('overview');
      return;
    }
    
    const section = pathParts[1] || 'overview'; // Get section after /dashboard/
    setCurrentSection(section);
  }, [pathname, router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigateToSection = (section: string) => {
    // Update URL without page reload and disable prefetching
    const newPath = `/dashboard/${section}`;
    if (pathname !== newPath) {
      // Use replace to avoid adding to browser history
      router.replace(newPath, { scroll: false });
      // Also update the URL manually to ensure no page reload
      window.history.replaceState(null, '', newPath);
    }
    setCurrentSection(section);
  };

  // Make navigation available globally for sidebar
  useEffect(() => {
    if (isClient) {
      window.dashboardNavigation = {
        navigateToSection,
        currentSection,
        setCurrentSection
      };
    }
  }, [isClient, currentSection]);

  if (!isClient) {
    return null;
  }

  const renderContent = () => {
    switch (currentSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'about-me':
        return <DashboardAboutMe />;
      case 'projects':
        return <DashboardProjects />;
      case 'tech':
        return <DashboardTech />;
      case 'user':
        return <DashboardUser />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="dashboard-content">
      {renderContent()}
    </div>
  );
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
