"use client";

import { useEffect } from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  useEffect(() => {
    if (isLoading) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 bg-transparent"
      style={{ 
        zIndex: 99999, // Higher than Dialog's z-index
        pointerEvents: "all",
        userSelect: "none"
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // Prevent dialog from closing
        return false;
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }}
      onMouseUp={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }}
    />
  );
}