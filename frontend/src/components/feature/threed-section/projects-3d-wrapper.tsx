'use client';

import { memo } from 'react';
import LazyThreeDSection from '@/components/feature/threed-section/lazy-threed-section';

const Projects3DWrapper = memo(() => {
  return (
    <div className="w-full h-full">
      <LazyThreeDSection />
    </div>
  );
});

Projects3DWrapper.displayName = "Projects3DWrapper";

export default Projects3DWrapper;
