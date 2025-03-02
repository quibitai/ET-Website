import React, { createContext, useContext, useState, useEffect } from 'react';

type RetroContextType = {
  isRetro: boolean;
  toggleRetro: () => void;
};

const RetroContext = createContext<RetroContextType | undefined>(undefined);

export function RetroProvider({ children }: { children: React.ReactNode }) {
  const [isRetro, setIsRetro] = useState(() => {
    // Check if there's a saved preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('retro-mode');
      return saved === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('retro-mode', String(isRetro));
    
    // Add or remove retro class from document
    if (isRetro) {
      document.documentElement.classList.add('retro-mode');
    } else {
      document.documentElement.classList.remove('retro-mode');
    }
  }, [isRetro]);

  const toggleRetro = () => {
    setIsRetro(prev => !prev);
  };

  return (
    <RetroContext.Provider value={{ isRetro, toggleRetro }}>
      {children}
    </RetroContext.Provider>
  );
}

export function useRetro() {
  const context = useContext(RetroContext);
  if (context === undefined) {
    throw new Error('useRetro must be used within a RetroProvider');
  }
  return context;
} 