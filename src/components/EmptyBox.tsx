import React, { useState } from "react";
import { useTheme, getBackgroundColor, getPrimaryColor, getTextColor } from "../theme";
import { useFlip } from "../contexts/FlipContext";

/**
 * EmptyBox component
 * 
 * Displays "WORK" text with hover effect.
 * Uses the unified theme system to maintain consistent appearances
 * across all color and visual modes.
 */
const EmptyBox: React.FC = () => {
  const { isDark, visualMode } = useTheme();
  const { toggleFlip } = useFlip();
  const [isHovered, setIsHovered] = useState(false);

  // Get appropriate colors from the theme system based on current modes
  const backgroundColor = getBackgroundColor(isDark, visualMode);
  const textColor = getPrimaryColor(isDark, visualMode);
  
  // Define hover states
  const hoverBackgroundColor = textColor; // Background becomes the text color on hover
  const hoverTextColor = backgroundColor; // Text becomes the background color on hover

  return (
    <div 
      className="relative h-full w-full overflow-hidden transition-colors duration-300 flex items-center justify-center"
      style={{ 
        backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        onClick={toggleFlip}
        className="bg-transparent border-0 p-0 cursor-pointer outline-none focus:outline-none w-full h-full flex items-center justify-center"
        aria-label="Flip grid to show video thumbnails"
      >
        <div 
          className="text-7xl md:text-8xl font-black tracking-wider select-none transition-all duration-300"
          style={{ 
            color: isHovered ? hoverTextColor : textColor 
          }}
        >
          WORK
        </div>
      </button>
    </div>
  );
};

export default EmptyBox; 