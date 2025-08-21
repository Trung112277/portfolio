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
  private logMetric(name: string, value: number): void {
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
  private logEvent(event: AnalyticsEvent): void {
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
 * Global performance monitor instance
 */
export const performanceMonitor = new PerformanceMonitor();

/**
 * Initialize performance monitoring
 * Call this in your app's entry point
 */
export function initPerformanceMonitoring(): void {
  performanceMonitor.init();
}

/**
 * Utility function to measure component render time
 * @param componentName - Name of the component
 * @param renderFunction - Function that renders the component
 */
export function measureRender<T>(componentName: string, renderFunction: () => T): T {
  return performanceMonitor.measureComponentRender(componentName, renderFunction);
}

/**
 * Utility function to measure interaction time
 * @param interactionName - Name of the interaction
 * @param interactionFunction - Function to measure
 */
export function measureInteraction<T>(interactionName: string, interactionFunction: () => Promise<T> | T): Promise<T> {
  return performanceMonitor.measureInteraction(interactionName, interactionFunction);
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
  performanceMonitor.trackEvent({
    name,
    category,
    action,
    label,
    value,
    properties,
  });
}
