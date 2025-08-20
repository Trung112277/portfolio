/**
 * Cursor utility functions for smooth animations
 */

export interface Vector2D {
  x: number;
  y: number;
}

/**
 * Linear interpolation between two points
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Smooth interpolation between two vectors
 */
export function lerpVector(start: Vector2D, end: Vector2D, factor: number): Vector2D {
  return {
    x: lerp(start.x, end.x, factor),
    y: lerp(start.y, end.y, factor)
  };
}

/**
 * Calculate distance between two points
 */
export function distance(a: Vector2D, b: Vector2D): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Normalize vector
 */
export function normalize(vector: Vector2D): Vector2D {
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  if (length === 0) return { x: 0, y: 0 };
  
  return {
    x: vector.x / length,
    y: vector.y / length
  };
}

/**
 * Apply easing function
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): T {
  let lastCall = 0;
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  }) as T;
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): T {
  let timeoutId: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}
