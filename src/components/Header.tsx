import React, { useEffect, useState, useCallback, memo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { motion } from "framer-motion";
import { Sun, Moon, History, EyeOff } from "lucide-react";
import { useTheme, getPrimaryColor, getTextColor, getBackgroundColor } from "../theme";
import { useFlip } from "../contexts/FlipContext";

interface HeaderProps {
  initiallyHidden?: boolean;
}

/**
 * Header Component
 * 
 * Site header with logo and theme toggle buttons.
 * Uses the unified theme system for consistent theme management across all visual modes.
 */
const Header: React.FC<HeaderProps> = ({ initiallyHidden = false }) => {
  const { 
    isDark, 
    isRetro, 
    isGrayscale, 
    toggleColorMode, 
    toggleRetro, 
    toggleGrayscale,
    visualMode
  } = useTheme();
  
  // Get theme colors
  const primaryColor = getPrimaryColor(isDark, visualMode);
  const backgroundColor = getBackgroundColor(isDark, visualMode);
  const textColor = getTextColor(isDark, visualMode);
  
  const { isFlipped, toggleFlip, setFlipped } = useFlip();
  const [logoVisible, setLogoVisible] = useState(!initiallyHidden);
  
  useEffect(() => {
    // If initially hidden, show the logo after a delay
    if (initiallyHidden) {
      const timer = setTimeout(() => {
        setLogoVisible(true);
      }, 800); // Increased from 500 to 800 to account for the shake animation
      
      return () => clearTimeout(timer);
    } else {
      setLogoVisible(true);
    }
  }, [initiallyHidden]);

  const handleLogoClick = () => {
    // If grid is flipped, unflip it
    if (isFlipped) {
      setFlipped(false);
    }
  };

  // Get logo color based on current mode
  const getLogoColor = () => {
    if (visualMode === 'grayscale') {
      return isDark ? '#DDDDDD' : '#333333';
    } else {
      return isDark ? 'brand-light' : 'brand';
    }
  };

  // Get toggle colors based on grayscale mode
  const getButtonBackground = (isActive: boolean, defaultColor: string, activeColor: string) => {
    if (visualMode === 'grayscale') {
      return isActive ? '#333333' : '#777777';
    }
    return isActive ? activeColor : defaultColor;
  };

  return (
    <header className="flex justify-between items-center mb-4" role="banner">
      <div className="flex items-center gap-4">
        <motion.h1 
          onClick={handleLogoClick}
          className={`font-bold text-2xl tracking-tighter cursor-pointer hover:brightness-110 transition-all ${isFlipped ? 'opacity-90' : ''} ${
            visualMode === 'grayscale' ? 'text-[#333333] dark:text-[#DDDDDD]' : 'text-[#FF3B31] dark:text-[#FF7A6E]'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: logoVisible ? 1 : 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }}
          role="button"
          aria-label={isFlipped ? "Return to main view" : "Echo Tango"}
        >
          echotango
        </motion.h1>
      </div>
      <div className="flex items-center">
        {/* Morse code style toggles container - perfectly aligned */}
        <div className="flex items-center space-x-3">
          {/* Grayscale mode toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={toggleGrayscale}
                  className={`w-7 h-7 rounded-full transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand dark:focus:ring-brand-light flex items-center justify-center ${
                    visualMode === 'grayscale'
                      ? isDark 
                        ? 'bg-[#FF3B31]' // Red color in dark grayscale mode
                        : 'bg-[#FF3B31]' // Red color in light grayscale mode
                      : isGrayscale 
                        ? 'bg-[#FF3B31] dark:bg-[#FF3B31] shadow-[0_0_10px_rgba(255,59,49,0.7)]' 
                        : 'bg-gray-500 dark:bg-gray-600'
                  }`}
                  aria-label={`Toggle ${isGrayscale ? "color" : "grayscale"} mode`}
                >
                  <EyeOff size={14} className={`${
                    visualMode === 'grayscale' ? 'text-white' : 'text-[#F5F5F5]'
                  }`} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {isGrayscale ? "color" : "grayscale"} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Retro mode toggle (dot) */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={toggleRetro}
                  className={`w-7 h-7 rounded-full transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand dark:focus:ring-brand-light flex items-center justify-center ${
                    visualMode === 'grayscale'
                      ? isDark
                        ? isRetro 
                          ? 'bg-[#DDDDDD] shadow-[0_0_10px_rgba(128,128,128,0.7)]' // Light color in dark grayscale mode
                          : 'bg-[#999999]' // Mid-gray in dark grayscale mode
                        : isRetro 
                          ? 'bg-[#333333] shadow-[0_0_10px_rgba(128,128,128,0.7)]' // Dark color in light grayscale mode
                          : 'bg-gray-500'
                      : isRetro 
                        ? 'bg-[#00ff00] shadow-[0_0_10px_rgba(0,255,0,0.7)]' 
                        : 'bg-[#FF3B31] dark:bg-[#FF7A6E]'
                  }`}
                  aria-label={`Toggle ${isRetro ? "modern" : "retro"} mode`}
                >
                  <History size={14} className={`${visualMode === 'grayscale' && isDark ? 'text-[#333333]' : 'text-[#F5F5F5]'}`} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {isRetro ? "modern" : "retro"} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Dark mode toggle (dash) */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={toggleColorMode}
                  className={`w-16 h-7 rounded-full transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand dark:focus:ring-brand-light relative flex items-center ${
                    visualMode === 'grayscale'
                      ? isDark 
                        ? 'bg-[#DDDDDD]' // Light color in dark grayscale mode
                        : 'bg-[#333333]' // Dark color in light grayscale mode
                      : isRetro 
                        ? 'bg-[#00ff00] shadow-[0_0_10px_rgba(0,255,0,0.7)]' 
                        : 'bg-[#FF3B31] dark:bg-[#FF7A6E]'
                  }`}
                  aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
                >
                  {/* Sun icon */}
                  <span className={`absolute left-2 ${visualMode === 'grayscale' && isDark ? 'text-[#333333]' : 'text-[#F5F5F5]'}`}>
                    <Sun size={14} />
                  </span>
                  {/* Moon icon */}
                  <span className={`absolute right-2 ${visualMode === 'grayscale' && isDark ? 'text-[#333333]' : 'text-[#F5F5F5]'}`}>
                    <Moon size={14} />
                  </span>
                  {/* Toggle dot */}
                  <div 
                    className={`w-5 h-5 transition-all duration-300 rounded-full mx-1
                      ${isDark ? 'ml-auto' : 'mr-auto'} ${
                        visualMode === 'grayscale'
                          ? isDark 
                            ? 'bg-[#333333]' // Dark color dot for dark grayscale mode
                            : 'bg-[#F5F5F5]' // Light color dot for light grayscale mode
                          : 'bg-[#F5F5F5]'
                      }`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {isDark ? "light" : "dark"} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
