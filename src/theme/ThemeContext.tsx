import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ColorMode, VisualMode, ThemeContextType } from './types';
import { MODE_CLASSES } from './config';

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Custom hook to access the theme context
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Helper to get system color preference
 */
const getSystemColorPreference = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Legacy hooks to maintain backward compatibility
 */
export const useGrayscale = () => {
  const { isGrayscale, toggleGrayscale } = useTheme();
  return { isGrayscale, toggleGrayscale };
};

export const useRetro = () => {
  const { isRetro, toggleRetro } = useTheme();
  return { isRetro, toggleRetro };
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Always initialize with light mode regardless of local storage
  const [colorMode, setColorModeState] = useState<ColorMode>('light');

  // Always initialize with grayscale mode regardless of local storage
  const [visualMode, setVisualModeState] = useState<VisualMode>('grayscale');

  const [resolvedColorMode, setResolvedColorMode] = useState<'light' | 'dark'>('light');

  // Update color mode
  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode);
    localStorage.setItem('color-mode', mode);
  }, []);

  // Toggle between light and dark
  const toggleColorMode = useCallback(() => {
    setColorMode(resolvedColorMode === 'light' ? 'dark' : 'light');
  }, [resolvedColorMode, setColorMode]);

  // Set visual mode
  const setVisualMode = useCallback((mode: VisualMode) => {
    setVisualModeState(mode);

    // Update localStorage
    localStorage.setItem('retro-mode', (mode === 'retro').toString());
    localStorage.setItem('grayscale-mode-new', (mode === 'grayscale').toString());
    
    // For backward compatibility
    localStorage.setItem('grayscale-mode', (mode === 'grayscale').toString());
  }, []);

  // Toggle grayscale mode
  const toggleGrayscale = useCallback(() => {
    setVisualMode(visualMode === 'grayscale' ? 'standard' : 'grayscale');
  }, [visualMode, setVisualMode]);

  // Toggle retro mode
  const toggleRetro = useCallback(() => {
    setVisualMode(visualMode === 'retro' ? 'standard' : 'retro');
  }, [visualMode, setVisualMode]);

  // Convenience getters
  const isGrayscale = visualMode === 'grayscale';
  const isRetro = visualMode === 'retro';
  const isDark = resolvedColorMode === 'dark';

  // Apply system preference changes
  useEffect(() => {
    if (colorMode === 'system') {
      const handleSystemChange = (e: MediaQueryListEvent) => {
        setResolvedColorMode(e.matches ? 'dark' : 'light');
      };

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleSystemChange);

      // Set initial value
      setResolvedColorMode(mediaQuery.matches ? 'dark' : 'light');

      return () => {
        mediaQuery.removeEventListener('change', handleSystemChange);
      };
    } else {
      setResolvedColorMode(colorMode as 'light' | 'dark');
    }
  }, [colorMode]);

  // Apply classes to document root
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Clear previous classes
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.remove('grayscale-mode', 'grayscale-mode-new', 'retro-mode');

      // Add appropriate classes
      document.documentElement.classList.add(resolvedColorMode);

      // Add the appropriate visual mode classes
      if (MODE_CLASSES[visualMode]) {
        MODE_CLASSES[visualMode].forEach(className => {
          document.documentElement.classList.add(className);
        });
      }
    }
  }, [resolvedColorMode, visualMode]);

  // Create context value
  const contextValue: ThemeContextType = {
    colorMode,
    resolvedColorMode,
    visualMode,
    setColorMode,
    toggleColorMode,
    setVisualMode,
    toggleGrayscale,
    toggleRetro,
    isGrayscale,
    isRetro,
    isDark
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}; 