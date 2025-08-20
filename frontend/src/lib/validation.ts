/**
 * Validation utilities for the portfolio application
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email.trim()) {
    return { isValid: false, error: "Email is required" };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Invalid email format" };
  }
  
  return { isValid: true };
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): ValidationResult {
  if (!url.trim()) {
    return { isValid: false, error: "URL is required" };
  }
  
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: "Invalid URL format" };
  }
}

/**
 * Validate project data
 */
export function validateProject(project: unknown): ValidationResult {
  if (!project || typeof project !== 'object') {
    return { isValid: false, error: "Project must be an object" };
  }
  
  const proj = project as Record<string, unknown>;
  
  if (!proj.id || typeof proj.id !== 'string' || !proj.id.trim()) {
    return { isValid: false, error: "Project ID is required" };
  }
  
  if (!proj.title || typeof proj.title !== 'string' || !proj.title.trim()) {
    return { isValid: false, error: "Project title is required" };
  }
  
  if (!proj.description || typeof proj.description !== 'string' || !proj.description.trim()) {
    return { isValid: false, error: "Project description is required" };
  }
  
  if (!proj.link || typeof proj.link !== 'string' || !proj.link.trim()) {
    return { isValid: false, error: "Project link is required" };
  }
  
  const urlValidation = validateUrl(proj.link);
  if (!urlValidation.isValid) {
    return { isValid: false, error: `Project link: ${urlValidation.error}` };
  }
  
  return { isValid: true };
}

/**
 * Validate tech stack item
 */
export function validateTechStack(tech: unknown): ValidationResult {
  if (!tech || typeof tech !== 'object') {
    return { isValid: false, error: "Tech must be an object" };
  }
  
  const techItem = tech as Record<string, unknown>;
  
  if (!techItem.id || typeof techItem.id !== 'string' || !techItem.id.trim()) {
    return { isValid: false, error: "Tech ID is required" };
  }
  
  if (!techItem.name || typeof techItem.name !== 'string' || !techItem.name.trim()) {
    return { isValid: false, error: "Tech name is required" };
  }
  
  if (!techItem.color || typeof techItem.color !== 'string' || !techItem.color.trim()) {
    return { isValid: false, error: "Tech color is required" };
  }
  
  if (!techItem.logo || typeof techItem.logo !== 'string' || !techItem.logo.trim()) {
    return { isValid: false, error: "Tech logo is required" };
  }
  
  return { isValid: true };
}

/**
 * Safe JSON parse with error handling
 */
export function safeJsonParse<T>(json: string, defaultValue: T): T {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
    return defaultValue;
  }
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
