"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useUIStore } from "@/stores";

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  createdAt: number;
}

import { UI_CONSTANTS } from "@/constant/theme-colors";

// Constants
const TRAIL_DURATION = UI_CONSTANTS.trailDuration;
const MAX_TRAIL_DOTS = UI_CONSTANTS.maxTrailDots;
const FADE_THRESHOLD = UI_CONSTANTS.fadeThreshold;

export default function TrailDots() {
  const [trailDots, setTrailDots] = useState<TrailDot[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const { cursorTrailEnabled, cursorSize } = useUIStore();
  const dotIdRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);
  
  // Use refs to store current values to avoid dependency issues
  const cursorTrailEnabledRef = useRef(cursorTrailEnabled);
  const cursorSizeRef = useRef(cursorSize);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  const lastDotTimeRef = useRef(0);

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update refs when store values change
  useEffect(() => {
    cursorTrailEnabledRef.current = cursorTrailEnabled;
    cursorSizeRef.current = cursorSize;
  }, [cursorTrailEnabled, cursorSize]);

  // Handle cursor trail enabled/disabled state
  useEffect(() => {
    if (!isClient) return;
    
    if (!cursorTrailEnabled) {
      // Clean up when trail is disabled
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      // Clear trail dots when disabled
      setTrailDots([]);
    }
  }, [cursorTrailEnabled, isClient]);

  // Track mouse position
  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Store position in ref immediately
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      // Use requestAnimationFrame to update state only when needed
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePosition(mousePosRef.current);
          rafRef.current = undefined;
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]); // Remove cursorTrailEnabled dependency

  // Create new trail dot when mouse moves
  useEffect(() => {
    if (!isClient || !cursorTrailEnabledRef.current || (mousePosition.x === 0 && mousePosition.y === 0)) return;

    // Throttle trail dot creation to avoid excessive updates
    const now = Date.now();
    const minInterval = 16; // ~60fps

    if (now - lastDotTimeRef.current < minInterval) return;
    lastDotTimeRef.current = now;

    try {
      const newDot: TrailDot = {
        id: dotIdRef.current++,
        x: mousePosition.x,
        y: mousePosition.y,
        opacity: 1,
        scale: 1,
        createdAt: Date.now(),
      };
      
      setTrailDots(prev => {
        const newDots = [...prev, newDot];
        return newDots.slice(-MAX_TRAIL_DOTS);
      });
    } catch (err) {
      console.error('Failed to create trail dot:', err);
    }
  }, [mousePosition, isClient]); // Remove cursorTrailEnabled dependency

  // Animation loop for trail dots
  useEffect(() => {
    if (!isClient || !cursorTrailEnabledRef.current) return;

    let isAnimating = true;

    const animate = () => {
      if (!isAnimating || !cursorTrailEnabledRef.current) return;

      try {
        setTrailDots(prev => {
          const now = Date.now();
          const updatedDots = prev
            .map(dot => {
              const age = now - dot.createdAt;
              const fadeProgress = age / TRAIL_DURATION;
              const newOpacity = Math.max(0, 1 - fadeProgress);
              const newScale = Math.max(0, 1 - fadeProgress);
              
              return {
                ...dot,
                opacity: newOpacity,
                scale: newScale,
              };
            })
            .filter(dot => dot.opacity > FADE_THRESHOLD);
          
          return updatedDots;
        });

        if (isAnimating && cursorTrailEnabledRef.current) {
          animationRef.current = requestAnimationFrame(animate);
        }
      } catch (err) {
        console.error('Animation error:', err);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isAnimating = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [isClient]); // Remove cursorTrailEnabled dependency

  // Memoized trail dots rendering
  const trailDotsElements = useMemo(() => {
    if (!isClient) return null;
    
    try {
      return trailDots.map((dot) => (
        <div
          key={dot.id}
          className="cursor-trail"
          style={{
            left: `${dot.x - (cursorSizeRef.current / 2)}px`,
            top: `${dot.y - (cursorSizeRef.current / 2)}px`,
            width: `${cursorSizeRef.current}px`,
            height: `${cursorSizeRef.current}px`,
            opacity: dot.opacity,
            transform: `scale(${dot.scale})`,
            boxShadow: `0 0 ${20 * dot.scale}px rgba(31, 195, 255, 0.6)`,
          }}
        />
      ));
    } catch (err) {
      console.error('Rendering error:', err);
      return null;
    }
  }, [trailDots, isClient]); // Remove cursorSize dependency

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      // Reset refs
      lastDotTimeRef.current = 0;
    };
  }, []);

  // Don't render during SSR or if trail is disabled
  if (!isClient || !cursorTrailEnabledRef.current) {
    return null;
  }

  return <>{trailDotsElements}</>;
}