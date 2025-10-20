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
  isLoading: true, // Start with loading true for initial load
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
  const router = useRouter();

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

  // Handle initial page load
  useEffect(() => {
    if (state.isInitialLoad) {
      // Stop initial loading after a short delay to ensure page is rendered
      const timer = setTimeout(() => {
        updateGlobalState({ isLoading: false, isInitialLoad: false });
      }, 500); // 500ms delay for initial load
      
      return () => clearTimeout(timer);
    }
  }, [state.isInitialLoad]);

  // Auto-stop loading when pathname changes (page loaded)
  useEffect(() => {
    if (state.isLoading && state.loadingPath === pathname && !state.isInitialLoad) {
      // Delay để đảm bảo page đã render xong
      const timer = setTimeout(() => {
        updateGlobalState({ isLoading: false, loadingPath: null });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, state.isLoading, state.loadingPath, state.isInitialLoad]);

  const startLoading = useCallback((path: string) => {
    // Chỉ start loading nếu đang navigate đến page khác và không phải initial load
    if (path !== pathname && !state.isInitialLoad) {
      updateGlobalState({ isLoading: true, loadingPath: path });
    }
  }, [pathname, state.isInitialLoad]);

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

    router.push = (href: string, options?: any) => {
      // Chỉ start loading cho page navigation, không phải dashboard section changes
      if (typeof href === 'string' && !href.startsWith('/dashboard/') && href !== pathname) {
        startLoading(href);
      }
      return originalPush.call(router, href, options);
    };

    router.replace = (href: string, options?: any) => {
      // Chỉ start loading cho page navigation, không phải dashboard section changes
      if (typeof href === 'string' && !href.startsWith('/dashboard/') && href !== pathname) {
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
