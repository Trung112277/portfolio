"use client";

import { lazy, Suspense, memo } from "react";
import { LoadingSpinner } from "@/components/feature/loading/loading-spinner";
import { FullscreenLoader } from "@/components/feature/loading/fullscreen-loader";

// Lazy load 3D components để giảm bundle size
const ThreeDSection = lazy(() => import("./threed-section"));

interface LazyThreeDSectionProps {
  fallback?: React.ReactNode;
}

const LazyThreeDSection = memo(({ fallback }: LazyThreeDSectionProps) => {
  const defaultFallback = (
    <FullscreenLoader text="Loading 3D Scene..." />
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <ThreeDSection />
    </Suspense>
  );
});

LazyThreeDSection.displayName = "LazyThreeDSection";

export default LazyThreeDSection;
