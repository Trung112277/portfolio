/**
 * Optimized Custom Cursor Component
 * Enhanced version with performance optimizations
 */

"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import TrailDots from "@/components/feature/cursor/trail-dots";
import { useUIStore } from "@/stores";
import { throttle, rafThrottle, prefersReducedMotion, isMobileDevice } from "@/lib/performance-utils";

export function OptimizedCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const { 
    cursorEnabled, 
    cursorSize, 
    cursorTrailEnabled,
    setScrolling 
  } = useUIStore();
  
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());
  const [isMobile, setIsMobile] = useState(() => isMobileDevice());

  // Optimized cursor position update with RAF
  const updateCursorPosition = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor || !cursorEnabled || reducedMotion) return;

    const x = mousePos.x - (cursorSize / 2);
    const y = mousePos.y - (cursorSize / 2);

    // Use transform3d for hardware acceleration
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, [mousePos, cursorEnabled, cursorSize, reducedMotion]);

  // RAF-throttled position update
  const rafUpdatePosition = useCallback(() => {
    rafThrottle(updateCursorPosition)();
  }, [updateCursorPosition]);

  // Throttled mouse move handler (60fps)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cursorEnabled || isMobile) return;
    
    setMousePos({ x: e.clientX, y: e.clientY });
    rafUpdatePosition();
  }, [cursorEnabled, isMobile, rafUpdatePosition]);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    setScrolling(true);
    setTimeout(() => setScrolling(false), 150);
  }, [setScrolling]);

  // Media query listeners with cleanup
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 640px)');
    
    const handleReducedMotionChange = () => setReducedMotion(reducedMotionQuery.matches);
    const handleMobileChange = () => setIsMobile(mobileQuery.matches);
    
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    mobileQuery.addEventListener('change', handleMobileChange);
    
    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      mobileQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  // Optimized mouse event listeners
  useEffect(() => {
    if (!cursorEnabled || isMobile || reducedMotion) return;
    
    const throttledMouseMove = throttle(handleMouseMove as (...args: unknown[]) => unknown, 16);
    
    const controller = new AbortController();
    const { signal } = controller;
    
    document.addEventListener("mousemove", throttledMouseMove as EventListener, { 
      passive: true,
      signal
    });
    
    return () => controller.abort();
  }, [handleMouseMove, cursorEnabled, isMobile, reducedMotion]);

  // Optimized hover detection with event delegation
  useEffect(() => {
    if (!cursorEnabled || isMobile) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const isInteractive = target.matches(
        'button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])'
      );
      setIsHovering(isInteractive);
    };

    const controller = new AbortController();
    document.addEventListener('mouseover', handleMouseOver, { 
      passive: true,
      signal: controller.signal
    });

    return () => controller.abort();
  }, [cursorEnabled, isMobile]);

  // Scroll event listener
  useEffect(() => {
    const throttledScroll = throttle(handleScroll as (...args: unknown[]) => unknown, 100);
    
    const controller = new AbortController();
    
    window.addEventListener('scroll', throttledScroll as EventListener, { 
      passive: true,
      signal: controller.signal
    });
    
    return () => controller.abort();
  }, [handleScroll]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    const cleanup = () => {
      const currentAnimationRef = animationRef.current;
      if (currentAnimationRef) {
        cancelAnimationFrame(currentAnimationRef);
      }
    };
    
    return cleanup;
  }, []);

  // Early return for disabled states
  if (!cursorEnabled || isMobile || reducedMotion) {
    return null;
  }

  return (
    <div id="optimized-custom-cursor">
      {/* Main cursor with optimized styles */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          borderRadius: '50%',
          backgroundColor: 'rgba(31, 195, 255, 0.8)',
          mixBlendMode: 'difference',
          willChange: 'transform', // Optimize for animations
          backfaceVisibility: 'hidden', // Prevent flickering
        }}
      />
      
      {/* Trail dots with conditional rendering */}
      {cursorTrailEnabled && <TrailDots />}
    </div>
  );
}

export default OptimizedCustomCursor;
