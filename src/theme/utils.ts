import { VisualMode } from './types';
import { COLORS, GRID_OPACITY } from './config';

/**
 * Get the appropriate color for a specific color type, visual mode, and dark/light variant
 * @param colorType - The type of color to get (primary, border, etc.)
 * @param visualMode - Current visual mode (standard, grayscale, retro)
 * @param isDark - Whether dark mode is active
 */
export const getThemeColor = (
  colorType: keyof typeof COLORS, 
  visualMode: VisualMode, 
  isDark: boolean
): string => {
  // Use the correct visual mode, defaulting to standard if the requested mode isn't available
  const mode = COLORS[colorType][visualMode] ? visualMode : 'standard';
  
  // Return the appropriate color based on dark/light mode
  return COLORS[colorType][mode][isDark ? 'dark' : 'light'];
};

/**
 * Get the appropriate border color based on theme state
 * @param isDark - Whether dark mode is active
 * @param visualMode - Current visual mode
 */
export const getBorderColor = (isDark: boolean, visualMode: VisualMode): string => {
  return getThemeColor('border', visualMode, isDark);
};

/**
 * Get the grid color for components
 * @param isDark - Whether dark mode is active
 * @param visualMode - Current visual mode
 */
export const getGridColor = (isDark: boolean, visualMode: VisualMode): string => {
  return getThemeColor('grid', visualMode, isDark);
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
  return getThemeColor('background', visualMode, isDark);
};

/**
 * Get the text color for components
 * @param isDark - Whether dark mode is active
 * @param visualMode - Current visual mode
 */
export const getTextColor = (isDark: boolean, visualMode: VisualMode): string => {
  return getThemeColor('text', visualMode, isDark);
};

/**
 * Get the primary color for components
 * @param isDark - Whether dark mode is active
 * @param visualMode - Current visual mode
 */
export const getPrimaryColor = (isDark: boolean, visualMode: VisualMode): string => {
  return getThemeColor('primary', visualMode, isDark);
};

/**
 * Get the accent color for components
 * @param isDark - Whether dark mode is active
 * @param visualMode - Current visual mode
 */
export const getAccentColor = (isDark: boolean, visualMode: VisualMode): string => {
  return getThemeColor('accent', visualMode, isDark);
};

/**
 * Get the highlight color for components
 * @param isDark - Whether dark mode is active
 * @param visualMode - Current visual mode
 */
export const getHighlightColor = (isDark: boolean, visualMode: VisualMode): string => {
  return getThemeColor('highlight', visualMode, isDark);
};

/**
 * Generate tailwind classes for a themed element
 * This function now adapts to the current visual mode automatically
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