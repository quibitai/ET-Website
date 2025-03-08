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

  // Get the appropriate background color for the theme toggle based on current theme state
  const getThemeToggleBackground = () => {
    if (visualMode === 'grayscale') {
      return isDark ? '#DDDDDD' : '#333333';
    } else if (visualMode === 'retro') {
      return '#00ff00';
    } else {
      // Standard mode
      return isDark ? '#FF7A6E' : '#FF3B31';
    }
  };

  // Get the appropriate background color for the grayscale toggle based on current theme state
  const getGrayscaleToggleBackground = () => {
    if (visualMode === 'grayscale') {
      // Always red in grayscale mode
      return '#FF3B31';
    } else {
      return isGrayscale 
        ? (isDark ? '#FF7A6E' : '#FF3B31') 
        : (isDark ? 'rgb(75, 85, 99)' : 'rgb(107, 114, 128)');
    }
  };

  // Get the appropriate background color for the retro toggle based on current theme state
  const getRetroToggleBackground = () => {
    if (visualMode === 'grayscale') {
      return isDark
        ? (isRetro ? '#DDDDDD' : '#999999') 
        : (isRetro ? '#333333' : 'rgb(107, 114, 128)');
    } else {
      return isRetro 
        ? '#00ff00' 
        : (isDark ? '#FF7A6E' : '#FF3B31');
    }
  };

  // Get the appropriate text color for icons
  const getIconColor = () => {
    return (visualMode === 'grayscale' && isDark) ? '#333333' : '#F5F5F5';
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
                  className="w-7 h-7 rounded-full transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center"
                  style={{ 
                    backgroundColor: getGrayscaleToggleBackground(),
                    boxShadow: isGrayscale && visualMode !== 'grayscale' ? '0 0 10px rgba(255,59,49,0.7)' : 'none'
                  }}
                  aria-label={`Toggle ${isGrayscale ? "color" : "grayscale"} mode`}
                >
                  <EyeOff size={14} style={{ color: getIconColor() }} />
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
                  className="w-7 h-7 rounded-full transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center"
                  style={{ 
                    backgroundColor: getRetroToggleBackground(),
                    boxShadow: isRetro && visualMode !== 'grayscale' ? '0 0 10px rgba(0,255,0,0.7)' : 
                              (isRetro && visualMode === 'grayscale' ? '0 0 10px rgba(128,128,128,0.7)' : 'none')
                  }}
                  aria-label={`Toggle ${isRetro ? "modern" : "retro"} mode`}
                >
                  <History size={14} style={{ color: getIconColor() }} />
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
                  className="w-16 h-7 rounded-full transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 relative flex items-center"
                  style={{ 
                    backgroundColor: getThemeToggleBackground(),
                    boxShadow: visualMode === 'retro' ? '0 0 10px rgba(0,255,0,0.7)' : 'none'
                  }}
                  aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
                >
                  {/* Sun icon */}
                  <span className="absolute left-2" style={{ color: getIconColor() }}>
                    <Sun size={14} />
                  </span>
                  {/* Moon icon */}
                  <span className="absolute right-2" style={{ color: getIconColor() }}>
                    <Moon size={14} />
                  </span>
                  {/* Toggle dot */}
                  <div 
                    className="w-5 h-5 absolute transition-all duration-300 rounded-full"
                    style={{ 
                      backgroundColor: '#F5F5F5',
                      right: isDark ? '4px' : 'auto',
                      left: isDark ? 'auto' : '4px'
                    }}
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
