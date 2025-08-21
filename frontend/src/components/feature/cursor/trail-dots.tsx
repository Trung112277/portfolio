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

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track mouse position
  useEffect(() => {
    if (!isClient || !cursorTrailEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [cursorTrailEnabled, isClient]);

  // Create new trail dot when mouse moves
  useEffect(() => {
    if (!isClient || !cursorTrailEnabled || (mousePosition.x === 0 && mousePosition.y === 0)) return;

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
  }, [mousePosition, cursorTrailEnabled, isClient]);

  // Animation loop for trail dots
  useEffect(() => {
    if (!isClient || !cursorTrailEnabled) return;

    const animate = () => {
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

        animationRef.current = requestAnimationFrame(animate);
      } catch (err) {
        console.error('Animation error:', err);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cursorTrailEnabled, isClient]);

  // Memoized trail dots rendering
  const trailDotsElements = useMemo(() => {
    if (!isClient) return null;
    
    try {
      return trailDots.map((dot) => (
        <div
          key={dot.id}
          className="cursor-trail"
          style={{
            left: `${dot.x - (cursorSize / 2)}px`,
            top: `${dot.y - (cursorSize / 2)}px`,
            width: `${cursorSize}px`,
            height: `${cursorSize}px`,
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
  }, [trailDots, cursorSize, isClient]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Don't render during SSR or if trail is disabled
  if (!isClient || !cursorTrailEnabled) {
    return null;
  }

  return <>{trailDotsElements}</>;
}