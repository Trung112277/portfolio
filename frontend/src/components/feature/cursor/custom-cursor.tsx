"use client";

import { useEffect, useRef, useCallback } from "react";
import TrailDots from "./trail-dots";
import { useUIStore } from "@/stores";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { 
    cursorEnabled, 
    cursorSize, 
    cursorTrailEnabled,
    setScrolling 
  } = useUIStore();

  // Optimized mouse move handler with useCallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    try {
      if (!cursorEnabled) return;
      
      const cursor = cursorRef.current;
      if (!cursor) return;

      const x = e.clientX - (cursorSize / 2);
      const y = e.clientY - (cursorSize / 2);

      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    } catch (err) {
      console.error('Mouse move error:', err);
    }
  }, [cursorEnabled, cursorSize]);

  // Mouse move event listener
  useEffect(() => {
    if (!cursorEnabled) return;
    
    try {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    } catch (err) {
      console.error('Event listener error:', err);
    }
  }, [handleMouseMove, cursorEnabled]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
      const timeout = setTimeout(() => setScrolling(false), 150);
      return () => clearTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrolling]);

  // Don't render if cursor is disabled
  if (!cursorEnabled) {
    return null;
  }

  return (
    <div id="custom-cursor">
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
        }}
      />
      
      {/* Trail dots component */}
      {cursorTrailEnabled && <TrailDots />}
    </div>
  );
}