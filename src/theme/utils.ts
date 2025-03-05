import { VisualMode } from './types';
import { COLORS, GRID_OPACITY } from './config';

/**
 * Get the appropriate border color based on theme state
 * @param isDark - Whether dark mode is active
 * @param visualMode - Current visual mode
 */
export const getBorderColor = (isDark: boolean, visualMode: VisualMode): string => {
  if (visualMode === 'retro') {
    return 'border-black';
  }
  
  if (visualMode === 'grayscale') {
    return isDark ? 'border-white' : 'border-black';
  }
  
  // Standard mode
  return isDark 
    ? `border-[${COLORS.border.dark}]` 
    : `border-[${COLORS.border.light}]`;
};

/**
 * Get the grid color for EmptyBox component
 * @param isDark - Whether dark mode is active
 * @param visualMode - Current visual mode
 */
export const getGridColor = (isDark: boolean, visualMode: VisualMode): string => {
  if (visualMode === 'retro') {
    return 'black';
  }
  
  if (visualMode === 'grayscale') {
    return isDark ? 'white' : 'black';
  }
  
  // Standard mode with dark/light variants
  return isDark 
    ? COLORS.grid.dark.standard 
    : COLORS.grid.light.standard;
};

/**
 * Get the grid opacity for EmptyBox component
 * @param isDark - Whether dark mode is active
 * @param visualMode - Current visual mode
 */
export const getGridOpacity = (isDark: boolean, visualMode: VisualMode): number => {
  if (visualMode === 'retro') {
    return GRID_OPACITY.retro;
  }
  
  if (visualMode === 'grayscale') {
    return isDark 
      ? GRID_OPACITY.grayscale.dark 
      : GRID_OPACITY.grayscale.light;
  }
  
  // Standard mode
  return isDark 
    ? GRID_OPACITY.standard.dark 
    : GRID_OPACITY.standard.light;
};

/**
 * Get the background color for components
 * @param isDark - Whether dark mode is active
 * @param visualMode - Current visual mode
 */
export const getBackgroundColor = (isDark: boolean, visualMode: VisualMode): string => {
  if (visualMode === 'retro') {
    return '#ffffeb';
  }
  
  if (visualMode === 'grayscale') {
    return isDark ? '#1e1e1e' : '#f5f5f5';
  }
  
  // Standard mode
  return isDark 
    ? COLORS.background.dark
    : COLORS.background.light;
};

/**
 * Generate tailwind classes for a themed element
 * @param params - Configuration parameters
 */
export const themedClasses = (params: {
  base?: string;
  text?: {
    light?: string;
    dark?: string;
  };
  bg?: {
    light?: string;
    dark?: string;
  };
  border?: {
    light?: string;
    dark?: string;
  };
}): string => {
  const { base = '', text, bg, border } = params;
  
  // Start with base classes
  let classes = base;
  
  // Add text color classes
  if (text) {
    classes += ` ${text.light || 'text-black'} dark:${text.dark || 'text-white'}`;
  }
  
  // Add background color classes
  if (bg) {
    classes += ` ${bg.light || ''} dark:${bg.dark || ''}`;
  }
  
  // Add border color classes
  if (border) {
    classes += ` ${border.light || ''} dark:${border.dark || ''}`;
  }
  
  return classes;
}; 