import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useGrayscale } from '../contexts/GrayscaleContext';

const DarkModeBorderFix: React.FC = () => {
  const { resolvedTheme, theme } = useTheme();
  const { isGrayscale } = useGrayscale();
  
  useEffect(() => {
    // Function to handle border colors based on theme and grayscale mode
    const handleBorderColors = () => {
      const darkMode = resolvedTheme === 'dark';
      const grayscaleMode = document.documentElement.classList.contains('grayscale-mode');
      const retroMode = document.documentElement.classList.contains('retro-mode');
      
      // Skip if in retro mode
      if (retroMode) return;
      
      // Get all elements with red border classes
      const elements = document.querySelectorAll('[class*="border-[#FF"]');
      
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
        } else if (grayscaleMode && !retroMode) {
          // Grayscale light mode: black borders
          (el as HTMLElement).style.setProperty('border-color', 'black', 'important');
        }
        // For regular light mode, we let CSS handle it (no inline styles)
      });
    };
    
    // Apply handler immediately
    handleBorderColors();
    
    // Re-apply whenever theme or grayscale state changes
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
  }, [resolvedTheme, theme, isGrayscale]); // Add all dependencies to ensure useEffect runs on any change
  
  return null;
};

export default DarkModeBorderFix;
