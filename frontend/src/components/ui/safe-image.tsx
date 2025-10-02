"use client";

import { useState, useEffect, useRef, memo } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/feature/loading/loading-spinner";

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
  fallbackComponent?: React.ReactNode;
  onError?: (error: Error) => void;
  onLoad?: () => void;
  blurDataURL?: string;
  lazy?: boolean;
  rootMargin?: string;
  threshold?: number;
}

const SafeImage = memo(({
  src,
  alt,
  fallbackSrc = "/images/placeholder.png",
  fallbackComponent,
  className,
  onError,
  onLoad,
  blurDataURL,
  lazy = true,
  rootMargin = "50px",
  threshold = 0.1,
  ...props
}: SafeImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [lazy, shouldLoad, rootMargin, threshold]);  

  const handleError = () => {
    setHasError(true);
    onError?.(new Error(`Failed to load image: ${src}`));
  };

  const handleFallbackError = () => {
    setFallbackError(true);
  };

  const handleLoad = () => {
    onLoad?.();
  };

  const defaultBlur = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzInIGhlaWdodD0nMzInIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyByeD0nNCcgZmlsbD0nI2ZmZicgZmlsbC1vcGFjaXR5PScwLjEnIC8+PC9zdmc+";

  // Show placeholder while waiting for intersection
  if (lazy && !shouldLoad) {
    return (
      <div
        ref={imgRef}
        className={cn(
          "flex items-center justify-center bg-muted rounded-md animate-pulse w-full h-full",
          className
        )}
        style={{ aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : undefined }}
      >
      </div>
    );
  }

  // If both main image and fallback failed, or no fallback available
  if (hasError && (fallbackError || !fallbackSrc || fallbackSrc === src)) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    
    return (
      <div className={cn(
        "flex items-center justify-center bg-muted rounded-md",
        className
      )}>
        <span className="text-muted-foreground text-sm">
          {alt || "Image failed to load"}
        </span>
      </div>
    );
  }

  // If main image failed but fallback is available
  if (hasError && fallbackSrc && fallbackSrc !== src && !fallbackError) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        className={className}
        onError={handleFallbackError}
        onLoad={handleLoad}
        placeholder="blur"
        blurDataURL={blurDataURL ?? defaultBlur}
        {...props}
      />
    );
  }

  // Show main image
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      placeholder="blur"
      blurDataURL={blurDataURL ?? defaultBlur}
      {...props}
    />
  );
});

SafeImage.displayName = "SafeImage";

export { SafeImage };
