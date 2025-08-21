import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 * Uses clsx for conditional classes and twMerge for Tailwind class merging
 * 
 * @param inputs - Array of class values (strings, objects, arrays, etc.)
 * @returns Merged class string with resolved conflicts
 * 
 * @example
 * ```tsx
 * cn('px-2 py-1', 'px-4') // Returns 'py-1 px-4'
 * cn('text-red-500', { 'text-blue-500': isActive }) // Conditional classes
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates if a string is a valid hex color format
 * Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) hex colors
 * 
 * @param hex - The hex color string to validate
 * @returns True if the hex color is valid, false otherwise
 * 
 * @example
 * ```ts
 * isValidHexColor('#1fc3ff') // true
 * isValidHexColor('#fff') // true
 * isValidHexColor('invalid') // false
 * ```
 */
export function isValidHexColor(hex: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(hex);
}

/**
 * Converts a hex color string to RGB format
 * Handles both 3-digit and 6-digit hex colors
 * Returns a fallback color if the input is invalid
 * 
 * @param hex - Hex color string (e.g., "#1fc3ff" or "#fff")
 * @returns RGB string in format "r, g, b" or fallback color
 * 
 * @example
 * ```ts
 * hexToRgb('#1fc3ff') // "31, 195, 255"
 * hexToRgb('#fff') // "255, 255, 255"
 * hexToRgb('invalid') // "31, 195, 255" (fallback)
 * ```
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
