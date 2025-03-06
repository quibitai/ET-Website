import React from "react";
import { FlickeringGrid } from "./FlickeringGrid";
import { useTheme, getBackgroundColor, getGridColor, getGridOpacity } from "../theme";
import { useFlip } from "../contexts/FlipContext";

/**
 * HomeBox component
 * 
 * Displays a flickering grid with "HOME" text overlay.
 * Used in the flipped state of the grid.
 */
const HomeBox: React.FC = () => {
  const { resolvedColorMode, visualMode, isDark, isRetro } = useTheme();
  const { setFlipped } = useFlip();
  
  // Get the appropriate background color for the current theme
  const bgColor = getBackgroundColor(isDark, visualMode);
  
  // Get the grid color based on current theme
  const gridColor = getGridColor(isDark, visualMode);
  
  // Get appropriate opacity based on theme
  const gridOpacity = getGridOpacity(isDark, visualMode);

  const handleHomeClick = () => {
    // Flip back to the main view
    setFlipped(false);
  };

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
        <button 
          onClick={handleHomeClick}
          className="bg-transparent border-0 p-0 cursor-pointer outline-none focus:outline-none hover:!bg-transparent"
          aria-label="Flip grid to show main content"
        >
          <div 
            className="text-7xl md:text-8xl font-black tracking-wider transform transition-all duration-300 hover:scale-105 select-none" 
            style={{ 
              color: bgColor,
              textShadow: '3px 3px 0px rgba(0,0,0,0.1)'
            }}
          >
            HOME
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomeBox; 