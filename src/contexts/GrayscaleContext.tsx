import React, { createContext, useContext, useState, useEffect } from 'react';

type GrayscaleContextType = {
  isGrayscale: boolean;
  toggleGrayscale: () => void;
};

const GrayscaleContext = createContext<GrayscaleContextType | undefined>(undefined);

export function GrayscaleProvider({ children }: { children: React.ReactNode }) {
  const [isGrayscale, setIsGrayscale] = useState(() => {
    // Check if there's a saved preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('grayscale-mode');
      return saved === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('grayscale-mode', String(isGrayscale));
    
    // Add or remove grayscale class from document
    if (isGrayscale) {
      document.documentElement.classList.add('grayscale-mode');
    } else {
      document.documentElement.classList.remove('grayscale-mode');
    }
  }, [isGrayscale]);

  const toggleGrayscale = () => {
    setIsGrayscale(prev => !prev);
  };

  return (
    <GrayscaleContext.Provider value={{ isGrayscale, toggleGrayscale }}>
      {children}
    </GrayscaleContext.Provider>
  );
}

export function useGrayscale() {
  const context = useContext(GrayscaleContext);
  if (context === undefined) {
    throw new Error('useGrayscale must be used within a GrayscaleProvider');
  }
  return context;
} 