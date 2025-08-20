"use client";

import { ReactNode, useEffect } from 'react';
import { useInitializeStores } from '@/hooks/useInitializeStores';
import { useUIStore } from '@/stores';

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const { theme, setTheme } = useUIStore();
  
  // Initialize stores with data
  useInitializeStores();
  
  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
  
  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'dark' || theme === 'light') return; // User has set preference
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Set initial theme based on system preference if no user preference
    if (theme === 'dark' || theme === 'light') return;
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setTheme]);
  
  return <>{children}</>;
}
