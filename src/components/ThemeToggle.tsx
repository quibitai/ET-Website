import React from "react";
import { useTheme, ColorMode, VisualMode } from "../theme";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Theme Toggle Component
 * 
 * Provides a UI to toggle between different theme modes:
 * - Light/Dark/System color modes
 * - Standard/Grayscale/Retro visual modes
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { 
    colorMode, 
    visualMode, 
    setColorMode, 
    setVisualMode, 
    resolvedColorMode 
  } = useTheme();

  // Available color modes
  const colorModes: ColorMode[] = ["light", "dark", "system"];
  
  // Available visual modes
  const visualModes: VisualMode[] = ["standard", "grayscale", "retro"];

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {/* Color Mode Toggle */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Color Mode</label>
        <div className="flex space-x-2">
          {colorModes.map((mode) => (
            <button
              key={mode}
              onClick={() => setColorMode(mode)}
              className={`px-3 py-1 rounded text-sm ${
                colorMode === mode
                  ? "bg-[#FF3B31] dark:bg-[#FF7A6E] text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
              {mode === "system" && (
                <span className="ml-1 text-xs">
                  ({resolvedColorMode === "dark" ? "Dark" : "Light"})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Mode Toggle */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Visual Mode</label>
        <div className="flex space-x-2">
          {visualModes.map((mode) => (
            <button
              key={mode}
              onClick={() => setVisualMode(mode)}
              className={`px-3 py-1 rounded text-sm ${
                visualMode === mode
                  ? "bg-[#FF3B31] dark:bg-[#FF7A6E] text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle; 