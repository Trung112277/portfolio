/**
 * Google Analytics 4 Integration
 * Comprehensive analytics tracking for portfolio
 */

declare global {
    interface Window {
      gtag: (...args: unknown[]) => void;
      dataLayer: unknown[];
    }
  }
  
  export interface GAEvent {
    action: string;
    category: string;
    label?: string;
    value?: number;
    custom_parameters?: Record<string, unknown>;
  }
  
  export interface GAPageView {
    page_title?: string;
    page_location?: string;
    page_path?: string;
    content_group1?: string;
    content_group2?: string;
  }
  
  class GoogleAnalytics {
    private measurementId: string;
    private isInitialized: boolean = false;
  
    constructor(measurementId: string) {
      this.measurementId = measurementId;
    }
  
    /**
     * Initialize Google Analytics
     */
    init(): void {
      if (typeof window === 'undefined' || this.isInitialized) return;
  
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      
      // Define gtag function
      window.gtag = function(...args: unknown[]) {
        window.dataLayer.push(...args);
      };
  
      // Configure GA4
      window.gtag('js', new Date());
      window.gtag('config', this.measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: false // We'll send page views manually
      });
  
      this.isInitialized = true;
      console.log('Google Analytics initialized');
    }
  
    /**
     * Track page view
     */
    trackPageView(pageData?: GAPageView): void {
      if (!this.isInitialized) return;
  
      const defaultPageData: GAPageView = {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        content_group1: 'Portfolio',
        content_group2: this.getPageCategory()
      };
  
      window.gtag('event', 'page_view', {
        ...defaultPageData,
        ...pageData
      });
    }
  
    /**
     * Track custom event
     */
    trackEvent(eventData: GAEvent): void {
      if (!this.isInitialized) return;
  
      window.gtag('event', eventData.action, {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
        ...eventData.custom_parameters
      });
    }
  
    /**
     * Track portfolio-specific events
     */
    trackPortfolioEvent(eventType: string, details?: Record<string, unknown>): void {
      this.trackEvent({
        action: eventType,
        category: 'Portfolio',
        custom_parameters: {
          ...details,
          timestamp: Date.now()
        }
      });
    }
  
    /**
     * Track project interaction
     */
    trackProjectInteraction(projectName: string, action: string, details?: Record<string, unknown>): void {
      this.trackEvent({
        action: 'project_interaction',
        category: 'Projects',
        label: projectName,
        custom_parameters: {
          project_name: projectName,
          interaction_type: action,
          ...details
        }
      });
    }
  
    /**
     * Track tech stack interaction
     */
    trackTechInteraction(techName: string, action: string): void {
      this.trackEvent({
        action: 'tech_interaction',
        category: 'Tech Stack',
        label: techName,
        custom_parameters: {
          tech_name: techName,
          interaction_type: action
        }
      });
    }
  
    /**
     * Track performance metrics
     */
    trackPerformance(metricName: string, value: number, details?: Record<string, unknown>): void {
      this.trackEvent({
        action: 'performance_metric',
        category: 'Performance',
        label: metricName,
        value: Math.round(value),
        custom_parameters: {
          metric_name: metricName,
          metric_value: value,
          ...details
        }
      });
    }
  
    /**
     * Track user engagement
     */
    trackEngagement(action: string, details?: Record<string, unknown>): void {
      this.trackEvent({
        action: 'user_engagement',
        category: 'Engagement',
        label: action,
        custom_parameters: {
          engagement_type: action,
          ...details
        }
      });
    }
  
    /**
     * Track scroll depth
     */
    trackScrollDepth(depth: number): void {
      this.trackEvent({
        action: 'scroll_depth',
        category: 'Engagement',
        label: `${depth}%`,
        value: depth,
        custom_parameters: {
          scroll_percentage: depth
        }
      });
    }
  
    /**
     * Track time on page
     */
    trackTimeOnPage(timeInSeconds: number): void {
      this.trackEvent({
        action: 'time_on_page',
        category: 'Engagement',
        value: timeInSeconds,
        custom_parameters: {
          time_seconds: timeInSeconds
        }
      });
    }
  
    /**
     * Get page category for content grouping
     */
    private getPageCategory(): string {
      if (typeof window === 'undefined') return 'Other';
      
      const path = window.location.pathname;
      
      if (path === '/') return 'Home';
      if (path.startsWith('/dashboard')) return 'Dashboard';
      if (path.startsWith('/projects')) return 'Projects';
      if (path.startsWith('/about')) return 'About';
      if (path.startsWith('/tech')) return 'Tech Stack';
      if (path.startsWith('/contact')) return 'Contact';
      
      return 'Other';
    }
  
    /**
     * Set user properties
     */
    setUserProperties(properties: Record<string, unknown>): void {
      if (!this.isInitialized) return;
  
      window.gtag('config', this.measurementId, {
        user_properties: properties
      });
    }
  
    /**
     * Track conversion
     */
    trackConversion(conversionId: string, value?: number, currency?: string): void {
      if (!this.isInitialized) return;
  
      window.gtag('event', 'conversion', {
        send_to: conversionId,
        value: value,
        currency: currency
      });
    }
  
    /**
     * Check if analytics is initialized
     */
    isReady(): boolean {
      return this.isInitialized;
    }
  }
  
  // Create singleton instance
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  export const googleAnalytics = new GoogleAnalytics(measurementId);
  
  // Initialize on import if in browser and measurement ID exists
  if (typeof window !== 'undefined' && measurementId) {
    googleAnalytics.init();
  }
  
  // Export utility functions
  export const trackPageView = (pageData?: GAPageView) => googleAnalytics.trackPageView(pageData);
  export const trackEvent = (eventData: GAEvent) => googleAnalytics.trackEvent(eventData);
  export const trackPortfolioEvent = (eventType: string, details?: Record<string, unknown>) => 
    googleAnalytics.trackPortfolioEvent(eventType, details);
  export const trackProjectInteraction = (projectName: string, action: string, details?: Record<string, unknown>) => 
    googleAnalytics.trackProjectInteraction(projectName, action, details);
  export const trackTechInteraction = (techName: string, action: string) => 
    googleAnalytics.trackTechInteraction(techName, action);
  export const trackPerformance = (metricName: string, value: number, details?: Record<string, unknown>) => 
    googleAnalytics.trackPerformance(metricName, value, details);
  export const trackEngagement = (action: string, details?: Record<string, unknown>) => 
    googleAnalytics.trackEngagement(action, details);
  export const trackScrollDepth = (depth: number) => googleAnalytics.trackScrollDepth(depth);
  export const trackTimeOnPage = (timeInSeconds: number) => googleAnalytics.trackTimeOnPage(timeInSeconds);
  export const isAnalyticsReady = () => googleAnalytics.isReady();