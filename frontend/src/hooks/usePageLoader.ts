"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

interface PageLoaderState {
  isLoading: boolean;
  loadingPath: string | null;
  isInitialLoad: boolean;
}

interface UsePageLoaderReturn {
  isLoading: boolean;
  loadingPath: string | null;
  isInitialLoad: boolean;
  startLoading: (path: string) => void;
  stopLoading: () => void;
}

// Global state để quản lý loading across components
let globalPageLoaderState: PageLoaderState = {
  isLoading: true, // Start with true for initial load
  loadingPath: null,
  isInitialLoad: true,
};

const listeners = new Set<(state: PageLoaderState) => void>();

const notifyListeners = () => {
  listeners.forEach(listener => listener(globalPageLoaderState));
};

const updateGlobalState = (updates: Partial<PageLoaderState>) => {
  globalPageLoaderState = { ...globalPageLoaderState, ...updates };
  notifyListeners();
};

export function usePageLoader(): UsePageLoaderReturn {
  const [state, setState] = useState<PageLoaderState>(globalPageLoaderState);
  const pathname = usePathname();

  // Subscribe to global state changes
  useEffect(() => {
    const listener = (newState: PageLoaderState) => {
      setState(newState);
    };
    
    listeners.add(listener);
    
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Handle initial page load - show loading until page is fully loaded
  useEffect(() => {
    if (state.isInitialLoad) {
      // Wait for page to be fully loaded including lazy components
      const handleLoad = () => {
        // Wait for lazy components to load
        const checkLazyComponents = () => {
          // Check if 3D components are loaded
          const threeDWrapper = document.querySelector('[data-3d-loaded="true"]');
          const projectsSection = document.querySelector('#projects');
          
          // If projects section exists, wait for 3D component to load
          if (projectsSection && !threeDWrapper) {
            // Wait for 3D component to load (Projects3DWrapper has 1s delay)
            setTimeout(() => {
              updateGlobalState({ isLoading: false, isInitialLoad: false });
            }, 1500); // Wait for 3D component loading
          } else {
            // No lazy components, load immediately
            setTimeout(() => {
              updateGlobalState({ isLoading: false, isInitialLoad: false });
            }, 300);
          }
        };

        checkLazyComponents();
      };

      // Listen for page load events (run on both server and client)
      if (document.readyState === 'complete') {
        // Page already loaded, but check for lazy components
        handleLoad();
      } else {
        // Wait for page to load
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, [state.isInitialLoad]);

  // Auto-stop loading when pathname changes (page loaded)
  useEffect(() => {
    if (state.isLoading && state.loadingPath === pathname && !state.isInitialLoad) {
      // Wait for the new page to be fully loaded
      const handlePageLoad = () => {
        updateGlobalState({ isLoading: false, loadingPath: null });
      };

      // Multiple strategies to detect page load completion
      const checkPageLoaded = () => {
        // Check if main content is rendered
        const mainContent = document.getElementById('main-content');
        if (mainContent && mainContent.children.length > 0) {
          return true;
        }
        return false;
      };

      // Try immediate check first
      if (checkPageLoaded()) {
        // Use requestAnimationFrame to ensure DOM is fully updated
        requestAnimationFrame(() => {
          requestAnimationFrame(handlePageLoad);
        });
        return;
      }

      // If not ready, wait for DOM changes
      const observer = new MutationObserver(() => {
        if (checkPageLoaded()) {
          observer.disconnect();
          requestAnimationFrame(() => {
            requestAnimationFrame(handlePageLoad);
          });
        }
      });

      // Observe main content area
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        observer.observe(mainContent, { childList: true, subtree: true });
      }

      // Fallback: wait for window load event with timeout
      const handleWindowLoad = () => {
        observer.disconnect();
        handlePageLoad();
      };

      window.addEventListener('load', handleWindowLoad);

      // Safety timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        observer.disconnect();
        window.removeEventListener('load', handleWindowLoad);
        handlePageLoad();
      }, 5000); // 5 second timeout

      return () => {
        observer.disconnect();
        window.removeEventListener('load', handleWindowLoad);
        clearTimeout(timeout);
      };
    }
  }, [pathname, state.isLoading, state.loadingPath, state.isInitialLoad]);

  const startLoading = useCallback((path: string) => {
    // Chỉ start loading nếu đang navigate đến page khác và không phải initial load
    // Exclude dashboard sections (same page, different sections)
    const isDashboardSection = pathname.startsWith('/dashboard') && path.startsWith('/dashboard');
    const isDifferentPage = path !== pathname && !isDashboardSection;
    
    if (isDifferentPage && !state.isInitialLoad && !state.isLoading) {
      updateGlobalState({ isLoading: true, loadingPath: path });
    }
  }, [pathname, state.isInitialLoad, state.isLoading]);

  const stopLoading = useCallback(() => {
    updateGlobalState({ isLoading: false, loadingPath: null });
  }, []);

  return {
    isLoading: state.isLoading,
    loadingPath: state.loadingPath,
    isInitialLoad: state.isInitialLoad,
    startLoading,
    stopLoading,
  };
}

// Hook để detect navigation và tự động start loading
export function useNavigationLoader() {
  const { startLoading } = usePageLoader();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Override router methods để detect navigation
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (href: string, options?: { scroll?: boolean }) => {
      // Start loading for page navigation (excluding dashboard sections)
      if (typeof href === 'string') {
        startLoading(href);
      }
      return originalPush.call(router, href, options);
    };

    router.replace = (href: string, options?: { scroll?: boolean }) => {
      // Start loading for page navigation (excluding dashboard sections)
      if (typeof href === 'string') {
        startLoading(href);
      }
      return originalReplace.call(router, href, options);
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router, pathname, startLoading]);
}
