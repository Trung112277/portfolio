"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { DASHBOARD_MENU } from "@/constant/dashboard-menu";
import { DashboardNavButton } from "@/components/button/dashboard-nav-button";


export function AppSidebar() {
  const [currentSection, setCurrentSection] = useState('overview');

  useEffect(() => {
    // Listen for navigation changes from dashboard content
    const checkNavigation = () => {
      if (window.dashboardNavigation) {
        setCurrentSection(window.dashboardNavigation.currentSection);
      }
    };

    // Check immediately and set up interval
    checkNavigation();
    const interval = setInterval(checkNavigation, 100);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (section: string) => {
    if (window.dashboardNavigation) {
      window.dashboardNavigation.navigateToSection(section);
    }
  };

  return (
    <Sidebar className="bg-background text-foreground">
      <SidebarHeader className="h-16 border-b border-border flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center text-primary uppercase">
          Dashboard
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-4 w-full flex flex-col gap-4">
          {DASHBOARD_MENU.map((menu) => {
            const section = menu.path.split('/').pop() || 'overview';
            const isActive = currentSection === section;
            
            return (
              <DashboardNavButton 
                key={menu.path}
                to={menu.path}
                isActive={isActive}
                onNavigate={handleNavigation}
              >
                {menu.name}
              </DashboardNavButton>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
