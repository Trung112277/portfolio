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
  
  // Use refs to store current values to avoid dependency issues
  const cursorEnabledRef = useRef(cursorEnabled);
  const cursorSizeRef = useRef(cursorSize);
  
  // Throttling refs
  const lastUpdateRef = useRef(0);
  const throttleDelay = 16; // ~60fps
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update refs when store values change
  useEffect(() => {
    cursorEnabledRef.current = cursorEnabled;
    cursorSizeRef.current = cursorSize;
  }, [cursorEnabled, cursorSize]);

  // Smooth animation using requestAnimationFrame
  const updateCursorPosition = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor || !cursorEnabledRef.current) return;

    const x = mousePos.x - (cursorSizeRef.current / 2);
    const y = mousePos.y - (cursorSizeRef.current / 2);

    // Sử dụng transform thay vì left/top để performance tốt hơn
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    
    animationRef.current = requestAnimationFrame(updateCursorPosition);
  }, [mousePos.x, mousePos.y]); // Remove store dependencies

  // Optimized mouse move handler with requestAnimationFrame
  const handleMouseMove = useCallback((e: MouseEvent) => {
    try {
      // Check cursorEnabled from ref to avoid dependency issues
      if (!cursorEnabledRef.current) return;
      
      // Store position in ref immediately
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      // Use requestAnimationFrame to update state only when needed
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePos(mousePosRef.current);
          rafRef.current = undefined;
        });
      }
    } catch (err) {
      console.error('Mouse move error:', err);
    }
  }, []); // No dependencies needed

  // Handle cursor enabled/disabled state
  useEffect(() => {
    if (!isClient) return;
    
    if (!cursorEnabled) {
      // Clean up when cursor is disabled
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
    }
  }, [cursorEnabled, isClient]);

  // Animation loop
  useEffect(() => {
    if (!isClient || !cursorEnabledRef.current || reducedMotion) return;
    
    animationRef.current = requestAnimationFrame(updateCursorPosition);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateCursorPosition, reducedMotion, isClient]); // Use ref instead of store value

  // Mouse move event listener
  useEffect(() => {
    if (!isClient) return;
    
    try {
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => document.removeEventListener("mousemove", handleMouseMove);
    } catch (err) {
      console.error('Event listener error:', err);
    }
  }, [handleMouseMove, isClient]); // Remove cursorEnabled from dependencies

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
    if (!isClient || !cursorEnabledRef.current) return;

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
  }, [isClient]); // Remove cursorEnabled dependency

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

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