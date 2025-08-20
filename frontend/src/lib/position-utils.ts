export interface Position {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  transform?: string;
}

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl';

export type ResponsivePosition =
  | Position
  | {
      base: Position;
      sm?: Position;
      md?: Position;
      lg?: Position;
      xl?: Position;
    };

/**
 * Convert position object to CSS styles
 * Handles fraction values like "1/6" -> "16.67%"
 */
export function getPositionStyles(position: Position): React.CSSProperties {
  const styles: React.CSSProperties = {
    position: 'absolute' as const,
  };

  // Helper function to convert fraction to percentage
  const convertValue = (value: string): string => {
    if (value.includes('/')) {
      const [numerator, denominator] = value.split('/').map(Number);
      return `${(numerator / denominator) * 100}%`;
    }
    return value;
  };

  if (position.top) styles.top = convertValue(position.top);
  if (position.left) styles.left = convertValue(position.left);
  if (position.right) styles.right = convertValue(position.right);
  if (position.bottom) styles.bottom = convertValue(position.bottom);
  if (position.transform) styles.transform = position.transform;

  return styles;
}

/**
 * Validate position values
 */
export function validatePosition(position: Position): boolean {
  const validKeys = ['top', 'left', 'right', 'bottom', 'transform'];
  return Object.keys(position).every(key => validKeys.includes(key));
}

/**
 * Resolve a responsive position to a concrete position for a given breakpoint
 */
export function resolveResponsivePosition(
  position: ResponsivePosition,
  breakpoint: Breakpoint
): Position {
  if (!position) return {};
  if (!('base' in position)) {
    return position as Position;
  }
  const responsive = position as Exclude<ResponsivePosition, Position>;
  const base: Position = responsive.base ?? {};
  const override: Position | undefined = responsive[breakpoint];
  return { ...base, ...(override ?? {}) };
}
