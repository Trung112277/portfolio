import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validate if a string is a valid hex color
 */
export function isValidHexColor(hex: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(hex);
}

/**
 * Convert hex color to RGB string format
 * @param hex - Hex color string (e.g., "#1fc3ff" or "#fff")
 * @returns RGB string (e.g., "31, 195, 255") or fallback
 */
export function hexToRgb(hex: string): string {
  // Validate input
  if (!isValidHexColor(hex)) {
    console.warn(`Invalid hex color: ${hex}. Using fallback.`);
    return "31, 195, 255"; // Default primary color
  }

  const cleanHex = hex.replace('#', '');
  
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}
