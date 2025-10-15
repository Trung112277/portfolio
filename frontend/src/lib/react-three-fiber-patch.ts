/* eslint-disable @typescript-eslint/no-explicit-any */
// Patch for React Three Fiber compatibility with React 19
import React from 'react';

// CRITICAL: Patch must run before any React DevTools code executes
// This needs to be the very first thing that runs

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

// Pre-emptively patch the global semver functions before React DevTools loads
if (typeof window !== 'undefined') {
  // Store original functions
  const originalValidateAndParse = (window as any).validateAndParse;
  const originalCompareVersions = (window as any).compareVersions;
  const originalEsmCompareVersions = (window as any).esm_compareVersions;
  const originalGTE = (window as any).gte;

  // Patch validateAndParse globally
  (window as any).validateAndParse = function(version: string) {
    try {
      if (!version || version === '' || typeof version !== 'string') {
        return { version: '19.1.0', major: 19, minor: 1, patch: 0 };
      }
      if (originalValidateAndParse) {
        return originalValidateAndParse(version);
      }
      return { version: '19.1.0', major: 19, minor: 1, patch: 0 };
    } catch {
      return { version: '19.1.0', major: 19, minor: 1, patch: 0 };
    }
  };

  // Patch compareVersions globally
  (window as any).compareVersions = function(version1: string, version2: string) {
    try {
      const v1 = version1 || '19.1.0';
      const v2 = version2 || '19.1.0';
      if (originalCompareVersions) {
        return originalCompareVersions(v1, v2);
      }
      return 0;
    } catch {
      return 0;
    }
  };

  // Patch esm_compareVersions globally
  (window as any).esm_compareVersions = function(version1: string, version2: string) {
    try {
      const v1 = version1 || '19.1.0';
      const v2 = version2 || '19.1.0';
      if (originalEsmCompareVersions) {
        return originalEsmCompareVersions(v1, v2);
      }
      return 0;
    } catch {
      return 0;
    }
  };

  // Patch gte globally
  (window as any).gte = function(version1: string, version2: string) {
    try {
      const v1 = version1 || '19.1.0';
      const v2 = version2 || '19.1.0';
      if (originalGTE) {
        return originalGTE(v1, v2);
      }
      return true;
    } catch {
      return true;
    }
  };
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
        message.includes('React instrumentation encountered an error') ||
        message.includes('validateAndParse') ||
        message.includes('esm_compareVersions')) {
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
        message.includes('react-reconciler') ||
        message.includes('React DevTools')) {
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
            error.message.includes('React instrumentation') ||
            error.message.includes('validateAndParse')
          )) {
            return;
          }
          throw error;
        }
      };
    }
  }

  // Additional patch for React DevTools version comparison
  const originalGTE = (window as any).gte;
  if (typeof originalGTE === 'function') {
    (window as any).gte = function(version1: string, version2: string) {
      try {
        // Ensure both versions are valid semver strings
        const v1 = version1 || '0.0.0';
        const v2 = version2 || '0.0.0';
        return originalGTE(v1, v2);
      } catch {
        // Fallback to false if comparison fails
        return false;
      }
    };
  }

  // Patch the semver comparison functions directly
  if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
    
    // Override the version comparison in the hook
    if (hook.registerRendererInterface) {
      const originalRegisterRendererInterface = hook.registerRendererInterface;
      hook.registerRendererInterface = function(rendererInterface: any) {
        try {
          // Ensure rendererInterface has valid version
          if (rendererInterface && (!rendererInterface.version || rendererInterface.version === '')) {
            rendererInterface.version = '19.1.0';
          }
          return originalRegisterRendererInterface.call(this, rendererInterface);
        } catch (error: any) {
          if (error.message && error.message.includes('semver')) {
            return;
          }
          throw error;
        }
      };
    }
  }
}

export {};
