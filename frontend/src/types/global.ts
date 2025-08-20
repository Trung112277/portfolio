/**
 * Global TypeScript types for the portfolio application
 */

// Common utility types
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  repeat?: number;
  repeatType?: "loop" | "reverse" | "mirror";
  repeatDelay?: number;
}

// Component base props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

// Color types
export type HexColor = `#${string}`;
export type RGBColor = `rgb(${number}, ${number}, ${number})`;
export type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
export type Color = HexColor | RGBColor | RGBAColor | string;

// Size types
export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ResponsiveSize = Size | { [key: string]: Size };



// API response types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

// Loading states
export type LoadingState = "idle" | "loading" | "success" | "error";

// Form types
export interface FormField<T = unknown> {
  value: T;
  error?: string;
  touched: boolean;
  disabled?: boolean;
}

export interface FormState<T extends Record<string, unknown>> {
  fields: { [K in keyof T]: FormField<T[K]> };
  isSubmitting: boolean;
  isValid: boolean;
  errors: string[];
}

// Event types
export type CustomEventHandler<T = unknown> = (data: T) => void;
export type AsyncEventHandler<T = unknown> = (data: T) => Promise<void>;

// Utility function types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// Generic component props
export interface ComponentWithVariants<T extends string> extends BaseComponentProps {
  variant?: T;
  size?: Size;
}

// Layout types
export interface LayoutConfig {
  header?: boolean;
  footer?: boolean;
  sidebar?: boolean;
  maxWidth?: string;
  padding?: string;
}
