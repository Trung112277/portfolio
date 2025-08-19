import Link from "next/link";
import { hexToRgb } from "@/lib/utils";

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
  
  return (
    <Link 
      href={`${to}`} 
      className="floating-button"
      style={{
        '--button-color': color,
        '--button-color-rgb': rgbColor,
      } as React.CSSProperties}
    >
      {children}
    </Link>
  );
}
