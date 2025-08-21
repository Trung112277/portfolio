'use client'
import { Suspense, lazy } from "react";
import { useEffect, useState } from "react";

// Lazy load the heavy 3D components
const ThreeDSection = lazy(() => import('./threed-section'));

// Lightweight fallback component
const ThreeDFallback = () => (
  <div className="scene w-full h-full min-h-[800px] flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
    <div className="text-center text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
      <p className="text-lg font-semibold">Loading 3D Experience...</p>
      <p className="text-sm opacity-75 mt-2">Please wait while we load the interactive elements</p>
    </div>
  </div>
);

export default function LazyThreeDSection() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Load 3D content immediately when component mounts
    const loadImmediately = () => {
      console.log('Loading 3D section immediately');
      setShouldLoad(true);
    };

    // Listen for custom event from loading provider (backup)
    const handleLoad3D = () => {
      console.log('Received load3d event');
      setShouldLoad(true);
    };

    // Load immediately with minimal delay
    const timer = setTimeout(loadImmediately, 100);

    // Also listen for custom event as backup
    window.addEventListener('load3d', handleLoad3D);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load3d', handleLoad3D);
    };
  }, [isClient]);

  return (
    <div id="3d-section-container" className="w-full h-full">
      {!shouldLoad ? (
        <ThreeDFallback />
      ) : (
        <div id="3d-section">
          <Suspense fallback={<ThreeDFallback />}>
            <ThreeDSection />
          </Suspense>
        </div>
      )}
    </div>
  );
}
