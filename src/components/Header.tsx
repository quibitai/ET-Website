import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

const Header: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // Use resolvedTheme which gives the actual current theme (accounting for system preference)
  const isDark = resolvedTheme === "dark";
  
  useEffect(() => {
    console.log("Current theme:", theme);
    console.log("Resolved theme:", resolvedTheme);
  }, [theme, resolvedTheme]);

  const toggleDarkMode = () => {
    setTheme(isDark ? "light" : "dark");
    console.log("Toggling theme from", isDark ? "dark" : "light", "to", isDark ? "light" : "dark");
  };

  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-[#FF3B31] dark:text-[#FF7A6E] font-bold text-2xl tracking-tighter">
        echotango
      </h1>
      <div className="flex items-center gap-2.5">
        {/* Red dot resembling morse code - adjusted to match height of dash (5px) */}
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
