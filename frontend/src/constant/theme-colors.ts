export const THEME_COLORS = {
  primary: "#1fc3ff",
  secondary: "#4ecdc4", 
  accent: "#e34f26",
  purple: "#764abc",
  gradients: {
    aurora: ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
    rainbow: ["#38BDF8", "#3B82F6", "#EC4899"],
    mainHeader: ["#38BDF8", "#3B82F6", "#EC4899"],
  }
} as const;

export const BUTTON_COLORS = {
  about: "#1fc3ff",
  tech: "#4ecdc4",
  projects: "#e34f26", 
  dashboard: "#764abc",
} as const;

// Animation constants
export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.6,
  flip: 3000, // milliseconds
  aurora: 10, // seconds
} as const;

// UI Constants
export const UI_CONSTANTS = {
  cursorSize: 24,
  trailDuration: 600,
  maxTrailDots: 50,
  fadeThreshold: 0.01,
} as const;

export type ThemeColor = keyof typeof THEME_COLORS;
export type ButtonColor = keyof typeof BUTTON_COLORS;
