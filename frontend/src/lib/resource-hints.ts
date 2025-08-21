/**
 * Resource Hints Utility
 * Implements preload, prefetch, and other resource hints for performance
 */

export interface ResourceHint {
  /** Resource URL */
  href: string;
  /** Resource type */
  as: 'script' | 'style' | 'image' | 'font' | 'fetch' | 'document';
  /** Cross-origin attribute */
  crossOrigin?: 'anonymous' | 'use-credentials';
  /** Media query for conditional loading */
  media?: string;
  /** Resource type for fonts */
  type?: string;
  /** Fetch priority */
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Add resource hint to document head
 */
export function addResourceHint(hint: ResourceHint): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = hint.href;
  link.as = hint.as;
  
  if (hint.crossOrigin) {
    link.crossOrigin = hint.crossOrigin;
  }
  
  if (hint.media) {
    link.media = hint.media;
  }
  
  if (hint.type) {
    link.type = hint.type;
  }
  
  if (hint.fetchPriority) {
    link.setAttribute('fetchpriority', hint.fetchPriority);
  }

  document.head.appendChild(link);
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources(): void {
  const criticalResources: ResourceHint[] = [
    // Critical fonts
    {
      href: '/fonts/helvetiker_regular.typeface.json',
      as: 'fetch',
      fetchPriority: 'high'
    },
    
    // Critical images
    {
      href: '/favicon.png',
      as: 'image',
      fetchPriority: 'high'
    },
    
    // Critical tech logos
    {
      href: '/public/frontend-tech/react-logo.png',
      as: 'image',
      fetchPriority: 'high'
    },
    {
      href: '/public/frontend-tech/nextjs-logo.png',
      as: 'image',
      fetchPriority: 'high'
    },
    {
      href: '/public/frontend-tech/typescript-logo.png',
      as: 'image',
      fetchPriority: 'high'
    }
  ];

  criticalResources.forEach(addResourceHint);
}

/**
 * Prefetch non-critical resources
 */
export function prefetchNonCriticalResources(): void {
  const nonCriticalResources: ResourceHint[] = [
    // Prefetch dashboard page
    {
      href: '/dashboard',
      as: 'document',
      fetchPriority: 'low'
    },
    
    // Prefetch login page
    {
      href: '/login',
      as: 'document',
      fetchPriority: 'low'
    },
    
    // Prefetch other tech logos
    {
      href: '/public/frontend-tech/css3-logo.png',
      as: 'image',
      fetchPriority: 'low'
    },
    {
      href: '/public/frontend-tech/html-logo.png',
      as: 'image',
      fetchPriority: 'low'
    },
    {
      href: '/public/frontend-tech/javascript-logo.png',
      as: 'image',
      fetchPriority: 'low'
    }
  ];

  // Add prefetch hints
  nonCriticalResources.forEach(resource => {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.fetchPriority) {
      link.setAttribute('fetchpriority', resource.fetchPriority);
    }

    document.head.appendChild(link);
  });
}

/**
 * DNS prefetch for external domains
 */
export function addDNSPrefetch(domains: string[]): void {
  if (typeof document === 'undefined') return;

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
}

/**
 * Preconnect to external domains
 */
export function addPreconnect(domains: string[]): void {
  if (typeof document === 'undefined') return;

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `//${domain}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Initialize resource hints
 */
export function initResourceHints(): void {
  // Preload critical resources
  preloadCriticalResources();
  
  // DNS prefetch for external domains
  addDNSPrefetch([
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'api.github.com'
  ]);
  
  // Preconnect to external domains
  addPreconnect([
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ]);
  
  // Prefetch non-critical resources after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      prefetchNonCriticalResources();
    }, 1000); // Wait 1 second after page load
  });
}

/**
 * Add resource hint for specific page
 */
export function addPageResourceHints(page: string): void {
  const pageHints: Record<string, ResourceHint[]> = {
    '/dashboard': [
      {
        href: '/api/dashboard-data',
        as: 'fetch',
        fetchPriority: 'high'
      }
    ],
    '/login': [
      {
        href: '/api/auth-config',
        as: 'fetch',
        fetchPriority: 'high'
      }
    ]
  };

  const hints = pageHints[page];
  if (hints) {
    hints.forEach(addResourceHint);
  }
}

/**
 * Remove resource hints
 */
export function removeResourceHints(): void {
  if (typeof document === 'undefined') return;

  const hints = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"], link[rel="dns-prefetch"], link[rel="preconnect"]');
  hints.forEach(hint => hint.remove());
}

/**
 * Monitor resource hint performance
 */
export function monitorResourceHints(): void {
  if (typeof performance === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        console.log(`Resource loaded: ${resourceEntry.name} in ${resourceEntry.duration}ms`);
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
}

const resourceHintsUtils = {
  addResourceHint,
  preloadCriticalResources,
  prefetchNonCriticalResources,
  addDNSPrefetch,
  addPreconnect,
  initResourceHints,
  addPageResourceHints,
  removeResourceHints,
  monitorResourceHints,
};

export default resourceHintsUtils;
