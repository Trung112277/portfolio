"use client";

import Link from "next/link";
import { hexToRgb } from "@/lib/utils";
import { usePageLoader } from "@/hooks/usePageLoader";

export function FloatingButton({
  children,
  color = "#1fc3ff",
  to,
}: {
  children: React.ReactNode;
  color?: string;
  to: string;
}) {
  const rgbColor = hexToRgb(color);
  const { startLoading } = usePageLoader();
  
  const handleClick = () => {
    // Chỉ start loading cho page navigation, không phải anchor links
    if (!to.startsWith('#') && !to.startsWith('/dashboard/')) {
      startLoading(to);
    }
  };
  
  return (
    <Link 
      href={to} 
      className="floating-button"
      data-testid={`floating-button-${to.replace(/[^a-zA-Z0-9]/g, '-')}`}
      style={{
        '--button-color': color,
        '--button-color-rgb': rgbColor,
      } as React.CSSProperties}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
