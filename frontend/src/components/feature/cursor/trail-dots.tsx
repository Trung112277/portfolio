"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  createdAt: number;
}

interface TrailDotsProps {
  mousePosition: { x: number; y: number };
}

// Constants
const CURSOR_OFFSET = 12;
const TRAIL_DURATION = 600;
const MAX_TRAIL_DOTS = 50;
const FADE_THRESHOLD = 0.01;

export default function TrailDots({ mousePosition }: TrailDotsProps) {
  const [trailDots, setTrailDots] = useState<TrailDot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dotIdRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);

  // Create new trail dot when mouse moves
  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return;

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
      setError(`Failed to create trail dot: ${err}`);
    }
  }, [mousePosition]);

  // Animation loop for trail dots
  useEffect(() => {
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
        setError(`Animation error: ${err}`);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Memoized trail dots rendering
  const trailDotsElements = useMemo(() => {
    try {
      return trailDots.map((dot) => (
        <div
          key={dot.id}
          className="cursor-trail"
          style={{
            left: `${dot.x - CURSOR_OFFSET}px`,
            top: `${dot.y - CURSOR_OFFSET}px`,
            opacity: dot.opacity,
            transform: `scale(${dot.scale})`,
            boxShadow: `0 0 ${20 * dot.scale}px rgba(31, 195, 255, 0.6)`,
          }}
        />
      ));
    } catch (err) {
      setError(`Rendering error: ${err}`);
      return null;
    }
  }, [trailDots]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (error) {
    return <div style={{ display: 'none' }}>Trail dots error: {error}</div>;
  }

  return <>{trailDotsElements}</>;
}