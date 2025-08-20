import { useCallback, useEffect, useRef } from 'react';

interface MagneticCursorOptions {
  strength?: number;
  distance?: number;
  duration?: number;
}

export function useMagneticCursor({
  strength = 0.3,
  distance = 100,
  duration = 0.3
}: MagneticCursorOptions = {}) {
  const magneticRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = magneticRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distanceFromCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distanceFromCenter < distance) {
      const force = (distance - distanceFromCenter) / distance;
      const translateX = deltaX * strength * force;
      const translateY = deltaY * strength * force;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        element.style.transition = 'none';
      });
    }
  }, [strength, distance]);

  const handleMouseLeave = useCallback(() => {
    const element = magneticRef.current;
    if (!element) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    element.style.transform = 'translate3d(0px, 0px, 0)';
    element.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
  }, [duration]);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return magneticRef;
}
