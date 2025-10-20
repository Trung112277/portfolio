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
import { useUserRole } from "@/hooks/useUserRole";


export function AppSidebar() {
  const [currentSection, setCurrentSection] = useState('overview');
  const { loading } = useUserRole();

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

  // Show all menu items for all users
  const processedMenu = DASHBOARD_MENU.map(menu => {
    return { ...menu };
  });

  return (
    <Sidebar className="bg-background text-foreground">
      <SidebarHeader className="h-16 border-b border-border flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center text-primary uppercase">
          Dashboard
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-4 w-full flex flex-col gap-4">
          {loading ? (
            // Show loading state
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : (
            processedMenu.map((menu) => {
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
            })
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
