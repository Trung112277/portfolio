'use client';

import { memo, useState, useEffect, useRef } from 'react';
import ThreeDSection from '@/components/feature/threed-section/threed-section';
import { LoadingSpinner } from '@/components/feature/loading/loading-spinner';

const Projects3DWrapper = memo(() => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Load when 100px away from viewport
        threshold: 0.1,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      {!shouldLoad ? (
        <div className="w-full h-full min-h-[800px] flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
          <div className="text-center text-white">
            <LoadingSpinner size="xl" color="white" className="mx-auto mb-4" />
            <p className="text-lg font-semibold">Loading 3D Experience...</p>
            <p className="text-sm opacity-75 mt-2">Please wait while we load the interactive elements</p>
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
