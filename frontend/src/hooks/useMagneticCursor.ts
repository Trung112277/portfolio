import { useCallback, useEffect, useRef } from 'react';

/**
 * Configuration options for the magnetic cursor effect
 */
interface MagneticCursorOptions {
  /** Strength of the magnetic effect (0-1, default: 0.3) */
  strength?: number;
  /** Distance from element center to trigger effect in pixels (default: 100) */
  distance?: number;
  /** Duration of the reset animation in seconds (default: 0.3) */
  duration?: number;
}

/**
 * Custom hook that creates a magnetic cursor effect for DOM elements
 * The element will be attracted to the mouse cursor when it's within the specified distance
 * 
 * @param options - Configuration options for the magnetic effect
 * @returns A ref that should be attached to the target DOM element
 * 
 * @example
 * ```tsx
 * function MagneticButton() {
 *   const magneticRef = useMagneticCursor({ strength: 0.5, distance: 150 });
 *   
 *   return (
 *     <button ref={magneticRef} className="magnetic-button">
 *       Hover me!
 *     </button>
 *   );
 * }
 * ```
 */
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
