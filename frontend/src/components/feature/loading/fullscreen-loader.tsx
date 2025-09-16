"use client";

import { memo } from "react";
import { LoadingSpinner } from "@/components/feature/loading/loading-spinner";

interface FullscreenLoaderProps {
  text?: string;
}

const FullscreenLoader = memo(({ text = "Loading..." }: FullscreenLoaderProps) => {
  return (
    <div 
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/90 backdrop-blur-sm"
      data-loading="true"
    >
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
});

FullscreenLoader.displayName = "FullscreenLoader";

export { FullscreenLoader };


