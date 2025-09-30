"use client";

import { useEffect, useState, useCallback, Suspense, lazy } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DashboardSkeleton } from "@/components/feature/loading/dashboard-skeleton";

// Lazy load components
const DashboardOverview = lazy(() => import("@/components/feature/dashboard/sections/dashboard-overview").then(module => ({ default: module.DashboardOverview })));
const DashboardAboutMe = lazy(() => import("@/components/feature/dashboard/sections/dashboard-about-me").then(module => ({ default: module.DashboardAboutMe })));
const DashboardProjects = lazy(() => import("@/components/feature/dashboard/sections/dashboard-projects").then(module => ({ default: module.DashboardProjects })));
const DashboardTech = lazy(() => import("@/components/feature/dashboard/sections/dashboard-tech").then(module => ({ default: module.DashboardTech })));
const DashboardUser = lazy(() => import("@/components/feature/dashboard/sections/dashboard-user").then(module => ({ default: module.DashboardUser })));

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
  const [isSectionLoading, setIsSectionLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle initial load and redirect
  useEffect(() => {
    // Mark initial load as complete after a short delay
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 200);

    if (pathname === '/dashboard') {
      router.replace('/dashboard/overview');
      setCurrentSection('overview');
      return () => clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [pathname, router]);

  // Handle pathname changes for navigation (separate effect)
  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean);
    const section = pathParts[1] || 'overview';
    
    // Only update if section is different and not initial load
    if (section !== currentSection && !isInitialLoad) {
      setIsSectionLoading(true);
      setCurrentSection(section);
      
      // Hide loading after a short delay to allow content to render
      setTimeout(() => {
        setIsSectionLoading(false);
      }, 100);
    }
  }, [pathname, currentSection, isInitialLoad]);

  const navigateToSection = useCallback((section: string) => {
    // Always update section immediately for better UX on slow networks
    if (section !== currentSection) {
      console.log('Navigating to section:', section, 'from:', currentSection);
      
      setIsSectionLoading(true);
      setCurrentSection(section);
      
      // Update URL without page reload
      const newPath = `/dashboard/${section}`;
      router.replace(newPath, { scroll: false });
      // Also update the URL manually to ensure no page reload
      window.history.replaceState(null, '', newPath);
      
      // Hide loading after a short delay
      setTimeout(() => {
        setIsSectionLoading(false);
      }, 100);
    } else {
      // Force update even if section is the same (for slow networks)
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
    if (urlSection !== currentSection && !isInitialLoad) {
      console.log('Fallback: URL section', urlSection, 'does not match current section', currentSection);
      setCurrentSection(urlSection);
    }
  }, [pathname, currentSection, isInitialLoad]);

  const renderContent = () => {
    switch (currentSection) {
      case 'overview':
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardOverview />
          </Suspense>
        );
      case 'about-me':
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardAboutMe />
          </Suspense>
        );
      case 'projects':
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardProjects />
          </Suspense>
        );
      case 'tech':
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardTech />
          </Suspense>
        );
      case 'user':
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardUser />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardOverview />
          </Suspense>
        );
    }
  };

  return (
    <div className="dashboard-content">
      {isInitialLoad || isSectionLoading ? <DashboardSkeleton /> : renderContent()}
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
