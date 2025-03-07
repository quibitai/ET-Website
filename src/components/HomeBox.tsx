import React, { useState } from "react";
import { useTheme, getBackgroundColor, getPrimaryColor } from "../theme";
import { useFlip } from "../contexts/FlipContext";

/**
 * HomeBox component - Displays "HOME" text with hover effect
 * Matched to the styling of the WORK box for consistency
 */
const HomeBox: React.FC = () => {
  const { isDark, visualMode } = useTheme();
  const { setFlipped } = useFlip();
  const [isHovered, setIsHovered] = useState(false);

  // Get colors from theme
  const backgroundColor = getBackgroundColor(isDark, visualMode);
  const textColor = getPrimaryColor(isDark, visualMode);
  
  // Define hover states
  const hoverBackgroundColor = textColor;
  const hoverTextColor = backgroundColor;

  // Direct click handler with immediate action
  function handleClick(e: React.MouseEvent) {
    // Prevent any event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    // Log the action for debugging
    console.log("HOME button clicked");
    
    // Directly update flip state
    setFlipped(false);
  }

  return (
    <div 
      className="relative h-full w-full overflow-hidden transition-colors duration-300 flex items-center justify-center"
      style={{
        backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor,
        cursor: 'pointer',
        zIndex: 50
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Return to main view"
    >
      {/* Use the exact same styling as the WORK text */}
      <div 
        className="text-7xl md:text-8xl font-black tracking-wider select-none transition-all duration-300"
        style={{ 
          color: isHovered ? hoverTextColor : textColor,
          pointerEvents: 'none' // Let the parent handle clicks
        }}
      >
        HOME
      </div>
    </div>
  );
};

export default HomeBox; 