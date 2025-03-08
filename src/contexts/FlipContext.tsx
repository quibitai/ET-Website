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
  
  // Shuffle array function to randomize cell order
  const shuffleArray = (array: number[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
    
    // Create array of cell indices and shuffle them for random order
    const cellIndices = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    
    if (isFlipped) {
      // Flip to "work" view
      const newStates: Record<number, boolean> = {};
      
      // Set up initial state
      for (let i = 1; i <= 9; i++) {
        newStates[i] = false;
      }
      
      // Apply initial state immediately
      setCellFlipStates(newStates);
      
      // Then apply timed transitions in random order with variable delays
      cellIndices.forEach((cellIndex, i) => {
        // Use a wider range of delays for more varied effect
        const delay = getRandomDelay(50, 450);
        setTimeout(() => {
          console.log(`FlipContext: Flipping cell ${cellIndex} to true`);
          setCellFlipStates(prev => ({
            ...prev,
            [cellIndex]: true
          }));
        }, delay);
      });
    } else {
      // Flip back to "home" view
      // Use different random order for flipping back
      cellIndices.forEach((cellIndex, i) => {
        // Use a wider range of delays for more varied effect
        const delay = getRandomDelay(50, 350);
        setTimeout(() => {
          console.log(`FlipContext: Flipping cell ${cellIndex} to false`);
          setCellFlipStates(prev => ({
            ...prev,
            [cellIndex]: false
          }));
        }, delay);
      });
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