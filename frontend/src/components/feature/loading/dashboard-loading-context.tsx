"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { DashboardSkeleton } from "./dashboard-skeleton";

interface DashboardLoadingContextType {
  isDashboardLoading: boolean;
  setIsDashboardLoading: (loading: boolean) => void;
}

const DashboardLoadingContext = createContext<
  DashboardLoadingContextType | undefined
>(undefined);

export function useDashboardLoading() {
  const context = useContext(DashboardLoadingContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardLoading must be used within a DashboardLoadingProvider"
    );
  }
  return context;
}

interface DashboardLoadingProviderProps {
  children: ReactNode;
}

export function DashboardLoadingProvider({
  children,
}: DashboardLoadingProviderProps) {
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [wasGlobalLoading, setWasGlobalLoading] = useState(false);
  const pathname = usePathname();

  // Initialize after a delay to let LoadingProvider run first
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Check if global loading is active
  useEffect(() => {
    if (!isInitialized) return;

    const checkGlobalLoading = () => {
      const loader = document.querySelector('[data-loading="true"]');
      const currentlyLoading = !!loader;
      
      // Track when global loading ends
      if (isGlobalLoading && !currentlyLoading) {
        setWasGlobalLoading(true);
        // Reset after a delay to allow navigation logic to run
        setTimeout(() => setWasGlobalLoading(false), 100);
      }
      
      setIsGlobalLoading(currentlyLoading);
    };

    // Check immediately
    checkGlobalLoading();

    // Check periodically
    const interval = setInterval(checkGlobalLoading, 100);

    return () => clearInterval(interval);
  }, [isInitialized, isGlobalLoading]);

  // Handle dashboard navigation logic
  const handleDashboardNavigation = useCallback(() => {
    if (!isInitialized) return;

    if (pathname.startsWith("/dashboard")) {
      const previousPath = sessionStorage.getItem("previousPath") || "";

      console.log("DashboardLoadingProvider effect:", {
        pathname,
        previousPath,
        isFirstLoad,
        isGlobalLoading,
        isInitialized,
      });

      // Skip skeleton if global loading is active
      if (isGlobalLoading) {
        console.log("Global loading active, no skeleton");
        setIsDashboardLoading(false);
        return;
      }

      // Skip skeleton on first load
      if (isFirstLoad) {
        console.log("Dashboard first load, no skeleton");
        setIsFirstLoad(false);
        setIsDashboardLoading(false);
        sessionStorage.setItem("previousPath", pathname);
        return;
      }

      // Show skeleton when coming from outside dashboard, but skip if global loading just ended
      if (previousPath && !previousPath.startsWith("/dashboard")) {
        if (wasGlobalLoading) {
          console.log("Global loading just ended, skipping skeleton");
          setIsDashboardLoading(false);
        } else {
          console.log("Coming from outside dashboard, showing skeleton...");
          setIsDashboardLoading(true);
          
          // Show skeleton for 500ms to allow content to load
          setTimeout(() => {
            setIsDashboardLoading(false);
          }, 500);
        }
        
        sessionStorage.setItem("previousPath", pathname);
        return;
      }

      // Skip skeleton for internal dashboard navigation - DashboardContent handles this
      if (
        previousPath &&
        previousPath.startsWith("/dashboard") &&
        previousPath !== pathname
      ) {
        console.log("Dashboard internal navigation, skipping skeleton (handled by DashboardContent)");
        setIsDashboardLoading(false);
      } else {
        // No navigation, no skeleton
        console.log("No navigation, no skeleton");
        setIsDashboardLoading(false);
      }
    }

    // Update sessionStorage
    sessionStorage.setItem("previousPath", pathname);
  }, [pathname, isFirstLoad, isGlobalLoading, isInitialized, wasGlobalLoading]);

  // Handle dashboard internal navigation with skeleton
  useEffect(() => {
    handleDashboardNavigation();
  }, [handleDashboardNavigation]);

  // Don't render anything if global loading is active
  if (isGlobalLoading) {
    console.log(
      "DashboardLoadingProvider: Global loading active, rendering children directly"
    );
    return <>{children}</>;
  }

  console.log("DashboardLoadingProvider render:", {
    isDashboardLoading,
    isGlobalLoading,
    isInitialized,
    pathname,
  });

  return (
    <DashboardLoadingContext.Provider
      value={{ isDashboardLoading, setIsDashboardLoading }}
    >
      {isDashboardLoading ? <DashboardSkeleton /> : children}
    </DashboardLoadingContext.Provider>
  );
}
