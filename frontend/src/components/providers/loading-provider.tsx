"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FullscreenLoader } from "@/components/feature/loading/fullscreen-loader";

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simple and reliable image loading
  const waitForImages = async () => {
    if (typeof window === 'undefined' || !document) {
      return;
    }

    try {
      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Get all images
      const images = Array.from(document.images);
      console.log(`Found ${images.length} images to load`);
      
      // Create simple promises for each image
      const imagePromises = images.map(img => {
        return new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          
          const onLoad = () => {
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onLoad);
            resolve();
          };
          
          img.addEventListener('load', onLoad);
          img.addEventListener('error', onLoad);
        });
      });
      
      // Wait for all images with a timeout
      const timeout = new Promise<void>(resolve => {
        setTimeout(() => {
          console.log('Image loading timeout');
          resolve();
        }, 3000);
      });
      
      await Promise.race([
        Promise.allSettled(imagePromises),
        timeout
      ]);
      
      console.log('Image loading completed');
    } catch (error) {
      console.warn('Error in image loading:', error);
    }
  };

  // Load 3D content immediately
  const preload3DContent = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      // Simply dispatch the load3d event without scrolling
      console.log('Triggering 3D content preload');
      window.dispatchEvent(new CustomEvent('load3d'));
      
      // Wait a bit for 3D content to start loading
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.warn('Error preloading 3D content:', error);
    }
  };

  // Initial load
  useEffect(() => {
    if (!isClient) return;

    let isMounted = true;
    const run = async () => {
      setIsLoading(true);
      
      try {
        // If we're on dashboard, skip loading immediately
        if (pathname.startsWith('/dashboard')) {
          if (isMounted) {
            setIsLoading(false);
          }
          return;
        }
        
        // Wait for images
        await waitForImages();
        
        // Preload 3D content
        await preload3DContent();
        
        // Additional wait to ensure everything is ready
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.warn('Error in initial load:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    const id = setTimeout(run, 0);
    return () => {
      isMounted = false;
      clearTimeout(id);
    };
  }, [isClient, pathname]);

  // Route change
  useEffect(() => {
    if (!isClient) return;

    // Skip loading for dashboard internal navigation
    if (pathname.startsWith('/dashboard')) {
      return;
    }

    let isMounted = true;
    const run = async () => {
      setIsLoading(true);
      
      try {
        // Wait for new content to render
        await new Promise(resolve => setTimeout(resolve, 100));
        await waitForImages();
        
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.warn('Error in route change:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    run();
    return () => {
      isMounted = false;
    };
  }, [pathname, isClient]);

  // Immediately disable loading when entering dashboard
  useEffect(() => {
    if (isClient && pathname.startsWith('/dashboard') && isLoading) {
      setIsLoading(false);
    }
  }, [pathname, isClient, isLoading]);

  // Don't render loader during SSR
  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {isLoading && !pathname.startsWith('/dashboard') && <FullscreenLoader text="Loading page..." />}
      {children}
    </>
  );
}


