import React, { useEffect, useState, useCallback, memo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { motion } from "framer-motion";
import { Sun, Moon, History, EyeOff } from "lucide-react";
import { useTheme } from "../theme";
import { useFlip } from "../contexts/FlipContext";

interface HeaderProps {
  initiallyHidden?: boolean;
}

/**
 * Header Component
 * 
 * Site header with logo and theme toggle buttons.
 * Uses the unified theme system for consistent theme management.
 */
const Header: React.FC<HeaderProps> = ({ initiallyHidden = false }) => {
  const { 
    isDark, 
    isRetro, 
    isGrayscale, 
    toggleColorMode, 
    toggleRetro, 
    toggleGrayscale
  } = useTheme();
  
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

  return (
    <header className="flex justify-between items-center mb-4" role="banner">
      <div className="flex items-center gap-4">
        <motion.h1 
          onClick={handleLogoClick}
          className={`text-brand dark:text-brand-light font-bold text-2xl tracking-tighter cursor-pointer hover:brightness-110 transition-all ${isFlipped ? 'opacity-90' : ''}`}
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
                    isGrayscale 
                      ? 'bg-gray-500 shadow-[0_0_10px_rgba(128,128,128,0.7)]' 
                      : 'bg-brand dark:bg-brand-light'
                  }`}
                  aria-label={`Toggle ${isGrayscale ? "color" : "grayscale"} mode`}
                >
                  <EyeOff size={14} className="text-[#F5F5F5]" />
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
                    isRetro 
                      ? 'bg-[#00ff00] shadow-[0_0_10px_rgba(0,255,0,0.7)]' 
                      : 'bg-brand dark:bg-brand-light'
                  }`}
                  aria-label={`Toggle ${isRetro ? "modern" : "retro"} mode`}
                >
                  <History size={14} className="text-[#F5F5F5]" />
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
                    isRetro ? 'bg-[#00ff00] shadow-[0_0_10px_rgba(0,255,0,0.7)]' : 'bg-brand dark:bg-brand-light'
                  }`}
                  aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
                >
                  {/* Sun icon */}
                  <span className="absolute left-2 text-[#F5F5F5]">
                    <Sun size={14} />
                  </span>
                  {/* Moon icon */}
                  <span className="absolute right-2 text-[#F5F5F5]">
                    <Moon size={14} />
                  </span>
                  {/* Toggle dot */}
                  <div 
                    className={`w-5 h-5 bg-[#F5F5F5] transition-all duration-300 rounded-full mx-1
                      ${isDark ? 'ml-auto' : 'mr-auto'}`}
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
