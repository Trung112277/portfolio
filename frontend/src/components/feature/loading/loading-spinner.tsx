import { memo } from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "primary" | "secondary" | "white";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6", 
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const colorClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
};

export const LoadingSpinner = memo(({ 
  size = "md", 
  className = "",
  color = "primary"
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        "shadow-lg", // Add shadow for better visibility
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
      style={{
        // Ensure spinner is visible with better contrast
        filter: color === 'white' ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' : undefined
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";
