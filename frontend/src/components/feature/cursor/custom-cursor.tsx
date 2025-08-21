"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import TrailDots from "./trail-dots";
import { useUIStore } from "@/stores";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const { 
    cursorEnabled, 
    cursorSize, 
    cursorTrailEnabled,
    setScrolling 
  } = useUIStore();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Smooth animation using requestAnimationFrame
  const updateCursorPosition = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor || !cursorEnabled) return;

    const x = mousePos.x - (cursorSize / 2);
    const y = mousePos.y - (cursorSize / 2);

    // Sử dụng transform thay vì left/top để performance tốt hơn
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    
    animationRef.current = requestAnimationFrame(updateCursorPosition);
  }, [mousePos, cursorEnabled, cursorSize]);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    try {
      if (!cursorEnabled) return;
      
      setMousePos({ x: e.clientX, y: e.clientY });
    } catch (err) {
      console.error('Mouse move error:', err);
    }
  }, [cursorEnabled]);

  // Animation loop
  useEffect(() => {
    if (!isClient || !cursorEnabled || reducedMotion) return;
    
    animationRef.current = requestAnimationFrame(updateCursorPosition);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateCursorPosition, cursorEnabled, reducedMotion, isClient]);

  // Mouse move event listener
  useEffect(() => {
    if (!isClient || !cursorEnabled) return;
    
    try {
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => document.removeEventListener("mousemove", handleMouseMove);
    } catch (err) {
      console.error('Event listener error:', err);
    }
  }, [handleMouseMove, cursorEnabled, isClient]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (!isClient) return;
    
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const handler = () => setReducedMotion(media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [isClient]);

  // Detect mobile viewport and disable heavy effects
  useEffect(() => {
    if (!isClient) return;
    
    const media = window.matchMedia('(max-width: 640px)');
    setIsMobile(media.matches);
    const handler = () => setIsMobile(media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [isClient]);

  // Hover detection for interactive elements
  useEffect(() => {
    if (!isClient || !cursorEnabled) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll(
      'button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorEnabled, isClient]);

  // Scroll detection
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      setScrolling(true);
      const timeout = setTimeout(() => setScrolling(false), 150);
      return () => clearTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrolling, isClient]);

  // Don't render during SSR or if cursor is disabled
  if (!isClient || !cursorEnabled) {
    return null;
  }

  return (
    <div id="custom-cursor">
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
        }}
      />
      
      {/* Trail dots component (disabled on mobile or reduced motion) */}
      {cursorTrailEnabled && !reducedMotion && !isMobile && <TrailDots />}
    </div>
  );
}