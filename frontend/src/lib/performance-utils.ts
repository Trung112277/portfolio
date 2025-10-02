/**
 * Performance optimization utilities
 * Provides throttling, debouncing, and other performance helpers
 */

/**
 * Throttle function - limits function calls to once per specified time
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Debounce function - delays function execution until after specified time has passed
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return function(this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * RequestAnimationFrame throttle - ensures function runs at most once per frame
 * @param func - Function to throttle
 * @returns RAF throttled function
 */
export function rafThrottle<T extends (...args: unknown[]) => unknown>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  
  return function(this: unknown, ...args: Parameters<T>) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    }
  };
}

/**
 * Intersection Observer hook for lazy loading
 * @param callback - Callback when element intersects
 * @param options - Intersection Observer options
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}

/**
 * Performance measurement utility
 * @param name - Performance mark name
 * @param fn - Function to measure
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => T | Promise<T>
): Promise<T> {
  if (typeof performance === 'undefined') {
    return await fn();
  }
  
  const startMark = `${name}-start`;
  const endMark = `${name}-end`;
  const measureName = `${name}-measure`;
  
  performance.mark(startMark);
  
  try {
    const result = await fn();
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
    
    const measure = performance.getEntriesByName(measureName)[0];
    console.log(`⚡ ${name}: ${measure.duration.toFixed(2)}ms`);
    
    return result;
  } catch (error) {
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
    throw error;
  } finally {
    // Clean up marks
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureName);
  }
}

/**
 * Memory usage monitoring
 */
export function getMemoryUsage(): {
  used: number;
  total: number;
  percentage: number;
} | null {
  if (typeof performance === 'undefined' || !('memory' in performance)) {
    return null;
  }
  
  const memory = (performance as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;
  
  if (!memory) return null;
  
  return {
    used: Math.round(memory.usedJSHeapSize / 1048576), // MB
    total: Math.round(memory.totalJSHeapSize / 1048576), // MB
    percentage: Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100)
  };
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Get connection type and speed
 */
export function getConnectionInfo(): {
  effectiveType: string;
  downlink: number;
  rtt: number;
} | null {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return null;
  }
  
  const connection = (navigator as { connection?: { effectiveType?: string; downlink?: number; rtt?: number } }).connection;
  
  if (!connection) return null;
  
  return {
    effectiveType: connection.effectiveType || 'unknown',
    downlink: connection.downlink || 0,
    rtt: connection.rtt || 0
  };
}

/**
 * Preload critical resources
 * @param resources - Array of resource URLs to preload
 * @param type - Resource type (script, style, image, etc.)
 */
export function preloadResources(
  resources: string[],
  type: 'script' | 'style' | 'image' | 'font' = 'script'
): void {
  if (typeof document === 'undefined') return;
  
  resources.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;
    
    if (type === 'font') {
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  });
}


/**
 * Bundle size analyzer helper
 */
export function logBundleInfo(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return;
  }
  
  const scripts = Array.from(document.scripts);
  
  scripts.forEach(script => {
    if (script.src && script.src.includes('/_next/')) {
      // This is an approximation - actual size would need network analysis
      console.log(`📦 Script: ${script.src}`);
    }
  });
  
  console.log(`📊 Total scripts loaded: ${scripts.length}`);
}

const performanceUtils = {
  throttle,
  debounce,
  rafThrottle,
  createIntersectionObserver,
  measurePerformance,
  getMemoryUsage,
  prefersReducedMotion,
  isMobileDevice,
  getConnectionInfo,
  preloadResources,
  logBundleInfo,
};

export default performanceUtils;
