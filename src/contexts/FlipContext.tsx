import React, { createContext, useContext, useState, useEffect } from 'react';

interface FlipContextType {
  isFlipped: boolean;
  cellFlipStates: Record<number, boolean>;
  bordersVisible: boolean;
  toggleFlip: () => void;
  setFlipped: (state: boolean) => void;
}

const FlipContext = createContext<FlipContextType | undefined>(undefined);

export const FlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cellFlipStates, setCellFlipStates] = useState<Record<number, boolean>>({});
  const [bordersVisible, setBordersVisible] = useState(true);
  
  // Generate random delay between min and max milliseconds
  const getRandomDelay = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  // Reset all cell flip states when main flip state changes
  useEffect(() => {
    if (isFlipped) {
      // Create random delays for each cell (1-9)
      const delays: Record<number, number> = {};
      for (let i = 1; i <= 9; i++) {
        delays[i] = getRandomDelay(50, 350);
      }
      
      // Apply flip state with random delays
      const newStates: Record<number, boolean> = {};
      for (let i = 1; i <= 9; i++) {
        newStates[i] = false;
        setTimeout(() => {
          setCellFlipStates(prev => ({
            ...prev,
            [i]: true
          }));
        }, delays[i]);
      }
      
      setCellFlipStates(newStates);
    } else {
      // Use shorter random delays
      const delays: Record<number, number> = {};
      for (let i = 1; i <= 9; i++) {
        delays[i] = getRandomDelay(50, 250);
      }
      
      // Apply flip state with random delays
      for (let i = 1; i <= 9; i++) {
        setTimeout(() => {
          setCellFlipStates(prev => ({
            ...prev,
            [i]: false
          }));
        }, delays[i]);
      }
    }
  }, [isFlipped]);
  
  const toggleFlip = () => {
    setIsFlipped(prev => !prev);
  };
  
  const setFlipped = (state: boolean) => {
    setIsFlipped(state);
  };
  
  return (
    <FlipContext.Provider value={{ isFlipped, cellFlipStates, bordersVisible, toggleFlip, setFlipped }}>
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