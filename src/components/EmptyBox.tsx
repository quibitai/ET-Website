import React, { useState } from "react";
import { useTheme } from "../theme";
import { useFlip } from "../contexts/FlipContext";

/**
 * EmptyBox component
 * 
 * Displays "WORK" text with hover effect.
 * Uses the unified theme system to maintain consistent appearances
 * across light and dark modes.
 */
const EmptyBox: React.FC = () => {
  const { isDark } = useTheme();
  const { toggleFlip } = useFlip();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative h-full w-full overflow-hidden transition-colors duration-300 flex items-center justify-center ${
        isHovered 
          ? 'bg-[#FF3B31] dark:bg-[#FF7A6E]' 
          : 'bg-[#F5F5F5] dark:bg-[#16192E]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        onClick={toggleFlip}
        className="bg-transparent border-0 p-0 cursor-pointer outline-none focus:outline-none w-full h-full flex items-center justify-center"
        aria-label="Flip grid to show video thumbnails"
      >
        <div 
          className={`text-7xl md:text-8xl font-black tracking-wider select-none transition-all duration-300 ${
            isHovered 
              ? 'text-[#F5F5F5] dark:text-[#16192E]' 
              : 'text-[#FF3B31] dark:text-[#FF7A6E]'
          }`}
        >
          WORK
        </div>
      </button>
    </div>
  );
};

export default EmptyBox; 