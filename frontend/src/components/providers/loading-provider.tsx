"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FullscreenLoader } from "@/components/feature/loading/fullscreen-loader";

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Helper: wait for all images currently in DOM to finish loading/decoding
  const waitForImages = async () => {
    try {
      const images = Array.from(document.images) as HTMLImageElement[];
      const imagePromises = images.map((img) => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        const maybeDecode = img.decode as unknown;
        if (typeof maybeDecode === "function") {
          return (img.decode as () => Promise<void>)()
            .catch(() => undefined);
        }
        return new Promise<void>((resolve) => {
          const onDone = () => {
            img.removeEventListener("load", onDone);
            img.removeEventListener("error", onDone);
            resolve();
          };
          img.addEventListener("load", onDone, { once: true });
          img.addEventListener("error", onDone, { once: true });
        });
      });

      // Also wait for CSS background images found in computed styles
      const elements = Array.from(document.querySelectorAll<HTMLElement>("*"));
      const bgUrls = new Set<string>();
      const urlRegex = /url\(("|')?([^"')]+)\1\)/g;
      for (const el of elements) {
        const bg = getComputedStyle(el).backgroundImage;
        if (!bg || bg === "none") continue;
        let match: RegExpExecArray | null;
        while ((match = urlRegex.exec(bg)) !== null) {
          const url = match[2];
          if (url) bgUrls.add(url);
        }
      }

      const bgPromises = Array.from(bgUrls).map((url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => resolve();
          img.src = url;
        })
      );

      await Promise.all([...imagePromises, ...bgPromises]);
    } catch {
      // Ignore errors, fallback to continue
    }
  };

  // Initial load: ensure we wait for images as well
  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setIsLoading(true);
      // Wait for all images (including CSS backgrounds) to finish
      await waitForImages();
      if (isMounted) setIsLoading(false);
    };
    // Run after next tick to ensure DOM rendered
    const id = setTimeout(run, 0);
    return () => {
      isMounted = false;
      clearTimeout(id);
    };
  }, []);

  // Route change loading state (App Router): wait for new page images
  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setIsLoading(true);
      // Give React/Next a moment to render new route content
      await new Promise((r) => setTimeout(r, 0));
      await waitForImages();
      if (isMounted) setIsLoading(false);
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  return (
    <>
      {isLoading && <FullscreenLoader text="Loading page..." />}
      {children}
    </>
  );
}


