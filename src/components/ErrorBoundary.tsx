import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle errors in child components
 * Prevents the entire app from crashing when a component fails
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call onError handler if provided
    this.props.onError?.(error, errorInfo);
    
    // You could also log the error to an error reporting service here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="error-boundary" role="alert">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message || 'Unknown error'}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Wrapper component that provides a more declarative API for using error boundaries
 */
interface WithErrorBoundaryProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: ReactNode;
}

export const WithErrorBoundary: React.FC<WithErrorBoundaryProps> = ({
  fallback,
  onError,
  children
}) => (
  <ErrorBoundary fallback={fallback} onError={onError}>
    {children}
  </ErrorBoundary>
); 