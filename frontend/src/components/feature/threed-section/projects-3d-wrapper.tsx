'use client';

import { memo, useState, useEffect } from 'react';
import ThreeDSection from '@/components/feature/threed-section/threed-section';
import { LoadingSpinner } from '@/components/feature/loading/loading-spinner';

const Projects3DWrapper = memo(() => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load immediately instead of waiting for intersection
    const timer = setTimeout(() => {
      setShouldLoad(true);
      // Keep loading state for a bit longer to show smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 1000); // Minimum 1 second loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!shouldLoad || isLoading ? (
        <div className="w-full h-full min-h-[800px] flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
          <div className="text-center text-white">
            <div className="relative">
              <LoadingSpinner size="xl" color="white" className="mx-auto mb-4" />
              <div className="absolute inset-0 animate-pulse">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20"></div>
              </div>
            </div>
            <p className="text-lg font-semibold animate-pulse">Loading 3D Experience...</p>
            <p className="text-sm opacity-75 mt-2 animate-pulse">Preparing interactive 3D visualization</p>
            <div className="mt-4 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <ThreeDSection />
      )}
    </div>
  );
});

Projects3DWrapper.displayName = "Projects3DWrapper";

export default Projects3DWrapper;
