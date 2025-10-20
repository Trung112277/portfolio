"use client";

import { memo, useEffect, useState } from "react";
import { LoadingSpinner } from "./loading-spinner";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
  isLoading: boolean;
  isInitialLoad?: boolean;
  className?: string;
}

export const PageLoader = memo(({ isLoading, isInitialLoad = false, className }: PageLoaderProps) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading immediately for initial load, even during SSR
  // For navigation loading, only show on client side
  if (!isLoading) return null;
  if (!isInitialLoad && !isClient) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        "transition-opacity duration-300",
        className
      )}
      role="status"
      aria-label={isInitialLoad ? "Page loading" : "Page loading"}
      suppressHydrationWarning={true}
    >
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" color="primary" />
        <p className="text-lg text-primary animate-pulse">
          {isInitialLoad ? "Loading website..." : "Loading page..."}
        </p>
      </div>
    </div>
  );
});

PageLoader.displayName = "PageLoader";
