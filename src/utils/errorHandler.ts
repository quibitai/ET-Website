/**
 * Utility functions for error handling throughout the application
 */

/**
 * Sets up global error handlers for uncaught exceptions and promise rejections
 * @param options Configuration options for error handling
 */
export function setupGlobalErrorHandling(options: {
  onError?: (error: Error, errorInfo?: string) => void;
  onUnhandledRejection?: (reason: any, promise: Promise<any>) => void;
  shouldLogToConsole?: boolean;
} = {}) {
  const {
    onError,
    onUnhandledRejection,
    shouldLogToConsole = true
  } = options;

  // Handle regular errors
  window.addEventListener('error', (event) => {
    if (shouldLogToConsole) {
      console.error('Global error caught:', event.error);
      console.error('Error details:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    }
    
    if (onError) {
      onError(
        event.error || new Error(event.message), 
        `${event.filename}:${event.lineno}:${event.colno}`
      );
    }
    
    // Optionally send to error monitoring service
    // Example: sentryCapture(event.error)
  });
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (shouldLogToConsole) {
      console.error('Unhandled promise rejection:', event.reason);
    }
    
    if (onUnhandledRejection) {
      onUnhandledRejection(event.reason, event.promise);
    }
    
    // Optionally send to error monitoring service
    // Example: sentryCapture(event.reason)
  });
  
  console.log('Global error handlers initialized');
}

/**
 * Safely executes a function and returns the result or a default value if an error occurs
 * @param fn Function to execute
 * @param defaultValue Default value to return if an error occurs
 * @param errorHandler Optional handler for the error
 * @returns The result of the function or the default value
 */
export function tryCatch<T, D>(
  fn: () => T,
  defaultValue: D,
  errorHandler?: (error: Error) => void
): T | D {
  try {
    return fn();
  } catch (error) {
    if (errorHandler && error instanceof Error) {
      errorHandler(error);
    } else if (error instanceof Error) {
      console.error('Error caught in tryCatch:', error);
    }
    return defaultValue;
  }
}

/**
 * Creates a wrapped version of a function that catches any errors and calls an error handler
 * @param fn Function to wrap
 * @param errorHandler Handler for errors
 * @returns Wrapped function
 */
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  errorHandler: (error: Error, ...args: Parameters<T>) => void
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    try {
      return fn(...args);
    } catch (error) {
      if (error instanceof Error) {
        errorHandler(error, ...args);
      } else {
        errorHandler(new Error(String(error)), ...args);
      }
      return undefined;
    }
  };
} 