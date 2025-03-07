/**
 * Animation and transition constants
 * Centralizes timing values for consistent animations across components
 */

export const ANIMATION_TIMINGS = {
  // Slider animation durations (in ms)
  sliderTransition: 400,
  sliderCleanup: 50,
  
  // Standard animation durations
  fast: 200,
  standard: 300,
  slow: 500,
  
  // Standard animation curves
  easings: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)'
  }
}; 