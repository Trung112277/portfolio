'use client'
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ThreeDErrorBoundary } from "@/components/common/three-d-error-boundary";

// Dynamic import để tránh SSR issues
const ThreeDCanvas = dynamic(() => import('./three-d-canvas'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[800px] bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading 3D Scene...</p>
      </div>
    </div>
  )
});

export default function ThreeDSection() {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for React Three Fiber compatibility
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if React version is compatible
      const reactVersion = React?.version || '';
      if (!reactVersion || reactVersion === '') {
        console.warn('React version not detected, disabling 3D features');
        setHasError(true);
      }
    }
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-[800px] bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-pulse rounded-full h-8 w-8 bg-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-[800px] bg-gray-100 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            3D Scene Unavailable
          </h3>
          <p className="text-sm text-gray-500">
            The 3D visualization is temporarily unavailable due to compatibility issues.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="scene w-full h-full min-h-[800px]">
      <ThreeDErrorBoundary>
        <ThreeDCanvas />
      </ThreeDErrorBoundary>
    </div>
  );
}