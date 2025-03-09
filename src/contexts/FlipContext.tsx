import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface FlipContextType {
  isFlipped: boolean;
  cellFlipStates: Record<number, boolean>;
  bordersVisible: boolean;
  toggleFlip: () => void;
  setFlipped: (state: boolean) => void;
}

/**
 * FlipContext - Manages the state of the flippable grid cells
 * Simplified implementation with more reliable state transitions
 */
const FlipContext = createContext<FlipContextType | undefined>(undefined);

export const FlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Core state
  const [isFlipped, setIsFlippedState] = useState(false);
  const [cellFlipStates, setCellFlipStates] = useState<Record<number, boolean>>({});
  const [bordersVisible, setBordersVisible] = useState(true);
  
  // Get a random delay between min and max
  const getRandomDelay = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  // Create robust setFlipped function
  const setFlipped = useCallback((state: boolean) => {
    console.log(`FlipContext: Setting flipped state to ${state}`);
    setIsFlippedState(state);
  }, []);

  // Create robust toggleFlip function
  const toggleFlip = useCallback(() => {
    console.log(`FlipContext: Toggling flip state, current: ${isFlipped}`);
    setIsFlippedState(prev => !prev);
  }, [isFlipped]);
  
  // Handle cell flip states when main flip state changes
  useEffect(() => {
    console.log(`FlipContext: Main flip state changed to ${isFlipped}`);
    
    if (isFlipped) {
      // Flip to "work" view
      const delays: Record<number, number> = {};
      const newStates: Record<number, boolean> = {};
      
      // Set up initial state
      for (let i = 1; i <= 9; i++) {
        delays[i] = getRandomDelay(50, 300);
        newStates[i] = false;
      }
      
      // Apply initial state immediately
      setCellFlipStates(newStates);
      
      // Then apply timed transitions for each cell
      for (let i = 1; i <= 9; i++) {
        setTimeout(() => {
          console.log(`FlipContext: Flipping cell ${i} to true`);
          setCellFlipStates(prev => ({
            ...prev,
            [i]: true
          }));
        }, delays[i]);
      }
    } else {
      // Flip back to "home" view
      const delays: Record<number, number> = {};
      
      // Apply timed transitions for each cell
      for (let i = 1; i <= 9; i++) {
        delays[i] = getRandomDelay(50, 200);
        setTimeout(() => {
          console.log(`FlipContext: Flipping cell ${i} to false`);
          setCellFlipStates(prev => ({
            ...prev,
            [i]: false
          }));
        }, delays[i]);
      }
    }
  }, [isFlipped]);
  
  return (
    <FlipContext.Provider 
      value={{ 
        isFlipped, 
        cellFlipStates, 
        bordersVisible, 
        toggleFlip, 
        setFlipped 
      }}
    >
      {children}
    </FlipContext.Provider>
  );
};

export const useFlip = (): FlipContextType => {
  const context = useContext(FlipContext);
  if (context === undefined) {
    throw new Error('useFlip must be used within a FlipProvider');
  }
  return context;
}; 