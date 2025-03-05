import React from "react";
import { FlickeringGrid } from "./FlickeringGrid";
import { useTheme } from "next-themes";
import { useGrayscale } from "../contexts/GrayscaleContext";

const EmptyBox: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const { isGrayscale } = useGrayscale();
  const isDark = resolvedTheme === "dark";
  const isRetroMode = document.documentElement.classList.contains('retro-mode');
  
  // Get the background color based on current theme to match text with it
  const getBackgroundColor = () => {
    // If retro mode, use contrasting color
    if (isRetroMode) {
      return "#FFEB94"; // Yellow for retro mode
    }
    
    // If grayscale mode
    if (isGrayscale) {
      return isDark ? "#111827" : "#e5e7eb"; // bg-gray-900 : bg-gray-200
    }
    
    // Regular light/dark mode
    return isDark ? "#16192E" : "#F0EBE6"; // Dark blue : Cream
  };
  
  // Determine colors based on theme and grayscale mode
  const getGridColor = () => {
    if (isRetroMode) {
      return "rgb(255, 235, 148)"; // Yellow for retro mode
    }
    
    if (isDark) {
      // Brighter color for dark mode to make the grid more visible
      return "rgb(230, 230, 230)"; // Brighter white/light gray for dark mode
    } else {
      return "rgb(255, 59, 49)"; // Red for light mode
    }
  };

  // Get appropriate opacity based on theme
  const getGridOpacity = () => {
    if (isDark && !isRetroMode) {
      return 0.5; // Higher opacity in dark mode for better visibility
    }
    return 0.3; // Standard opacity for other modes
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <FlickeringGrid 
        color={getGridColor()}
        maxOpacity={getGridOpacity()}
        squareSize={2}
        gridGap={1}
        flickerChance={0.07}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="text-7xl md:text-8xl font-black tracking-wider transform transition-transform duration-300 hover:scale-105 select-none" 
          style={{ 
            color: getBackgroundColor(),
            textShadow: '3px 3px 0px rgba(0,0,0,0.1)' 
          }}
        >
          WORK
        </div>
      </div>
    </div>
  );
};

export default EmptyBox; 