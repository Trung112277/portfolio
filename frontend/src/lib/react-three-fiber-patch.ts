/* eslint-disable @typescript-eslint/no-explicit-any */
// Patch for React Three Fiber compatibility with React 19
import React from 'react';

// Patch React version detection
if (typeof React !== 'undefined') {
  if (!React.version || React.version === '') {
    Object.defineProperty(React, 'version', {
      value: '19.1.0',
      writable: false,
      configurable: false
    });
  }
}

// Patch React DevTools globally
if (typeof window !== 'undefined') {
  // Store original console methods
  const originalError = console.error;
  const originalWarn = console.warn;
  
  // Override console.error to suppress specific React Three Fiber errors
  console.error = function(...args: any[]) {
    const message = args.join(' ');
    if (message.includes('Invalid argument not valid semver') || 
        message.includes('React instrumentation encountered an error')) {
      // Suppress these specific errors
      return;
    }
    // Call original error for other messages
    originalError.apply(console, args);
  };
  
  // Override console.warn to suppress React Three Fiber warnings
  console.warn = function(...args: any[]) {
    const message = args.join(' ');
    if (message.includes('React Three Fiber') || 
        message.includes('semver') ||
        message.includes('react-reconciler')) {
      // Suppress these specific warnings
      return;
    }
    // Call original warn for other messages
    originalWarn.apply(console, args);
  };
  
  // Patch React DevTools hook
  if (typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (hook && hook.injectInternals) {
      const originalInjectInternals = hook.injectInternals;
      hook.injectInternals = function(internals: any) {
        try {
          return originalInjectInternals.call(this, internals);
        } catch (error: any) {
          // Suppress semver errors
          if (error.message && (
            error.message.includes('Invalid argument not valid semver') ||
            error.message.includes('semver') ||
            error.message.includes('React instrumentation')
          )) {
            return;
          }
          throw error;
        }
      };
    }
  }
}

export {};
