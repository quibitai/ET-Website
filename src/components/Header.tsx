import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { motion } from "framer-motion";

interface HeaderProps {
  initiallyHidden?: boolean;
}

const Header: React.FC<HeaderProps> = ({ initiallyHidden = false }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [logoVisible, setLogoVisible] = useState(!initiallyHidden);
  
  // Use resolvedTheme which gives the actual current theme (accounting for system preference)
  const isDark = resolvedTheme === "dark";
  
  useEffect(() => {
    // If initially hidden, show the logo after a delay
    if (initiallyHidden) {
      console.log("Header: Logo initially hidden, will show after delay");
      const timer = setTimeout(() => {
        console.log("Header: Setting logo visible");
        setLogoVisible(true);
      }, 500); // Slightly longer delay to ensure smooth transition
      
      return () => clearTimeout(timer);
    } else {
      console.log("Header: Logo not initially hidden, showing immediately");
      setLogoVisible(true);
    }
  }, [initiallyHidden]);

  const toggleDarkMode = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="flex justify-between items-center mb-4">
      <motion.h1 
        className="text-[#FF3B31] dark:text-[#FF7A6E] font-bold text-2xl tracking-tighter"
        initial={{ opacity: 0 }}
        animate={{ opacity: logoVisible ? 1 : 0 }}
        transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        echotango
      </motion.h1>
      <div className="flex items-center gap-2.5">
        {/* Red dot resembling morse code */}
        <div className="w-5 h-5 rounded-full bg-[#FF3B31] dark:bg-[#FF7A6E]"></div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={toggleDarkMode}
                className="w-10 h-5 bg-[#FF3B31] dark:bg-[#FF7A6E] rounded-sm transition-all hover:brightness-110"
                aria-label="Toggle dark mode"
              >
                {/* Empty button without the white dot */}
              </button>
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

export default Header;
