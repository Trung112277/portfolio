import Link from "next/link";

export function FloatingButton({
  children,
  color = "#1fc3ff",
  to,
}: {
  children: React.ReactNode;
  color?: string;
  to: string;
}) {
  const hexToRgb = (hex: string): string => {
    const cleanHex = hex.replace('#', '');
    
    const r = parseInt(cleanHex.length === 3 ? cleanHex[0] + cleanHex[0] : cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.length === 3 ? cleanHex[1] + cleanHex[1] : cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.length === 3 ? cleanHex[2] + cleanHex[2] : cleanHex.slice(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  };

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
