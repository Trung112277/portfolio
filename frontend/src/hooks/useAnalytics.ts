/**
 * Custom hook for analytics tracking
 */

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  trackPageView, 
  trackEngagement, 
  trackProjectInteraction,
  trackTechInteraction,
  isAnalyticsReady
} from '@/lib/google-analytics';

export function useAnalytics() {
  const router = useRouter();

  // Track page views on route change
  useEffect(() => {
    if (!isAnalyticsReady()) return;

    const handleRouteChange = (url: string) => {
      trackPageView({
        page_path: url,
        page_title: document.title
      });
    };

    // Track initial page view
    handleRouteChange(window.location.pathname);

    // Listen for route changes (if using client-side routing)
    const handlePopState = () => {
      handleRouteChange(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Track button clicks
  const trackButtonClick = useCallback((buttonName: string, location?: string) => {
    if (!isAnalyticsReady()) return;
    
    trackEngagement('button_click', {
      button_name: buttonName,
      location: location || window.location.pathname
    });
  }, []);

  // Track project interactions
  const trackProject = useCallback((projectName: string, action: string, details?: Record<string, unknown>) => {
    if (!isAnalyticsReady()) return;
    
    trackProjectInteraction(projectName, action, details);
  }, []);

  // Track tech interactions
  const trackTech = useCallback((techName: string, action: string) => {
    if (!isAnalyticsReady()) return;
    
    trackTechInteraction(techName, action);
  }, []);

  // Track form submissions
  const trackFormSubmit = useCallback((formName: string, success: boolean) => {
    if (!isAnalyticsReady()) return;
    
    trackEngagement('form_submit', {
      form_name: formName,
      success: success
    });
  }, []);

  // Track external link clicks
  const trackExternalLink = useCallback((url: string, linkText?: string) => {
    if (!isAnalyticsReady()) return;
    
    trackEngagement('external_link_click', {
      url: url,
      link_text: linkText
    });
  }, []);

  // Track section views
  const trackSectionView = useCallback((sectionName: string) => {
    if (!isAnalyticsReady()) return;
    
    trackEngagement('section_view', {
      section_name: sectionName,
      page: window.location.pathname
    });
  }, []);

  // Track download events
  const trackDownload = useCallback((fileName: string, fileType: string) => {
    if (!isAnalyticsReady()) return;
    
    trackEngagement('file_download', {
      file_name: fileName,
      file_type: fileType
    });
  }, []);

  return {
    trackButtonClick,
    trackProject,
    trackTech,
    trackFormSubmit,
    trackExternalLink,
    trackSectionView,
    trackDownload,
    isReady: isAnalyticsReady
  };
}
