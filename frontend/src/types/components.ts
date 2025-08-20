/**
 * Component-specific TypeScript types
 */

import { BaseComponentProps, Color, Size, AnimationConfig } from "./global";

// Button component types
export interface ButtonProps extends BaseComponentProps {
  variant?: "default" | "primary" | "secondary" | "ghost" | "link";
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

// FloatingButton types
export interface FloatingButtonProps extends BaseComponentProps {
  color?: Color;
  to?: string;
  external?: boolean;
  animation?: AnimationConfig;
  onClick?: () => void;
}

// Text component types
export interface TextProps extends BaseComponentProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "small";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "black";
  align?: "left" | "center" | "right" | "justify";
  color?: Color;
  truncate?: boolean;
  lineClamp?: number;
}

// Image component types
export interface ImageProps extends BaseComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  loading?: "lazy" | "eager";
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// Modal component types
export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: Size;
  closable?: boolean;
  maskClosable?: boolean;
  footer?: React.ReactNode;
}

// Tooltip component types
export interface TooltipProps extends BaseComponentProps {
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click" | "focus";
  delay?: number;
  disabled?: boolean;
}

// Loading component types
export interface LoadingProps extends BaseComponentProps {
  size?: Size;
  color?: Color;
  text?: string;
  overlay?: boolean;
}

// Animation component types
export interface AnimatedProps extends BaseComponentProps {
  animation?: AnimationConfig;
  trigger?: "hover" | "click" | "inView" | "mount";
  threshold?: number;
}

// Form component types
export interface FormProps extends BaseComponentProps {
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  resetOnSubmit?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface InputProps extends BaseComponentProps {
  type?: "text" | "email" | "password" | "number" | "url" | "tel";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Layout component types
export interface ContainerProps extends BaseComponentProps {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  centered?: boolean;
  padding?: boolean;
}

export interface GridProps extends BaseComponentProps {
  cols?: number | { [key: string]: number };
  gap?: Size;
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  align?: "start" | "center" | "end" | "stretch";
}

export interface FlexProps extends BaseComponentProps {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  gap?: Size;
}

// Navigation component types
export interface NavItemProps extends BaseComponentProps {
  href: string;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps extends BaseComponentProps {
  items: Array<{
    label: string;
    href?: string;
    active?: boolean;
  }>;
  separator?: React.ReactNode;
}

// Card component types
export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  image?: string;
  footer?: React.ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
  loading?: boolean;
}

// Badge component types
export interface BadgeProps extends BaseComponentProps {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error";
  size?: Size;
  dot?: boolean;
  count?: number;
  showZero?: boolean;
}
