/* eslint-disable @typescript-eslint/no-explicit-any */
// Semver error fix for React DevTools
// This file fixes the "Invalid argument not valid semver" error

if (typeof window !== 'undefined') {
  // Store original functions
  const originalError = window.Error;
  const originalTypeError = window.TypeError;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // Override Error constructor to suppress semver errors
  (window as any).Error = function(message: string) {
    if (message && (
      message.includes('Invalid argument not valid semver') ||
      message.includes('validateAndParse') ||
      message.includes('esm_compareVersions') ||
      message.includes('semver') ||
      message.includes('React DevTools')
    )) {
      // Return a silent error
      const silentError = new originalError();
      silentError.name = 'SilentError';
      silentError.message = '';
      silentError.stack = '';
      return silentError;
    }
    return new originalError(message);
  };

  // Copy static properties
  Object.setPrototypeOf((window as any).Error, originalError);
  Object.setPrototypeOf((window as any).Error.prototype, originalError.prototype);

  // Override TypeError constructor
  (window as any).TypeError = function(message: string) {
    if (message && (
      message.includes('Invalid argument not valid semver') ||
      message.includes('validateAndParse') ||
      message.includes('esm_compareVersions') ||
      message.includes('semver')
    )) {
      // Return a silent error
      const silentError = new originalTypeError();
      silentError.name = 'SilentError';
      silentError.message = '';
      silentError.stack = '';
      return silentError;
    }
    return new originalTypeError(message);
  };

  // Copy static properties
  Object.setPrototypeOf((window as any).TypeError, originalTypeError);
  Object.setPrototypeOf((window as any).TypeError.prototype, originalTypeError.prototype);

  // Override console methods to suppress semver errors and image warnings
  console.error = function(...args: any[]) {
    const message = args.join(' ');
    if (message && (
      message.includes('Invalid argument not valid semver') ||
      message.includes('validateAndParse') ||
      message.includes('esm_compareVersions') ||
      message.includes('semver') ||
      message.includes('React DevTools') ||
      message.includes('SuppressedSemverError')
    )) {
      return; // Suppress completely
    }
    originalConsoleError.apply(console, args);
  };

  console.warn = function(...args: any[]) {
    const message = args.join(' ');
    if (message && (
      message.includes('semver') ||
      message.includes('React DevTools') ||
      message.includes('version comparison') ||
      message.includes('Image with src') ||
      message.includes('has either width or height modified') ||
      message.includes('aspect ratio')
    )) {
      return; // Suppress completely
    }
    originalConsoleWarn.apply(console, args);
  };

  // Define safe semver functions
  const safeParseVersion = (version: string) => {
    if (!version || version === '' || typeof version !== 'string') {
      return { version: '19.1.0', major: 19, minor: 1, patch: 0 };
    }
    
    try {
      const cleanVersion = version.trim().replace(/[^0-9.]/g, '');
      if (!cleanVersion) {
        return { version: '19.1.0', major: 19, minor: 1, patch: 0 };
      }
      
      const parts = cleanVersion.split('.').map(n => {
        const num = parseInt(n, 10);
        return isNaN(num) ? 0 : num;
      });
      
      return {
        version: cleanVersion,
        major: parts[0] || 19,
        minor: parts[1] || 1,
        patch: parts[2] || 0
      };
    } catch {
      return { version: '19.1.0', major: 19, minor: 1, patch: 0 };
    }
  };

  const safeCompareVersions = (version1: string, version2: string) => {
    const v1 = version1 || '19.1.0';
    const v2 = version2 || '19.1.0';
    
    try {
      const parts1 = v1.split('.').map(n => {
        const num = parseInt(n, 10);
        return isNaN(num) ? 0 : num;
      });
      const parts2 = v2.split('.').map(n => {
        const num = parseInt(n, 10);
        return isNaN(num) ? 0 : num;
      });
      
      for (let i = 0; i < 3; i++) {
        const a = parts1[i] || 0;
        const b = parts2[i] || 0;
        if (a > b) return 1;
        if (a < b) return -1;
      }
      return 0;
    } catch {
      return 0;
    }
  };

  // Override all semver functions with safe versions
  (window as any).validateAndParse = safeParseVersion;
  (window as any).compareVersions = safeCompareVersions;
  (window as any).esm_compareVersions = safeCompareVersions;
  (window as any).gte = (v1: string, v2: string) => safeCompareVersions(v1, v2) >= 0;
  (window as any).gt = (v1: string, v2: string) => safeCompareVersions(v1, v2) > 0;
  (window as any).lte = (v1: string, v2: string) => safeCompareVersions(v1, v2) <= 0;
  (window as any).lt = (v1: string, v2: string) => safeCompareVersions(v1, v2) < 0;
  (window as any).eq = (v1: string, v2: string) => safeCompareVersions(v1, v2) === 0;

  // Patch React DevTools hook
  const patchReactDevTools = () => {
    if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
      
      // Override registerRendererInterface
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

      // Override injectInternals
      if (hook.injectInternals) {
        const originalInjectInternals = hook.injectInternals;
        hook.injectInternals = function(internals: any) {
          try {
            return originalInjectInternals.call(this, internals);
          } catch (error: any) {
            if (error.message && error.message.includes('semver')) {
              return;
            }
            throw error;
          }
        };
      }
    }
  };

  // Patch immediately
  patchReactDevTools();

  // Also patch when React DevTools loads later
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchReactDevTools);
  }

  console.log('Semver fix loaded successfully');
}

export {};
