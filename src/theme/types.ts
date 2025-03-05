/**
 * Core theme system types
 */

// Available color modes (light/dark)
export type ColorMode = 'light' | 'dark' | 'system';

// Available special visual modes
export type VisualMode = 'standard' | 'grayscale' | 'retro';

// Combined theme state
export interface ThemeState {
  colorMode: ColorMode;
  resolvedColorMode: 'light' | 'dark'; // The actual color mode after system preference is applied
  visualMode: VisualMode;
}

// Theme context type
export interface ThemeContextType extends ThemeState {
  // Color mode methods
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  
  // Visual mode methods
  setVisualMode: (mode: VisualMode) => void;
  toggleGrayscale: () => void;
  toggleRetro: () => void;
  
  // Convenience getters
  isGrayscale: boolean;
  isRetro: boolean;
  isDark: boolean;
} 