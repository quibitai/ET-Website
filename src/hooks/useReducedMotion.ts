import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user prefers reduced motion
 * Uses the prefers-reduced-motion media query
 */
export const useReducedMotion = (): boolean => {
  // Default to false if SSR or if the media query is not supported
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is defined (not SSR)
    if (typeof window !== 'undefined') {
      // Create media query list
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      // Set initial value
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Create event handler
      const handleChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches);
      };
      
      // Add event listener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }
      
      // Clean up
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          // Fallback for older browsers
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, []);

  return prefersReducedMotion;
}; 