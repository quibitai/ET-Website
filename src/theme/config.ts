/**
 * Theme Configuration
 */

// Base colors
export const COLORS = {
  // Primary brand color
  primary: {
    light: '#FF3B31',
    dark: '#FF7A6E',
  },
  
  // Background colors
  background: {
    light: '#F0EBE6',
    dark: '#191919',
  },
  
  // Text colors
  text: {
    light: '#000000',
    dark: '#FFFFFF',
  },
  
  // Border colors
  border: {
    light: '#FF3B31',
    dark: '#FF7A6E',
  },
  
  // Grid colors for the EmptyBox component
  grid: {
    light: {
      standard: '#FF3B31',
      dark: 'rgb(230, 230, 230)',
    },
    dark: {
      standard: '#FFFFFF',
    }
  },
};

// Grid element opacity
export const GRID_OPACITY = {
  standard: {
    light: 0.5,
    dark: 0.3,
  },
  grayscale: {
    light: 0.7,
    dark: 0.4,
  },
  retro: 1.0,
};

// These classes are essential for each visual mode
export const MODE_CLASSES = {
  standard: [],
  grayscale: ['grayscale-mode'],
  retro: ['retro-mode'],
};

// CSS variable mapping for theme tokens
export const CSS_VARS = {
  // Primary color tokens
  '--color-primary': 'var(--color-primary)',
  '--color-primary-light': 'var(--color-primary-light)',
  '--color-primary-dark': 'var(--color-primary-dark)',
  
  // Background tokens
  '--color-bg': 'var(--color-bg)',
  '--color-bg-offset': 'var(--color-bg-offset)',
  
  // Text tokens
  '--color-text': 'var(--color-text)',
  '--color-text-offset': 'var(--color-text-offset)',
  
  // Border tokens
  '--color-border': 'var(--color-border)',
}; 