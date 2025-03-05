import React from "react";
import { FlickeringGrid } from "./FlickeringGrid";
import { useTheme, getBackgroundColor, getGridColor, getGridOpacity } from "../theme";

/**
 * EmptyBox component
 * 
 * Displays a flickering grid with "WORK" text overlay.
 * Uses the unified theme system to maintain consistent appearances
 * across standard, grayscale, and retro modes.
 */
const EmptyBox: React.FC = () => {
  const { resolvedColorMode, visualMode, isDark, isRetro } = useTheme();
  
  // Get the appropriate background color for the current theme
  const bgColor = getBackgroundColor(isDark, visualMode);
  
  // Get the grid color based on current theme
  const gridColor = getGridColor(isDark, visualMode);
  
  // Get appropriate opacity based on theme
  const gridOpacity = getGridOpacity(isDark, visualMode);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <FlickeringGrid 
        color={gridColor}
        maxOpacity={gridOpacity}
        squareSize={2}
        gridGap={1}
        flickerChance={0.07}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="text-7xl md:text-8xl font-black tracking-wider transform transition-transform duration-300 hover:scale-105 select-none" 
          style={{ 
            color: bgColor,
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