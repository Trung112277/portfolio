'use client';

import { memo } from 'react';
import ThreeDSection from '@/components/feature/threed-section/threed-section';

const Projects3DWrapper = memo(() => {
  return (
    <div className="w-full h-full">
      <ThreeDSection />
    </div>
  );
});

Projects3DWrapper.displayName = "Projects3DWrapper";

export default Projects3DWrapper;
