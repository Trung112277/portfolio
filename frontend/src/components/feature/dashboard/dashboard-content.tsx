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
    if (pathname === '/dashboard') return 'overview';
    const pathParts = pathname.split('/').filter(Boolean);
    return pathParts[1] || 'overview';
  };
  
  const [currentSection, setCurrentSection] = useState(getInitialSection);

  // Handle initial load and redirect
  useEffect(() => {
    if (pathname === '/dashboard') {
      router.replace('/dashboard/overview');
      setCurrentSection('overview');
    }
  }, [pathname, router]);

  // Handle pathname changes for navigation (separate effect)
  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean);
    const section = pathParts[1] || 'overview';
    
    // Only update if section is different
    if (section !== currentSection) {
      setCurrentSection(section);
    }
  }, [pathname, currentSection]);

  const navigateToSection = useCallback((section: string) => {
    // Always update section immediately
    if (section !== currentSection) {
      console.log('Navigating to section:', section, 'from:', currentSection);
      
      setCurrentSection(section);
      
      // Update URL without page reload
      const newPath = `/dashboard/${section}`;
      router.replace(newPath, { scroll: false });
      // Also update the URL manually to ensure no page reload
      window.history.replaceState(null, '', newPath);
    } else {
      // Force update even if section is the same
      console.log('Force updating section:', section);
      setCurrentSection(section);
    }
  }, [currentSection, router]);

  // Make navigation available globally for sidebar
  useEffect(() => {
    window.dashboardNavigation = {
      navigateToSection,
      currentSection,
      setCurrentSection
    };
  }, [currentSection, navigateToSection]);

  // Fallback: Force update section if URL doesn't match current section
  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean);
    const urlSection = pathParts[1] || 'overview';
    
    // If URL section doesn't match current section, force update
    if (urlSection !== currentSection) {
      console.log('Fallback: URL section', urlSection, 'does not match current section', currentSection);
      setCurrentSection(urlSection);
    }
  }, [pathname, currentSection]);

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
