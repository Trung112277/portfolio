"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
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
      setIsGlobalLoading(!!loader);
    };

    // Check immediately
    checkGlobalLoading();

    // Check periodically
    const interval = setInterval(checkGlobalLoading, 100);

    return () => clearInterval(interval);
  }, [isInitialized]);

  // Handle dashboard internal navigation with skeleton
  useEffect(() => {
    if (!isInitialized) return;

    if (pathname.startsWith("/dashboard")) {
      const previousPath = sessionStorage.getItem("previousPath") || "";

      console.log("DashboardLoadingProvider effect:", {
        pathname,
        previousPath,
        isFirstLoad,
        isDashboardLoading,
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

      // Skip skeleton when coming from outside dashboard
      if (previousPath && !previousPath.startsWith("/dashboard")) {
        console.log("Coming from outside dashboard, no skeleton");
        setIsDashboardLoading(false);
        sessionStorage.setItem("previousPath", pathname);
        return;
      }

      // Only show skeleton if we're actually navigating between different dashboard pages
      if (
        previousPath &&
        previousPath.startsWith("/dashboard") &&
        previousPath !== pathname
      ) {
        console.log("Dashboard internal navigation, showing skeleton...");
        setIsDashboardLoading(true);

        // Show skeleton for 300ms
        setTimeout(() => {
          setIsDashboardLoading(false);
        }, 300);
      } else {
        // No navigation, no skeleton
        console.log("No navigation, no skeleton");
        setIsDashboardLoading(false);
      }
    }

    // Update sessionStorage
    sessionStorage.setItem("previousPath", pathname);
  }, [pathname, isFirstLoad, isGlobalLoading, isInitialized]);

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
