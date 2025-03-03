import React, { useEffect, useState, useCallback, memo } from "react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { motion } from "framer-motion";
import { useRetro } from "../contexts/RetroContext";
import { Sun, Moon } from "lucide-react";

interface HeaderProps {
  initiallyHidden?: boolean;
}

const Header: React.FC<HeaderProps> = ({ initiallyHidden = false }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isRetro, toggleRetro } = useRetro();
  const [logoVisible, setLogoVisible] = useState(!initiallyHidden);
  
  // Use resolvedTheme which gives the actual current theme (accounting for system preference)
  const isDark = resolvedTheme === "dark";
  
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

  const toggleDarkMode = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  return (
    <header className="flex justify-between items-center mb-4" role="banner">
      <div className="flex items-center gap-4">
        <motion.h1 
          className="text-brand dark:text-brand-light font-bold text-2xl tracking-tighter"
          initial={{ opacity: 0 }}
          animate={{ opacity: logoVisible ? 1 : 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          echotango
        </motion.h1>
      </div>
      <div className="flex items-center gap-2.5">
        {/* Retro mode toggle (red dot) */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={toggleRetro}
                className={`w-5 h-5 rounded-full transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand dark:focus:ring-brand-light ${
                  isRetro 
                    ? 'bg-[#00ff00] shadow-[0_0_10px_rgba(0,255,0,0.7)]' 
                    : 'bg-brand dark:bg-brand-light'
                }`}
                aria-label={`Toggle ${isRetro ? "modern" : "retro"} mode`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle {isRetro ? "modern" : "retro"} mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Dark mode toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <button 
                  onClick={toggleDarkMode}
                  className={`w-10 h-5 bg-brand dark:bg-brand-light rounded-sm transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand dark:focus:ring-brand-light relative ${
                    isRetro ? 'bg-[#00ff00] shadow-[0_0_10px_rgba(0,255,0,0.7)]' : ''
                  }`}
                  aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
                >
                  {/* Sun icon */}
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 text-white">
                    <Sun size={12} />
                  </span>
                  {/* Moon icon */}
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 text-white">
                    <Moon size={12} />
                  </span>
                  {/* Toggle dot */}
                  <div 
                    className={`absolute top-0.5 w-4 h-4 bg-white transition-all duration-300
                      ${isDark ? 'right-0.5' : 'left-0.5'}`}
                  />
                </button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle {isDark ? "light" : "dark"} mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default memo(Header);
