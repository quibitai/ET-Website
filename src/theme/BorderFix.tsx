import React, { useEffect } from 'react';
import { useTheme } from './ThemeContext';

/**
 * BorderFix Component
 * 
 * Handles border color consistency across different themes and modes.
 * This is a non-visual component that applies fixes to ensure borders
 * maintain the correct color regardless of theme changes.
 */
const BorderFix: React.FC = () => {
  const { resolvedColorMode, visualMode } = useTheme();
  
  useEffect(() => {
    // Function to handle border colors based on theme and visual mode
    const handleBorderColors = () => {
      const darkMode = resolvedColorMode === 'dark';
      const isRetroMode = visualMode === 'retro';
      const isGrayscaleMode = visualMode === 'grayscale';
      
      // Skip if in retro mode as it has its own styling
      if (isRetroMode) return;
      
      // Get all elements with red border classes (both tailwind and inline)
      const elements = document.querySelectorAll(
        '[class*="border-[#FF"], [style*="border-color: #FF"]'
      );
      
      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        
        // First clear any previously set inline styles to avoid stacking issues
        (el as HTMLElement).style.removeProperty('border-color');
        ['top', 'right', 'bottom', 'left'].forEach(side => {
          (el as HTMLElement).style.removeProperty(`border-${side}-color`);
        });
        
        // Now apply the appropriate colors based on current mode
        if (darkMode) {
          // Dark mode: white borders
          (el as HTMLElement).style.setProperty('border-color', 'white', 'important');
        } else if (isGrayscaleMode && !isRetroMode) {
          // Grayscale light mode: black borders
          (el as HTMLElement).style.setProperty('border-color', 'black', 'important');
        }
        // For regular light mode, we let CSS handle it (no inline styles)
      });
    };
    
    // Apply handler immediately
    handleBorderColors();
    
    // Re-apply whenever DOM changes (for dynamically added elements)
    const observer = new MutationObserver(() => {
      handleBorderColors();
    });
    
    // Observe both body changes (for dynamic content) and html class changes (for theme changes)
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Also set up a periodic check to catch any missed changes
    const intervalId = setInterval(handleBorderColors, 500);
    
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, [resolvedColorMode, visualMode]);
  
  return null;
};

export default BorderFix; 