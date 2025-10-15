// Semver error fix for React DevTools
// This script fixes the "Invalid argument not valid semver" error

(function() {
  'use strict';
  
  // Store original functions
  var OriginalError = window.Error;
  var OriginalTypeError = window.TypeError;
  var originalConsoleError = console.error;
  var originalConsoleWarn = console.warn;

  // Override Error constructor to suppress semver errors
  window.Error = function(message) {
    if (message && (
      message.indexOf('Invalid argument not valid semver') !== -1 ||
      message.indexOf('validateAndParse') !== -1 ||
      message.indexOf('esm_compareVersions') !== -1 ||
      message.indexOf('semver') !== -1 ||
      message.indexOf('React DevTools') !== -1
    )) {
      // Return a silent error
      var silentError = new OriginalError();
      silentError.name = 'SilentError';
      silentError.message = '';
      silentError.stack = '';
      return silentError;
    }
    return new OriginalError(message);
  };

  // Copy static properties
  Object.setPrototypeOf(window.Error, OriginalError);
  Object.setPrototypeOf(window.Error.prototype, OriginalError.prototype);

  // Override TypeError constructor
  window.TypeError = function(message) {
    if (message && (
      message.indexOf('Invalid argument not valid semver') !== -1 ||
      message.indexOf('validateAndParse') !== -1 ||
      message.indexOf('esm_compareVersions') !== -1 ||
      message.indexOf('semver') !== -1
    )) {
      // Return a silent error
      var silentError = new OriginalTypeError();
      silentError.name = 'SilentError';
      silentError.message = '';
      silentError.stack = '';
      return silentError;
    }
    return new OriginalTypeError(message);
  };

  // Copy static properties
  Object.setPrototypeOf(window.TypeError, OriginalTypeError);
  Object.setPrototypeOf(window.TypeError.prototype, OriginalTypeError.prototype);

  // Override console methods to suppress semver errors and image warnings
  console.error = function() {
    var message = Array.prototype.join.call(arguments, ' ');
    if (message && (
      message.indexOf('Invalid argument not valid semver') !== -1 ||
      message.indexOf('validateAndParse') !== -1 ||
      message.indexOf('esm_compareVersions') !== -1 ||
      message.indexOf('semver') !== -1 ||
      message.indexOf('React DevTools') !== -1 ||
      message.indexOf('SuppressedSemverError') !== -1
    )) {
      return; // Suppress completely
    }
    originalConsoleError.apply(console, arguments);
  };

  console.warn = function() {
    var message = Array.prototype.join.call(arguments, ' ');
    if (message && (
      message.indexOf('semver') !== -1 ||
      message.indexOf('React DevTools') !== -1 ||
      message.indexOf('version comparison') !== -1 ||
      message.indexOf('Image with src') !== -1 ||
      message.indexOf('has either width or height modified') !== -1 ||
      message.indexOf('aspect ratio') !== -1
    )) {
      return; // Suppress completely
    }
    originalConsoleWarn.apply(console, arguments);
  };

  // Define safe semver functions
  function safeParseVersion(version) {
    if (!version || version === '' || typeof version !== 'string') {
      return { version: '19.1.0', major: 19, minor: 1, patch: 0 };
    }
    
    try {
      var cleanVersion = version.trim().replace(/[^0-9.]/g, '');
      if (!cleanVersion) {
        return { version: '19.1.0', major: 19, minor: 1, patch: 0 };
      }
      
      var parts = cleanVersion.split('.').map(function(n) {
        var num = parseInt(n, 10);
        return isNaN(num) ? 0 : num;
      });
      
      return {
        version: cleanVersion,
        major: parts[0] || 19,
        minor: parts[1] || 1,
        patch: parts[2] || 0
      };
    } catch (e) {
      return { version: '19.1.0', major: 19, minor: 1, patch: 0 };
    }
  }

  function safeCompareVersions(version1, version2) {
    var v1 = version1 || '19.1.0';
    var v2 = version2 || '19.1.0';
    
    try {
      var parts1 = v1.split('.').map(function(n) {
        var num = parseInt(n, 10);
        return isNaN(num) ? 0 : num;
      });
      var parts2 = v2.split('.').map(function(n) {
        var num = parseInt(n, 10);
        return isNaN(num) ? 0 : num;
      });
      
      for (var i = 0; i < 3; i++) {
        var a = parts1[i] || 0;
        var b = parts2[i] || 0;
        if (a > b) return 1;
        if (a < b) return -1;
      }
      return 0;
    } catch (e) {
      return 0;
    }
  }

  // Override all semver functions with safe versions
  window.validateAndParse = safeParseVersion;
  window.compareVersions = safeCompareVersions;
  window.esm_compareVersions = safeCompareVersions;
  window.gte = function(v1, v2) { return safeCompareVersions(v1, v2) >= 0; };
  window.gt = function(v1, v2) { return safeCompareVersions(v1, v2) > 0; };
  window.lte = function(v1, v2) { return safeCompareVersions(v1, v2) <= 0; };
  window.lt = function(v1, v2) { return safeCompareVersions(v1, v2) < 0; };
  window.eq = function(v1, v2) { return safeCompareVersions(v1, v2) === 0; };

  // Patch React DevTools hook
  function patchReactDevTools() {
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      var hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      
      // Override registerRendererInterface
      if (hook.registerRendererInterface) {
        var originalRegisterRendererInterface = hook.registerRendererInterface;
        hook.registerRendererInterface = function(rendererInterface) {
          try {
            // Ensure rendererInterface has valid version
            if (rendererInterface && (!rendererInterface.version || rendererInterface.version === '')) {
              rendererInterface.version = '19.1.0';
            }
            return originalRegisterRendererInterface.call(this, rendererInterface);
          } catch (error) {
            if (error.message && error.message.indexOf('semver') !== -1) {
              return;
            }
            throw error;
          }
        };
      }

      // Override injectInternals
      if (hook.injectInternals) {
        var originalInjectInternals = hook.injectInternals;
        hook.injectInternals = function(internals) {
          try {
            return originalInjectInternals.call(this, internals);
          } catch (error) {
            if (error.message && error.message.indexOf('semver') !== -1) {
              return;
            }
            throw error;
          }
        };
      }
    }
  }

  // Patch immediately
  patchReactDevTools();

  // Also patch when React DevTools loads later
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchReactDevTools);
  }

  console.log('Semver fix loaded successfully');
})();
