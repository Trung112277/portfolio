"use client";

import { useState, memo } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
  fallbackComponent?: React.ReactNode;
  onError?: (error: Error) => void;
  onLoad?: () => void;
}

const SafeImage = memo(({
  src,
  alt,
  fallbackSrc = "/images/placeholder.png",
  fallbackComponent,
  className,
  onError,
  onLoad,
  ...props
}: SafeImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.(new Error(`Failed to load image: ${src}`));
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  if (hasError) {
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

  return (
    <>
      {isLoading && (
        <div className={cn(
          "animate-pulse bg-muted rounded-md",
          className
        )} />
      )}
      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={cn(
          isLoading ? "opacity-0" : "opacity-100",
          "transition-opacity duration-300",
          className
        )}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
});

SafeImage.displayName = "SafeImage";

export { SafeImage };
