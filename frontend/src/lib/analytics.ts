/**
 * Enhanced Analytics Integration
 * Combines performance monitoring with Google Analytics
 */

import { 
  trackPageView, 
  trackPerformance, 
  trackEngagement,
  trackScrollDepth,
  trackTimeOnPage,
  trackPortfolioEvent,
  trackProjectInteraction,
  trackTechInteraction
} from './google-analytics';

/**
 * Performance monitoring and analytics utilities
 * Provides functions to track Core Web Vitals and custom metrics
 */

/**
 * Core Web Vitals metrics interface
 */
interface CoreWebVitals {
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  FCP?: number; // First Contentful Paint
  TTFB?: number; // Time to First Byte
}

/**
 * Custom performance metrics interface
 */
interface CustomMetrics {
  pageLoadTime?: number;
  componentRenderTime?: number;
  interactionTime?: number;
  [key: string]: number | undefined;
}

/**
 * Analytics event interface
 */
interface AnalyticsEvent {
  name: string;
  category: string;
  action?: string;
  label?: string;
  value?: number;
  timestamp: number;
  properties?: Record<string, unknown>;
}

/**
 * Performance monitoring class
 */
class PerformanceMonitor {
  private metrics: CoreWebVitals & CustomMetrics = {};
  private events: AnalyticsEvent[] = [];

  /**
   * Initialize performance monitoring
   * Sets up Core Web Vitals observers
   */
  init(): void {
    if (typeof window === 'undefined') return;

    this.observeCoreWebVitals();
    this.observeCustomMetrics();
  }

