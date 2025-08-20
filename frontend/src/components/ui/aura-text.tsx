"use client";
import React, { memo, useMemo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: readonly string[] | string[];
  speed?: number;
}

export const AuroraText = memo(({
  children,
  className = "",
  colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
  speed = 1,
}: AuroraTextProps) => {
  // Memoize gradient style để tránh tính toán lại khi re-render
  const gradientStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: `${10 / speed}s`,
  }), [colors, speed]);

  // Memoize class names
  const wrapperClassName = useMemo(() => 
    `relative inline-block ${className}`,
    [className]
  );

  return (
    <span className={wrapperClassName}>
      <span className="sr-only">{children}</span>
      <span
        className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
        style={gradientStyle}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
});

AuroraText.displayName = "AuroraText";