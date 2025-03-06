import React, { createContext, useContext, useState } from 'react';

interface FlipContextType {
  isFlipped: boolean;
  toggleFlip: () => void;
  setFlipped: (state: boolean) => void;
}

const FlipContext = createContext<FlipContextType | undefined>(undefined);

export const FlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const toggleFlip = () => {
    setIsFlipped(prev => !prev);
  };
  
  const setFlipped = (state: boolean) => {
    setIsFlipped(state);
  };
  
  return (
    <FlipContext.Provider value={{ isFlipped, toggleFlip, setFlipped }}>
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