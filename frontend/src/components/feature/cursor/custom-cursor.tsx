"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import TrailDots from "./trail-dots";

// Constants
const CURSOR_SIZE = 24;
const CURSOR_OFFSET = CURSOR_SIZE / 2;

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [error, setError] = useState<string | null>(null);

  // Optimized mouse move handler with useCallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    try {
      setMousePosition({ x: e.clientX, y: e.clientY });
    } catch (err) {
      setError(`Mouse move error: ${err}`);
    }
  }, []);

  // Mouse move event listener
  useEffect(() => {
    try {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    } catch (err) {
      setError(`Event listener error: ${err}`);
    }
  }, [handleMouseMove]);

  // Update cursor position with error handling
  useEffect(() => {
    try {
      const cursor = cursorRef.current;
      if (!cursor) return;

      cursor.style.left = `${mousePosition.x - CURSOR_OFFSET}px`;
      cursor.style.top = `${mousePosition.y - CURSOR_OFFSET}px`;
    } catch (err) {
      setError(`Cursor position error: ${err}`);
    }
  }, [mousePosition]);

  // Error boundary
  if (error) {
    console.error('CustomCursor error:', error);
    return <div style={{ display: 'none' }}>Custom cursor error: {error}</div>;
  }

  return (
    <div id="custom-cursor">
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
      />
      
      {/* Trail dots component with error boundary */}
      <TrailDots mousePosition={mousePosition} />
    </div>
  );
}