"use client";

import { useEffect, useState } from "react";
import { DashboardSectionLoading } from "./dashboard-loading";

import {
  DashboardOverview,
  DashboardAboutMe,
  DashboardProjects,
  DashboardTech
} from "./sections";

interface DashboardNavigation {
  navigateToSection: (section: string) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

declare global {
  interface Window {
    dashboardNavigation?: DashboardNavigation;
  }
}

export function DashboardContent() {
  const [currentSection, setCurrentSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigateToSection = (section: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentSection(section);
      setIsLoading(false);
    }, 300);
  };

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
    return <DashboardSectionLoading />;
  }

  if (isLoading) {
    return <DashboardSectionLoading />;
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
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      {renderContent()}
    </div>
  );
}
