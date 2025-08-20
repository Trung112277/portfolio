"use client";

import { lazy, Suspense, memo } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy load 3D components để giảm bundle size
const ThreeDSection = lazy(() => import("./threed-section"));

interface LazyThreeDSectionProps {
  fallback?: React.ReactNode;
}

const LazyThreeDSection = memo(({ fallback }: LazyThreeDSectionProps) => {
  const defaultFallback = (
    <div className="w-full h-full min-h-[800px] flex items-center justify-center bg-gradient-to-b from-gray-900 to-black rounded-lg">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading 3D Scene...</p>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <ThreeDSection />
    </Suspense>
  );
});

LazyThreeDSection.displayName = "LazyThreeDSection";

export default LazyThreeDSection;
