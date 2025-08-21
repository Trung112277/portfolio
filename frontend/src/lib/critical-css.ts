/**
 * Critical CSS Optimization Utility
 * Handles critical CSS inlining and async loading
 */

export interface CriticalCSSOptions {
  /** CSS content to inline */
  css: string;
  /** Whether to preload non-critical CSS */
  preload?: boolean;
  /** Non-critical CSS URL */
  nonCriticalUrl?: string;
}

/**
 * Inline critical CSS in document head
 */
export function inlineCriticalCSS(css: string): void {
  if (typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  
  // Insert at the beginning of head for highest priority
  document.head.insertBefore(style, document.head.firstChild);
}

/**
 * Load non-critical CSS asynchronously
 */
export function loadNonCriticalCSS(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.setAttribute('data-non-critical', 'true');
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
    
    document.head.appendChild(link);
  });
}

/**
 * Preload non-critical CSS
 */
export function preloadNonCriticalCSS(url: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = 'style';
  link.setAttribute('data-preload', 'true');
  
  document.head.appendChild(link);
}

/**
 * Remove critical CSS from document
 */
export function removeCriticalCSS(): void {
  if (typeof document === 'undefined') return;

  const criticalStyles = document.querySelectorAll('style[data-critical="true"]');
  criticalStyles.forEach(style => style.remove());
}

/**
 * Get critical CSS for above-the-fold content
 */
export function getCriticalCSS(): string {
  return `
    /* Critical CSS for above-the-fold content */
    
    /* Reset and base styles */
    *, *::before, *::after {
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      margin: 0;
      font-family: var(--font-open-sans), system-ui, sans-serif;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Critical layout styles */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    /* Critical header styles */
    header {
      position: relative;
      z-index: 10;
    }
    
    /* Critical navigation styles */
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    /* Critical hero section styles */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    /* Critical typography */
    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      font-weight: 600;
      line-height: 1.2;
    }
    
    h1 {
      font-size: clamp(2rem, 5vw, 4rem);
    }
    
    h2 {
      font-size: clamp(1.5rem, 4vw, 3rem);
    }
    
    /* Critical button styles */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .btn-primary {
      background-color: #1fc3ff;
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #0ea5e9;
      transform: translateY(-2px);
    }
    
    /* Critical responsive utilities */
    @media (max-width: 768px) {
      .container {
        padding: 0 0.5rem;
      }
      
      .hero {
        min-height: 80vh;
      }
    }
    
    /* Critical loading states */
    .loading {
      opacity: 0.6;
      pointer-events: none;
    }
    
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;
}

/**
 * Initialize critical CSS optimization
 */
export function initCriticalCSS(options: CriticalCSSOptions): void {
  // Inline critical CSS
  inlineCriticalCSS(options.css);
  
  // Preload non-critical CSS if specified
  if (options.preload && options.nonCriticalUrl) {
    preloadNonCriticalCSS(options.nonCriticalUrl);
  }
  
  // Load non-critical CSS after page load
  if (options.nonCriticalUrl) {
    window.addEventListener('load', () => {
      loadNonCriticalCSS(options.nonCriticalUrl!).catch(console.error);
    });
  }
}

/**
 * Performance monitoring for CSS loading
 */
export function monitorCSSPerformance(): void {
  if (typeof performance === 'undefined') return;

  // Monitor CSS loading performance
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name.includes('.css')) {
        console.log(`CSS loaded: ${entry.name} in ${entry.duration}ms`);
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
}

const criticalCSSUtils = {
  inlineCriticalCSS,
  loadNonCriticalCSS,
  preloadNonCriticalCSS,
  removeCriticalCSS,
  getCriticalCSS,
  initCriticalCSS,
  monitorCSSPerformance,
};

export default criticalCSSUtils;