  /**
   * Observe Core Web Vitals using Performance Observer
   */
  private observeCoreWebVitals(): void {
    if (!('PerformanceObserver' in window)) return;

    // Observe Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.LCP = lastEntry.startTime;
        this.logMetric('LCP', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP observer failed:', error);
    }

    // Observe First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { processingStart?: number }) => {
          if (entry.processingStart) {
            this.metrics.FID = entry.processingStart - entry.startTime;
            this.logMetric('FID', this.metrics.FID);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID observer failed:', error);
    }

    // Observe Cumulative Layout Shift
    try {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value || 0;
          }
        });
        this.metrics.CLS = clsValue;
        this.logMetric('CLS', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS observer failed:', error);
    }

    // Observe First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        this.metrics.FCP = firstEntry.startTime;
        this.logMetric('FCP', firstEntry.startTime);
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (error) {
      console.warn('FCP observer failed:', error);
    }
  }

  /**
   * Observe custom performance metrics
   */
  private observeCustomMetrics(): void {
    if (typeof window === 'undefined') return;

    // Measure page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.metrics.pageLoadTime = loadTime;
      this.logMetric('PageLoadTime', loadTime);
    });

    // Measure Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      this.metrics.TTFB = navigationEntry.responseStart - navigationEntry.requestStart;
      this.logMetric('TTFB', this.metrics.TTFB);
    }
  }

  /**
   * Measure component render time
   * @param componentName - Name of the component being measured
   * @param renderFunction - Function that renders the component
   */
  measureComponentRender<T>(componentName: string, renderFunction: () => T): T {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();
    
    const renderTime = endTime - startTime;
    this.metrics.componentRenderTime = renderTime;
    this.logMetric(`${componentName}RenderTime`, renderTime);
    
    return result;
  }

  /**
   * Measure interaction time
   * @param interactionName - Name of the interaction
   * @param interactionFunction - Function to measure
   */
  async measureInteraction<T>(interactionName: string, interactionFunction: () => Promise<T> | T): Promise<T> {
    const startTime = performance.now();
    const result = await interactionFunction();
    const endTime = performance.now();
    
    const interactionTime = endTime - startTime;
    this.metrics.interactionTime = interactionTime;
    this.logMetric(`${interactionName}Time`, interactionTime);
    
    return result;
  }

  /**
   * Track custom analytics event
   * @param event - Analytics event to track
   */
  trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>): void {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
    };
    
    this.events.push(fullEvent);
    this.logEvent(fullEvent);
  }

  /**
   * Get all collected metrics
   * @returns Object containing all performance metrics
   */
  getMetrics(): CoreWebVitals & CustomMetrics {
    return { ...this.metrics };
  }

  /**
   * Get all tracked events
   * @returns Array of analytics events
   */
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  /**
   * Log metric to console (can be replaced with actual analytics service)
   * @param name - Metric name
   * @param value - Metric value
   */
  protected logMetric(name: string, value: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name}:`, value.toFixed(2));
    }
    
    // Here you would send to your analytics service
    // Example: gtag('event', 'performance', { metric_name: name, value: value });
  }

  /**
   * Log event to console (can be replaced with actual analytics service)
   * @param event - Event to log
   */
  protected logEvent(event: AnalyticsEvent): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('📈 Event:', event);
    }
    
    // Here you would send to your analytics service
    // Example: gtag('event', event.name, event.properties);
  }

  /**
   * Reset all metrics and events
   */
  reset(): void {
    this.metrics = {};
    this.events = [];
  }
}

/**
 * Enhanced Performance Monitor
 */
class EnhancedPerformanceMonitor extends PerformanceMonitor {
  private startTime: number = Date.now();
  private scrollDepthTracked: Set<number> = new Set();
  private timeOnPageInterval: NodeJS.Timeout | null = null;

  /**
   * Initialize enhanced performance monitoring
   */
  init(): void {
    super.init();
    this.initScrollTracking();
    this.initTimeOnPageTracking();
    this.initEngagementTracking();
  }

  /**
   * Initialize scroll depth tracking
   */
  private initScrollTracking(): void {
    if (typeof window === 'undefined') return;

    const scrollDepths = [25, 50, 75, 90, 100];
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !this.scrollDepthTracked.has(depth)) {
          this.scrollDepthTracked.add(depth);
          trackScrollDepth(depth);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Initialize time on page tracking
   */
  private initTimeOnPageTracking(): void {
    if (typeof window === 'undefined') return;

    this.timeOnPageInterval = setInterval(() => {
      const timeOnPage = Math.round((Date.now() - this.startTime) / 1000);
      
      // Track at specific intervals
      if (timeOnPage === 30 || timeOnPage === 60 || timeOnPage === 120) {
        trackTimeOnPage(timeOnPage);
      }
    }, 1000);

    // Track when user leaves page
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - this.startTime) / 1000);
      trackTimeOnPage(timeOnPage);
    });
  }

  /**
   * Initialize engagement tracking
   */
  private initEngagementTracking(): void {
    if (typeof window === 'undefined') return;

    // Track clicks on interactive elements
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      if (target.matches('a[href^="#"]')) {
        trackEngagement('anchor_click', {
          target: target.getAttribute('href'),
          text: target.textContent?.trim()
        });
      }
      
      if (target.matches('.floating-button')) {
        trackEngagement('floating_button_click', {
          text: target.textContent?.trim()
        });
      }
      
      if (target.matches('[data-track="project"]')) {
        const projectName = target.getAttribute('data-project-name');
        if (projectName) {
          trackProjectInteraction(projectName, 'click');
        }
      }
      
      if (target.matches('[data-track="tech"]')) {
        const techName = target.getAttribute('data-tech-name');
        if (techName) {
          trackTechInteraction(techName, 'click');
        }
      }
    });

    // Track form interactions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      trackEngagement('form_submit', {
        form_id: form.id,
        form_class: form.className
      });
    });
  }

  /**
   * Enhanced metric logging with Google Analytics
   */
  protected logMetric(name: string, value: number): void {
    super.logMetric(name, value);
    
    // Send to Google Analytics
    trackPerformance(name, value, {
      page_url: window.location.href,
      page_title: document.title
    });
  }

  /**
   * Enhanced event logging with Google Analytics
   */
  protected logEvent(event: AnalyticsEvent): void {
    super.logEvent(event);
    
    // Send to Google Analytics
    trackPortfolioEvent(event.name, {
      category: event.category,
      action: event.action,
      label: event.label,
      value: event.value,
      ...event.properties
    });
  }

  /**
   * Track page view with enhanced data
   */
  trackPageView(pageData?: Record<string, unknown>): void {
    trackPageView({
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      content_group1: 'Portfolio',
      content_group2: this.getPageCategory(),
      ...pageData
    });
  }

  /**
   * Get page category
   */
  private getPageCategory(): string {
    const path = window.location.pathname;
    
    if (path === '/') return 'Home';
    if (path.startsWith('/dashboard')) return 'Dashboard';
    if (path.startsWith('/projects')) return 'Projects';
    if (path.startsWith('/about')) return 'About';
    if (path.startsWith('/tech')) return 'Tech Stack';
    
    return 'Other';
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    if (this.timeOnPageInterval) {
      clearInterval(this.timeOnPageInterval);
    }
  }
}

// Export enhanced instance
export const enhancedPerformanceMonitor = new EnhancedPerformanceMonitor();

/**
 * Initialize enhanced performance monitoring
 */
export function initEnhancedPerformanceMonitoring(): void {
  enhancedPerformanceMonitor.init();
}

/**
 * Utility function to measure component render time
 * @param componentName - Name of the component
 * @param renderFunction - Function that renders the component
 */
export function measureRender<T>(componentName: string, renderFunction: () => T): T {
  return enhancedPerformanceMonitor.measureComponentRender(componentName, renderFunction);
}

/**
 * Utility function to measure interaction time
 * @param interactionName - Name of the interaction
 * @param interactionFunction - Function to measure
 */
export function measureInteraction<T>(interactionName: string, interactionFunction: () => Promise<T> | T): Promise<T> {
  return enhancedPerformanceMonitor.measureInteraction(interactionName, interactionFunction);
}

/**
 * Utility function to track analytics events
 * @param name - Event name
 * @param category - Event category
 * @param action - Event action (optional)
 * @param label - Event label (optional)
 * @param value - Event value (optional)
 * @param properties - Additional properties (optional)
 */
export function trackEvent(
  name: string,
  category: string,
  action?: string,
  label?: string,
  value?: number,
  properties?: Record<string, unknown>
): void {
  enhancedPerformanceMonitor.trackEvent({
    name,
    category,
    action,
    label,
    value,
    properties,
  });
}
